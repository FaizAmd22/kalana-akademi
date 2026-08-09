import type { Timestamp } from "firebase/firestore"

export interface BankSoal {
  id: string
  label: string
  title: string
  description: string
  link: string
  order: number
  createdAt: Timestamp
}

export type BankSoalInput = Omit<BankSoal, "id" | "createdAt">
