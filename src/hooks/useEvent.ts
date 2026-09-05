import { orderBy } from "firebase/firestore"

import { useAsyncData } from "@/hooks/use-async-data"
import { useLiveCollection } from "@/hooks/use-live-collection"
import { eventService } from "@/services/event.service"
import type { KalanaEvent } from "@/types"

export function useEventList() {
  return useAsyncData(() => eventService.listAll(), [])
}

export function useEventLatest(count: number) {
  return useAsyncData(() => eventService.listLatest(count), [count])
}

export function useAdminEventList() {
  return useLiveCollection<KalanaEvent>(
    (onChange, onError) =>
      eventService.subscribe(onChange, onError, orderBy("createdAt", "desc")),
    []
  )
}
