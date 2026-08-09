import { createContext, useEffect, useState, type ReactNode } from "react"

import { kategoriService } from "@/services/kategori.service"
import type { Kategori, KategoriTipe } from "@/types"

interface KategoriContextValue {
  kategoris: Kategori[]
  loading: boolean
  getByTipe: (tipe: KategoriTipe) => Kategori[]
  getLabel: (tipe: KategoriTipe, value: string) => string
}

export const KategoriContext = createContext<KategoriContextValue>({
  kategoris: [],
  loading: true,
  getByTipe: () => [],
  getLabel: (_tipe, value) => value,
})

export function KategoriProvider({ children }: { children: ReactNode }) {
  const [kategoris, setKategoris] = useState<Kategori[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    kategoriService
      .listAll()
      .then(setKategoris)
      .catch(() => setKategoris([]))
      .finally(() => setLoading(false))
  }, [])

  function getByTipe(tipe: KategoriTipe) {
    return kategoris.filter((k) => k.tipe === tipe)
  }

  function getLabel(tipe: KategoriTipe, value: string) {
    return kategoris.find((k) => k.tipe === tipe && k.value === value)?.label ?? value
  }

  return (
    <KategoriContext.Provider value={{ kategoris, loading, getByTipe, getLabel }}>
      {children}
    </KategoriContext.Provider>
  )
}
