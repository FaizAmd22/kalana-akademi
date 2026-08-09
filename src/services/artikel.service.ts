import { limit as fbLimit, orderBy, where } from "firebase/firestore"

import { createCrudService } from "@/lib/firestore-crud"
import type { Artikel, ArtikelInput } from "@/types"

const crud = createCrudService<Artikel, ArtikelInput>("artikels")

export const artikelService = {
  ...crud,
  listAll: () => crud.list(orderBy("order")),
  // sorted client-side to avoid requiring a composite Firestore index
  // (equality filter + orderBy on a different field needs one otherwise)
  listByKategori: async (kategori: string) => {
    const items = await crud.list(where("kategori", "==", kategori))
    return items.sort((a, b) => a.order - b.order)
  },
  listLatest: (count: number) => crud.list(orderBy("order"), fbLimit(count)),
}
