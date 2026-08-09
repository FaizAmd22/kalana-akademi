import type { Timestamp } from "firebase/firestore"

export interface Artikel {
  id: string
  kategori: string
  title: string
  image: string
  description: string
  order: number
  createdAt: Timestamp
}

export type ArtikelInput = Omit<Artikel, "id" | "createdAt">
