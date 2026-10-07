import {
  addDoc,
  average,
  collection,
  count as countAggregate,
  deleteDoc,
  doc,
  getAggregateFromServer,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  startAfter,
  updateDoc,
  where,
  writeBatch,
  type DocumentReference,
  type QueryConstraint,
  type QueryDocumentSnapshot,
  type Unsubscribe,
  type UpdateData,
} from "firebase/firestore"

import { db } from "@/lib/firebase"
import { matchesQuery } from "@/lib/search"

// how long a filtered set fetched for searching is reused while typing
const SEARCH_CACHE_MS = 5 * 60_000

/**
 * Opaque position for the next page: a Firestore document snapshot normally,
 * or a numeric offset when running in the client-side fallback (see listPage).
 */
export type PageCursor = QueryDocumentSnapshot | number

export interface Page<T> {
  items: T[]
  cursor: PageCursor | null
  hasMore: boolean
}

/** Slice an in-memory list into a page, using a numeric offset as cursor. */
export function pageFromArray<T>(
  all: T[],
  pageSize: number,
  cursor: PageCursor | null
): Page<T> {
  const offset = typeof cursor === "number" ? cursor : 0
  const items = all.slice(offset, offset + pageSize)
  const next = offset + items.length
  return { items, cursor: next, hasMore: next < all.length }
}

/** Comparable value for numbers and Firestore Timestamps alike. */
function sortValue(value: unknown): number {
  if (value && typeof (value as { toMillis?: unknown }).toMillis === "function") {
    return (value as { toMillis: () => number }).toMillis()
  }
  return Number(value ?? 0)
}

function isMissingIndexError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { code?: string }).code === "failed-precondition"
  )
}

export function createCrudService<
  T extends { id: string },
  TInput extends object
>(collectionName: string, { stampTimestamps = true } = {}) {
  const colRef = collection(db, collectionName)

  function toEntity(snap: { id: string; data: () => unknown }): T {
    return { id: snap.id, ...(snap.data() as object) } as T
  }

  async function list(...constraints: QueryConstraint[]): Promise<T[]> {
    const q = constraints.length ? query(colRef, ...constraints) : colRef
    const snap = await getDocs(q)
    return snap.docs.map(toEntity)
  }

  const searchCache = new Map<string, { at: number; items: Promise<T[]> }>()

  function listCached(cacheKey: string, filters: QueryConstraint[]) {
    const hit = searchCache.get(cacheKey)
    if (hit && Date.now() - hit.at < SEARCH_CACHE_MS) return hit.items
    const items = list(...filters)
    // don't keep a failed request around
    items.catch(() => searchCache.delete(cacheKey))
    searchCache.set(cacheKey, { at: Date.now(), items })
    return items
  }

  return {
    list,

    /**
     * Cursor-based page of documents ordered ascending by `orderField`.
     *
     * Equality filters combined with orderBy need a composite index. Until
     * that index exists Firestore rejects the query; we then fall back to
     * reading the filtered set and paging it client-side (the previous
     * behaviour), so filtered pages keep working while the index is missing.
     */
    async listPage({
      filters = [],
      orderField,
      direction = "asc",
      pageSize,
      cursor = null,
    }: {
      filters?: QueryConstraint[]
      orderField: keyof T & string
      direction?: "asc" | "desc"
      pageSize: number
      cursor?: PageCursor | null
    }): Promise<Page<T>> {
      const sign = direction === "asc" ? 1 : -1
      const fallback = async (offset: number): Promise<Page<T>> => {
        const all = await list(...filters)
        all.sort(
          (a, b) =>
            sign *
            (sortValue((a as Record<string, unknown>)[orderField]) -
              sortValue((b as Record<string, unknown>)[orderField]))
        )
        return pageFromArray(all, pageSize, offset)
      }

      if (typeof cursor === "number") return fallback(cursor)

      try {
        const snap = await getDocs(
          query(
            colRef,
            ...filters,
            orderBy(orderField, direction),
            ...(cursor ? [startAfter(cursor)] : []),
            // one extra document tells us whether another page exists
            limit(pageSize + 1)
          )
        )
        const docs = snap.docs.slice(0, pageSize)
        return {
          items: docs.map(toEntity),
          cursor: docs.at(-1) ?? null,
          hasMore: snap.docs.length > pageSize,
        }
      } catch (error) {
        if (filters.length === 0 || !isMissingIndexError(error)) throw error
        // the error message contains a link that creates the index
        console.warn(
          `[${collectionName}] composite index missing, paging client-side.`,
          error
        )
        return fallback(0)
      }
    },

    /**
     * Documents whose `textField` contains every word of `query`, ordered by
     * `orderField`. Firestore has no substring search, so the filtered set
     * is fetched once (cached per `cacheKey` for a few minutes, so typing
     * doesn't refetch) and matched client-side.
     */
    async search({
      filters = [],
      cacheKey,
      orderField,
      textField,
      query: text,
    }: {
      filters?: QueryConstraint[]
      cacheKey: string
      orderField: keyof T & string
      textField: keyof T & string
      query: string
    }): Promise<T[]> {
      const all = await listCached(cacheKey, filters)
      const field = (item: T, key: string) =>
        (item as Record<string, unknown>)[key]
      return all
        .filter((item) => matchesQuery(String(field(item, textField) ?? ""), text))
        .sort((a, b) => sortValue(field(a, orderField)) - sortValue(field(b, orderField)))
    },

    /**
     * Server-side average of a numeric field over documents where it's set
     * (> 0), plus how many such documents there are.
     */
    async averageOf(field: keyof T & string) {
      const snap = await getAggregateFromServer(
        query(colRef, where(field, ">", 0)),
        { avg: average(field), n: countAggregate() }
      )
      const { avg, n } = snap.data()
      return { average: avg, count: n }
    },

    /** Server-side count (doesn't download the documents). */
    async count(...filters: QueryConstraint[]): Promise<number> {
      const snap = await getCountFromServer(
        filters.length ? query(colRef, ...filters) : colRef
      )
      return snap.data().count
    },

    async getById(id: string): Promise<T | null> {
      const snap = await getDoc(doc(db, collectionName, id))
      return snap.exists() ? toEntity(snap) : null
    },

    async create(data: TInput): Promise<string> {
      const payload = stampTimestamps
        ? { ...data, createdAt: serverTimestamp() }
        : data
      const ref = await addDoc(colRef, payload)
      return ref.id
    },

    async update(id: string, data: Partial<TInput>): Promise<void> {
      const ref = doc(db, collectionName, id) as unknown as DocumentReference<
        TInput,
        TInput
      >
      await updateDoc(ref, { ...data } as UpdateData<TInput>)
    },

    async remove(id: string): Promise<void> {
      await deleteDoc(doc(db, collectionName, id))
    },

    async updateOrder(items: { id: string; order: number }[]): Promise<void> {
      const batch = writeBatch(db)
      for (const item of items) {
        batch.update(doc(db, collectionName, item.id), { order: item.order })
      }
      await batch.commit()
    },

    subscribe(
      onChange: (items: T[]) => void,
      onError: (error: Error) => void,
      ...constraints: QueryConstraint[]
    ): Unsubscribe {
      const q = constraints.length ? query(colRef, ...constraints) : colRef
      return onSnapshot(
        q,
        (snap) => onChange(snap.docs.map(toEntity)),
        onError
      )
    },
  }
}
