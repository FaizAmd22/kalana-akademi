export interface NavLinkItem {
  label: string
  href: string
  isLihatSemua?: boolean
}

export interface NavMenuItem {
  label: string
  href?: string
  items?: NavLinkItem[]
}

export const TENTANG_KAMI_ITEMS: NavLinkItem[] = [
  { label: "Profil", href: "/tentang-kami#profil" },
  { label: "Visi Misi", href: "/tentang-kami#visi-misi" },
  { label: "FAQ", href: "/tentang-kami#faq" },
  { label: "Testimoni", href: "/tentang-kami#testimoni" },
  { label: "Galeri", href: "/tentang-kami#galeri" },
]
