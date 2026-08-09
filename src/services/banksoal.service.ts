import { orderBy, where } from "firebase/firestore"

import { createCrudService } from "@/lib/firestore-crud"
import type { BankSoal, BankSoalInput } from "@/types"

const crud = createCrudService<BankSoal, BankSoalInput>("banksoals")

export const banksoalService = {
  ...crud,
  listAll: () => crud.list(orderBy("order")),
  // sorted client-side to avoid requiring a composite Firestore index
  // (equality filter + orderBy on a different field needs one otherwise)
  listByLabel: async (label: string) => {
    const items = await crud.list(where("label", "==", label))
    return items.sort((a, b) => a.order - b.order)
  },
}
