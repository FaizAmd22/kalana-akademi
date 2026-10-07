import { orderBy } from "firebase/firestore"

import { useAsyncData } from "@/hooks/use-async-data"
import { useLiveCollection } from "@/hooks/use-live-collection"
import { tentorService } from "@/services/tentor.service"
import type { Tentor } from "@/types"

export function useTentorList() {
  return useAsyncData(() => tentorService.listAll(), [])
}

export function useTentorFirst(count: number) {
  return useAsyncData(() => tentorService.listFirst(count), [count])
}

export function useAdminTentorList() {
  return useLiveCollection<Tentor>(
    (onChange, onError) =>
      tentorService.subscribe(onChange, onError, orderBy("order")),
    []
  )
}
