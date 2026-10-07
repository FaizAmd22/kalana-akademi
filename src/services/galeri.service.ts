import { limit as fbLimit, orderBy } from "firebase/firestore"

import { createCrudService, type PageCursor } from "@/lib/firestore-crud"
import type { Galeri, GaleriInput } from "@/types"

const crud = createCrudService<Galeri, GaleriInput>("galeris")

export const galeriService = {
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
