import { orderBy } from "firebase/firestore"

import { useAsyncData } from "@/hooks/use-async-data"
import { useLiveCollection } from "@/hooks/use-live-collection"
import { programService } from "@/services/program.service"
import type { Program } from "@/types"

export function useProgramList(label?: string) {
  return useAsyncData(
    () => (label ? programService.listByLabel(label) : programService.listAll()),
    [label]
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
