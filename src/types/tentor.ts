import type { Timestamp } from "firebase/firestore"

export interface Tentor {
  id: string
  name: string
  // mis. "Undergraduate Student in Informatics" — kosong untuk lulusan SMA/sederajat
  jurusan?: string
  // Universitas atau asal sekolah, mis. "ITB", "SMAN 1 Majalengka"
  universitas: string
  image?: string
  // slug Kategori bertipe "tentor" (dikelola di tab Peran pada admin Tentor)
  roles: string[]
  order: number
  createdAt: Timestamp
}

export type TentorInput = Omit<Tentor, "id" | "createdAt">
