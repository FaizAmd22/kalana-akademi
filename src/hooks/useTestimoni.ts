import { orderBy } from "firebase/firestore"

import { useAsyncData } from "@/hooks/use-async-data"
import { useLiveCollection } from "@/hooks/use-live-collection"
import { usePaginatedList } from "@/hooks/use-paginated-list"
import { testimoniService } from "@/services/testimoni.service"
import type { Testimoni } from "@/types"

export function useTestimoniList() {
  return useAsyncData(() => testimoniService.listAll(), [])
}

export function useTestimoniLatest(count: number) {
  return useAsyncData(() => testimoniService.listLatest(count), [count])
}

export function useTestimoniPages(pageSize: number) {
  return usePaginatedList(
    (cursor) => testimoniService.page(pageSize, cursor),
    () => testimoniService.count(),
    [pageSize]
  )
}

export function useTestimoniRating() {
  return useAsyncData(() => testimoniService.ratingSummary(), [])
}

export function useAdminTestimoniList() {
  return useLiveCollection<Testimoni>(
    (onChange, onError) =>
      testimoniService.subscribe(onChange, onError, orderBy("createdAt", "desc")),
    []
  )
}
