import { useContext } from "react"
import { where } from "firebase/firestore"

import { KategoriContext } from "@/context/KategoriContext"
import { useLiveCollection } from "@/hooks/use-live-collection"
import { kategoriService } from "@/services/kategori.service"
import type { Kategori, KategoriTipe } from "@/types"

export function useKategori() {
  return useContext(KategoriContext)
}

export function useAdminKategoriList(tipe: KategoriTipe) {
  return useLiveCollection<Kategori>(
    (onChange, onError) =>
      kategoriService.subscribe(onChange, onError, where("tipe", "==", tipe)),
    [tipe]
  )
}
