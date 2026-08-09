import { orderBy } from "firebase/firestore"

import { useAsyncData } from "@/hooks/use-async-data"
import { useLiveCollection } from "@/hooks/use-live-collection"
import { testimoniService } from "@/services/testimoni.service"
import type { Testimoni } from "@/types"

export function useTestimoniList() {
  return useAsyncData(() => testimoniService.listAll(), [])
}

export function useTestimoniLatest(count: number) {
  return useAsyncData(() => testimoniService.listLatest(count), [count])
}

export function useAdminTestimoniList() {
  return useLiveCollection<Testimoni>(
    (onChange, onError) =>
      testimoniService.subscribe(onChange, onError, orderBy("createdAt", "desc")),
    []
  )
}
