import { useKategori } from "@/hooks/useKategori"
import { TENTANG_KAMI_ITEMS, type NavLinkItem, type NavMenuItem } from "@/lib/nav-links"
import type { Kategori } from "@/types"

function toNavItems(kategoris: Kategori[], hrefFor: (value: string) => string) {
  return kategoris
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((k) => ({ label: k.label, href: hrefFor(k.value) }))
}

// Only worth a "Lihat Semua" link when there's more than one item to filter
// between — with 0 or 1 category it would just point back at itself.
function withLihatSemua(
  entityLabel: string,
  seeAllHref: string,
  items: NavLinkItem[]
): NavLinkItem[] {
  if (items.length <= 1) return items
  return [
    ...items,
    { label: `Lihat Semua ${entityLabel}`, href: seeAllHref, isLihatSemua: true },
  ]
}

export function useNavMenu(): NavMenuItem[] {
  const { getByTipe } = useKategori()

  const programItems = withLihatSemua(
    "Program",
    "/program",
    toNavItems(getByTipe("program"), (value) => `/program?label=${value}`)
  )
  const artikelItems = withLihatSemua(
    "Artikel",
    "/artikel",
    toNavItems(getByTipe("artikel"), (value) => `/artikel?kategori=${value}`)
  )
  const bankSoalItems = withLihatSemua(
    "Bank Soal",
    "/bank-soal",
    toNavItems(getByTipe("banksoal"), (value) => `/bank-soal?label=${value}`)
  )

  const menu: NavMenuItem[] = [{ label: "Home", href: "/" }]

  if (programItems.length > 0) {
    menu.push({ label: "Program", items: programItems })
  }
  if (artikelItems.length > 0) {
    menu.push({ label: "Artikel", items: artikelItems })
  }
  if (bankSoalItems.length > 0) {
    menu.push({ label: "Bank Soal", items: bankSoalItems })
  }

  menu.push({ label: "Tentang Kami", items: TENTANG_KAMI_ITEMS })
  menu.push({ label: "Kontak", href: "/kontak" })

  return menu
}
