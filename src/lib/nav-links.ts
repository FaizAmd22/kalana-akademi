import {
  CalendarDaysIcon,
  HelpCircleIcon,
  ImageIcon,
  MessageSquareQuoteIcon,
  SchoolIcon,
  TargetIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react"

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

export interface TentangKamiPageLink {
  slug: string
  label: string
  href: string
  description: string
  icon: LucideIcon
}

// Order matters: the first TENTANG_KAMI_NAV_LIMIT entries are shown directly
// in the navbar dropdown, the rest are reachable via "Lainnya".
export const TENTANG_KAMI_PAGES: TentangKamiPageLink[] = [
  {
    slug: "profil",
    label: "Profil",
    href: "/tentang-kami/profil",
    description: "Kenali Kalana Akademik dan pendekatan belajar kami.",
    icon: SchoolIcon,
  },
  {
    slug: "visi-misi",
    label: "Visi Misi",
    href: "/tentang-kami/visi-misi",
    description: "Tujuan dan komitmen kami untuk setiap siswa.",
    icon: TargetIcon,
  },
  {
    slug: "tentor",
    label: "Tentor",
    href: "/tentang-kami/tentor",
    description: "Tentor-tentor yang mendampingi belajarmu.",
    icon: UsersIcon,
  },
  {
    slug: "testimoni",
    label: "Testimoni",
    href: "/tentang-kami/testimoni",
    description: "Cerita siswa dan orang tua bersama Kalana.",
    icon: MessageSquareQuoteIcon,
  },
  {
    slug: "faq",
    label: "FAQ",
    href: "/tentang-kami/faq",
    description: "Jawaban atas pertanyaan yang sering diajukan.",
    icon: HelpCircleIcon,
  },
  {
    slug: "galeri",
    label: "Galeri",
    href: "/tentang-kami/galeri",
    description: "Dokumentasi kegiatan belajar di Kalana.",
    icon: ImageIcon,
  },
  {
    slug: "event-kalana",
    label: "Event Kalana",
    href: "/tentang-kami/event-kalana",
    description: "Kegiatan dan acara yang diadakan Kalana.",
    icon: CalendarDaysIcon,
  },
]

export const TENTANG_KAMI_NAV_LIMIT = 4

export const TENTANG_KAMI_ITEMS: NavLinkItem[] = [
  ...TENTANG_KAMI_PAGES.slice(0, TENTANG_KAMI_NAV_LIMIT).map(
    ({ label, href }) => ({ label, href })
  ),
  { label: "Lainnya", href: "/tentang-kami", isLihatSemua: true },
]
