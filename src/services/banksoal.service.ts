import { orderBy, where } from "firebase/firestore"

import {
  createCrudService,
  pageFromArray,
  type PageCursor,
} from "@/lib/firestore-crud"
import type { BankSoal, BankSoalInput } from "@/types"

const crud = createCrudService<BankSoal, BankSoalInput>("banksoals")

const filtersFor = (label?: string) =>
  label ? [where("label", "==", label)] : []

const searchFor = (label: string | undefined, search: string) =>
  crud.search({
    filters: filtersFor(label),
    cacheKey: label ?? "*",
    orderField: "order",
    textField: "title",
    query: search,
  })

export const banksoalService = {
  ...crud,
  listAll: () => crud.list(orderBy("order")),
  page: async (
    label: string | undefined,
    pageSize: number,
    cursor: PageCursor | null,
    search?: string
  ) =>
    search
      ? pageFromArray(await searchFor(label, search), pageSize, cursor)
      : crud.listPage({
          filters: filtersFor(label),
          orderField: "order",
          pageSize,
          cursor,
        }),
  countByLabel: async (label?: string, search?: string) =>
    search
      ? (await searchFor(label, search)).length
      : crud.count(...filtersFor(label)),
}
