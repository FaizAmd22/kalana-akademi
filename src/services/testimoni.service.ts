import { limit as fbLimit, orderBy } from "firebase/firestore"

import { createCrudService } from "@/lib/firestore-crud"
import type { Testimoni, TestimoniInput } from "@/types"

const crud = createCrudService<Testimoni, TestimoniInput>("testimonis")

export const testimoniService = {
  ...crud,
  listAll: () => crud.list(orderBy("createdAt", "desc")),
  listLatest: (count: number) =>
    crud.list(orderBy("createdAt", "desc"), fbLimit(count)),
}
