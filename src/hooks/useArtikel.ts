import { orderBy } from "firebase/firestore"

import { useAsyncData } from "@/hooks/use-async-data"
import { useLiveCollection } from "@/hooks/use-live-collection"
import { artikelService } from "@/services/artikel.service"
import type { Artikel } from "@/types"

export function useArtikelList(kategori?: string) {
  return useAsyncData(
    () =>
      kategori
        ? artikelService.listByKategori(kategori)
        : artikelService.listAll(),
    [kategori]
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
