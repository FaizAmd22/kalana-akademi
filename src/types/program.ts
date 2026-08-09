import type { Timestamp } from "firebase/firestore"

export interface Program {
  id: string
  label: string
  title: string
  description: string
  images: string[]
  points: string[]
  daftarLink: string
  order: number
  createdAt: Timestamp
  updatedAt: Timestamp
}

export type ProgramInput = Omit<Program, "id" | "createdAt" | "updatedAt">
