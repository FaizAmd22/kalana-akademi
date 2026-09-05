import type { Timestamp } from "firebase/firestore"

export interface KalanaEvent {
  id: string
  title: string
  image: string
  description?: string
  eventDate?: string
  createdAt: Timestamp
}

export type KalanaEventInput = Omit<KalanaEvent, "id" | "createdAt">
