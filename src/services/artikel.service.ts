import { limit as fbLimit, orderBy, where } from "firebase/firestore"

import {
  createCrudService,
  pageFromArray,
  type PageCursor,
} from "@/lib/firestore-crud"
import type { Artikel, ArtikelInput } from "@/types"

const crud = createCrudService<Artikel, ArtikelInput>("artikels")

const filtersFor = (kategori?: string) =>
  kategori ? [where("kategori", "==", kategori)] : []

const searchFor = (kategori: string | undefined, search: string) =>
  crud.search({
    filters: filtersFor(kategori),
    cacheKey: kategori ?? "*",
    orderField: "order",
    textField: "title",
    query: search,
  })

export const artikelService = {
  ...crud,
  listAll: () => crud.list(orderBy("order")),
  listLatest: (count: number) => crud.list(orderBy("order"), fbLimit(count)),
  page: async (
    kategori: string | undefined,
    pageSize: number,
    cursor: PageCursor | null,
    search?: string
  ) =>
    search
      ? pageFromArray(await searchFor(kategori, search), pageSize, cursor)
      : crud.listPage({
          filters: filtersFor(kategori),
          orderField: "order",
          pageSize,
          cursor,
        }),
  countByKategori: async (kategori?: string, search?: string) =>
    search
      ? (await searchFor(kategori, search)).length
      : crud.count(...filtersFor(kategori)),
}
