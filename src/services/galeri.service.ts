import { limit as fbLimit, orderBy } from "firebase/firestore"

import { createCrudService } from "@/lib/firestore-crud"
import type { Galeri, GaleriInput } from "@/types"

const crud = createCrudService<Galeri, GaleriInput>("galeris")

export const galeriService = {
  ...crud,
  listAll: () => crud.list(orderBy("createdAt", "desc")),
  listLatest: (count: number) =>
    crud.list(orderBy("createdAt", "desc"), fbLimit(count)),
}
