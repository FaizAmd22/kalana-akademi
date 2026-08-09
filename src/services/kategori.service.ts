import { createCrudService } from "@/lib/firestore-crud"
import type { Kategori, KategoriInput } from "@/types"

const crud = createCrudService<Kategori, KategoriInput>("kategoris", {
  stampTimestamps: false,
})

export const kategoriService = {
  ...crud,
  // sorted client-side to avoid requiring a composite Firestore index
  listAll: async () => {
    const items = await crud.list()
    return items.sort(
      (a, b) => a.tipe.localeCompare(b.tipe) || a.order - b.order
    )
  },
}
