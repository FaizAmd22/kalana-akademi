import { orderBy } from "firebase/firestore"

import { useAsyncData } from "@/hooks/use-async-data"
import { useLiveCollection } from "@/hooks/use-live-collection"
import { galeriService } from "@/services/galeri.service"
import type { Galeri } from "@/types"

export function useGaleriList() {
  return useAsyncData(() => galeriService.listAll(), [])
}

export function useGaleriLatest(count: number) {
  return useAsyncData(() => galeriService.listLatest(count), [count])
}

export function useAdminGaleriList() {
  return useLiveCollection<Galeri>(
    (onChange, onError) =>
      galeriService.subscribe(onChange, onError, orderBy("createdAt", "desc")),
    []
  )
}
