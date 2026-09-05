import { limit as fbLimit, orderBy } from "firebase/firestore"

import { createCrudService } from "@/lib/firestore-crud"
import type { KalanaEvent, KalanaEventInput } from "@/types"

const crud = createCrudService<KalanaEvent, KalanaEventInput>("events")

export const eventService = {
  ...crud,
  listAll: () => crud.list(orderBy("createdAt", "desc")),
  listLatest: (count: number) =>
    crud.list(orderBy("createdAt", "desc"), fbLimit(count)),
}
