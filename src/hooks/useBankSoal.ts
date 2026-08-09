import { orderBy } from "firebase/firestore"

import { useAsyncData } from "@/hooks/use-async-data"
import { useLiveCollection } from "@/hooks/use-live-collection"
import { banksoalService } from "@/services/banksoal.service"
import type { BankSoal } from "@/types"

export function useBankSoalList(label?: string) {
  return useAsyncData(
    () =>
      label ? banksoalService.listByLabel(label) : banksoalService.listAll(),
    [label]
  )
}

export function useAdminBankSoalList() {
  return useLiveCollection<BankSoal>(
    (onChange, onError) =>
      banksoalService.subscribe(onChange, onError, orderBy("order")),
    []
  )
}
