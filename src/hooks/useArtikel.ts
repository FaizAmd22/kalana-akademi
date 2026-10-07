import { orderBy } from "firebase/firestore"

import { useAsyncData } from "@/hooks/use-async-data"
import { useLiveCollection } from "@/hooks/use-live-collection"
import { usePaginatedList } from "@/hooks/use-paginated-list"
import { artikelService } from "@/services/artikel.service"
import type { Artikel } from "@/types"

export function useArtikelPages(
  kategori: string | undefined,
  pageSize: number,
  search?: string
) {
  return usePaginatedList(
    (cursor) => artikelService.page(kategori, pageSize, cursor, search),
    () => artikelService.countByKategori(kategori, search),
    [kategori, pageSize, search]
  )
}

export function useArtikelLatest(count: number) {
  return useAsyncData(() => artikelService.listLatest(count), [count])
}

export function useArtikelById(id: string | undefined) {
  return useAsyncData(
    () => (id ? artikelService.getById(id) : Promise.resolve(null)),
    [id]
  )
}

export function useAdminArtikelList() {
  return useLiveCollection<Artikel>(
    (onChange, onError) =>
      artikelService.subscribe(onChange, onError, orderBy("order")),
    []
  )
}
