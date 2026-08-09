import { orderBy, where } from "firebase/firestore"

import { createCrudService } from "@/lib/firestore-crud"
import type { Program, ProgramInput } from "@/types"

const crud = createCrudService<Program, ProgramInput>("programs")

export const programService = {
  ...crud,
  // sorted client-side to avoid requiring a composite Firestore index
  // (equality filter + orderBy on a different field needs one otherwise)
  listByLabel: async (label: string) => {
    const items = await crud.list(where("label", "==", label))
    return items.sort((a, b) => a.order - b.order)
  },
  listAll: () => crud.list(orderBy("order")),
}
