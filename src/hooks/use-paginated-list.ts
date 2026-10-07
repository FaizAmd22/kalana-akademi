import { useCallback, useEffect, useRef, useState } from "react"
import { toast } from "sonner"

import type { Page, PageCursor } from "@/lib/firestore-crud"

interface PaginatedState<T> {
  items: T[]
  cursor: PageCursor | null
  hasMore: boolean
  /** first page */
  loading: boolean
  /** subsequent pages */
  loadingMore: boolean
  error: Error | null
  /** total matching documents; undefined until the count arrives */
  total: number | undefined
}

const INITIAL = {
  items: [],
  cursor: null,
  hasMore: false,
  loading: true,
  loadingMore: false,
  error: null,
  total: undefined,
}

/**
 * "Load more" pagination over a cursor-based fetcher. Resets whenever `deps`
 * change (e.g. a category filter), ignoring responses from a previous filter.
 */
export function usePaginatedList<T>(
  fetchPage: (cursor: PageCursor | null) => Promise<Page<T>>,
  fetchCount: () => Promise<number>,
  deps: unknown[]
) {
  const [state, setState] = useState<PaginatedState<T>>(INITIAL)
  // bumped on every reset so late responses for an old filter are dropped
  const generation = useRef(0)
  const fetchPageRef = useRef(fetchPage)
  fetchPageRef.current = fetchPage

  useEffect(() => {
    const gen = ++generation.current
    setState(INITIAL)

    fetchPage(null)
      .then((page) => {
        if (gen !== generation.current) return
        setState((s) => ({
          ...s,
          items: page.items,
          cursor: page.cursor,
          hasMore: page.hasMore,
          loading: false,
        }))
      })
      .catch((error: Error) => {
        if (gen !== generation.current) return
        setState((s) => ({ ...s, loading: false, error }))
      })

    // the count is a nice-to-have; the list works without it
    fetchCount()
      .then((total) => {
        if (gen === generation.current) setState((s) => ({ ...s, total }))
      })
      .catch(() => {})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  // latest state for loadMore's guard, without re-creating the callback
  const stateRef = useRef(state)
  stateRef.current = state

  const loadMore = useCallback(() => {
    const current = stateRef.current
    if (!current.hasMore || current.loadingMore || current.loading) return

    const gen = generation.current
    // mark immediately so a double click can't request the same page twice
    stateRef.current = { ...current, loadingMore: true }
    setState((s) => ({ ...s, loadingMore: true }))

    fetchPageRef
      .current(current.cursor)
      .then((page) => {
        if (gen !== generation.current) return
        setState((s) => ({
          ...s,
          items: [...s.items, ...page.items],
          cursor: page.cursor,
          hasMore: page.hasMore,
          loadingMore: false,
        }))
      })
      .catch(() => {
        if (gen !== generation.current) return
        toast.error("Gagal memuat data berikutnya, coba lagi.")
        setState((s) => ({ ...s, loadingMore: false }))
      })
  }, [])

  return { ...state, loadMore }
}
