import { limit as fbLimit, orderBy } from "firebase/firestore"

import { createCrudService } from "@/lib/firestore-crud"
import type { Tentor, TentorInput } from "@/types"

const crud = createCrudService<Tentor, TentorInput>("tentors")

export const tentorService = {
  ...crud,
  listAll: () => crud.list(orderBy("order")),
  listFirst: (count: number) => crud.list(orderBy("order"), fbLimit(count)),
}
