import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  writeBatch,
  type DocumentReference,
  type QueryConstraint,
  type Unsubscribe,
  type UpdateData,
} from "firebase/firestore"

import { db } from "@/lib/firebase"

export function createCrudService<
  T extends { id: string },
  TInput extends object
>(collectionName: string, { stampTimestamps = true } = {}) {
  const colRef = collection(db, collectionName)

  function toEntity(snap: { id: string; data: () => unknown }): T {
    return { id: snap.id, ...(snap.data() as object) } as T
  }

  return {
    async list(...constraints: QueryConstraint[]): Promise<T[]> {
      const q = constraints.length ? query(colRef, ...constraints) : colRef
      const snap = await getDocs(q)
      return snap.docs.map(toEntity)
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
