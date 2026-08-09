export type KategoriTipe = "program" | "banksoal" | "artikel"

export interface Kategori {
  id: string
  tipe: KategoriTipe
  value: string
  label: string
  order: number
}

export type KategoriInput = Omit<Kategori, "id">
