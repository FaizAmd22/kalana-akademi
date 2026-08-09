import type { Timestamp } from "firebase/firestore"

export interface Galeri {
  id: string
  image: string
  caption?: string
  createdAt: Timestamp
}

export type GaleriInput = Omit<Galeri, "id" | "createdAt">
