import type { KategoriInput } from "@/types"

export const DEFAULT_WHATSAPP_NUMBER = "6281234567890"
export const DEFAULT_WA_MESSAGE =
  "Halo Kalana Akademik, saya ingin mendaftar program bimbingan belajar."
export const DEFAULT_GOOGLE_FORM_URL = ""
export const DEFAULT_EMAIL = "info@kalanaakademik.id"
export const DEFAULT_INSTAGRAM_URL = ""

export const STATISTIK = {
  jumlahSiswa: 500,
  alumniPTN: 120,
  tahunPengalaman: 8,
  programAktif: 5,
}

// Used to bulk-seed the Kategori admin page on first use, matching the site's
// original nav structure — admin is free to rename/add/remove afterwards.
export const SEED_KATEGORI: KategoriInput[] = [
  { tipe: "program", value: "sd", label: "SD", order: 1 },
  { tipe: "program", value: "smp", label: "SMP", order: 2 },
  { tipe: "program", value: "sma", label: "SMA", order: 3 },
  { tipe: "program", value: "utbk", label: "Persiapan UTBK", order: 4 },
  { tipe: "program", value: "olimpiade", label: "Olimpiade Sains", order: 5 },

  { tipe: "banksoal", value: "sd", label: "SD", order: 1 },
  { tipe: "banksoal", value: "smp", label: "SMP", order: 2 },
  { tipe: "banksoal", value: "sma", label: "SMA", order: 3 },
  { tipe: "banksoal", value: "utbk", label: "UTBK", order: 4 },
  { tipe: "banksoal", value: "olimpiade", label: "Olimpiade", order: 5 },

  { tipe: "artikel", value: "tips-belajar", label: "Tips Belajar", order: 1 },
  { tipe: "artikel", value: "utbk", label: "UTBK", order: 2 },
  { tipe: "artikel", value: "olimpiade", label: "Olimpiade", order: 3 },
  { tipe: "artikel", value: "berita-kalana", label: "Berita Kalana", order: 4 },
]
