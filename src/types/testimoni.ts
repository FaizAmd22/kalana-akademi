import type { Timestamp } from "firebase/firestore"

export interface Testimoni {
  id: string
  name: string
  role: string
  message: string
  image?: string
  rating?: number
  createdAt: Timestamp
}

export type TestimoniInput = Omit<Testimoni, "id" | "createdAt">
