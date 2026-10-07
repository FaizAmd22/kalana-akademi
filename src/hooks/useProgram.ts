import { orderBy } from "firebase/firestore"

import { useAsyncData } from "@/hooks/use-async-data"
import { useLiveCollection } from "@/hooks/use-live-collection"
import { usePaginatedList } from "@/hooks/use-paginated-list"
import { programService } from "@/services/program.service"
import type { Program } from "@/types"

export function useProgramList() {
  return useAsyncData(() => programService.listAll(), [])
}

export function useProgramPages(
  label: string | undefined,
  pageSize: number,
  search?: string
) {
  return usePaginatedList(
    (cursor) => programService.page(label, pageSize, cursor, search),
    () => programService.countByLabel(label, search),
    [label, pageSize, search]
  )
}

export function useProgramById(id: string | undefined) {
  return useAsyncData(
    () => (id ? programService.getById(id) : Promise.resolve(null)),
    [id]
  )
}

export function useAdminProgramList() {
  return useLiveCollection<Program>(
    (onChange, onError) =>
      programService.subscribe(onChange, onError, orderBy("order")),
    []
  )
}
