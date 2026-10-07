import { orderBy } from "firebase/firestore"

import { useLiveCollection } from "@/hooks/use-live-collection"
import { usePaginatedList } from "@/hooks/use-paginated-list"
import { banksoalService } from "@/services/banksoal.service"
import type { BankSoal } from "@/types"

export function useBankSoalPages(
  label: string | undefined,
  pageSize: number,
  search?: string
) {
  return usePaginatedList(
    (cursor) => banksoalService.page(label, pageSize, cursor, search),
    () => banksoalService.countByLabel(label, search),
    [label, pageSize, search]
  )
}

export function useAdminBankSoalList() {
  return useLiveCollection<BankSoal>(
    (onChange, onError) =>
      banksoalService.subscribe(onChange, onError, orderBy("order")),
    []
  )
}
