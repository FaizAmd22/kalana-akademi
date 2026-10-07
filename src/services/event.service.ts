import { limit as fbLimit, orderBy } from "firebase/firestore"

import { createCrudService, type PageCursor } from "@/lib/firestore-crud"
import type { KalanaEvent, KalanaEventInput } from "@/types"

const crud = createCrudService<KalanaEvent, KalanaEventInput>("events")

export const eventService = {
  ...crud,
  listLatest: (count: number) =>
    crud.list(orderBy("createdAt", "desc"), fbLimit(count)),
  // newest first
  page: (pageSize: number, cursor: PageCursor | null) =>
    crud.listPage({
      orderField: "createdAt",
      direction: "desc",
      pageSize,
      cursor,
    }),
}
