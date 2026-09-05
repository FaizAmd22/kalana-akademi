import { useState } from "react"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth"
import {
  BookOpenIcon,
  CalendarDaysIcon,
  FileTextIcon,
  GalleryHorizontalIcon,
  HelpCircleIcon,
  ImageIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MenuIcon,
  MessageSquareQuoteIcon,
  SettingsIcon,
  TagsIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useAuth } from "@/hooks/useAuth"
import { auth } from "@/lib/firebase"
import { cn } from "@/lib/utils"

const ADMIN_NAV = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboardIcon, end: true },
  { label: "Kategori", to: "/admin/kategori", icon: TagsIcon },
  { label: "Program", to: "/admin/program", icon: BookOpenIcon },
  { label: "Artikel", to: "/admin/artikel", icon: FileTextIcon },
  { label: "Bank Soal", to: "/admin/bank-soal", icon: GalleryHorizontalIcon },
  { label: "FAQ", to: "/admin/faq", icon: HelpCircleIcon },
  { label: "Testimoni", to: "/admin/testimoni", icon: MessageSquareQuoteIcon },
  { label: "Event Kalana", to: "/admin/event", icon: CalendarDaysIcon },
  { label: "Galeri", to: "/admin/galeri", icon: ImageIcon },
  { label: "Pengaturan", to: "/admin/pengaturan", icon: SettingsIcon },
]

function AdminNavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="flex flex-1 flex-col gap-0.5 px-2">
      {ADMIN_NAV.map(({ label, to, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )
          }
        >
          <Icon className="size-4" />
          {label}
        </NavLink>
      ))}
    </nav>
  )
}

export function AdminLayout() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  async function handleLogout() {
    await signOut(auth)
    navigate("/admin/login")
  }

  return (
    <div className="flex min-h-svh">
      <aside className="hidden w-56 shrink-0 border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex md:flex-col">
        <div className="px-4 py-4 text-base font-bold text-sidebar-primary">
          Kalana Akademik
        </div>
        <AdminNavLinks />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center justify-between gap-2 border-b border-border px-4">
          <div className="flex min-w-0 items-center gap-1">
            <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" className="md:hidden" />
                }
              >
                <MenuIcon />
                <span className="sr-only">Buka menu admin</span>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-64 gap-0 bg-sidebar text-sidebar-foreground"
              >
                <SheetHeader>
                  <SheetTitle className="text-sidebar-primary">
                    Kalana Akademik
                  </SheetTitle>
                </SheetHeader>
                <AdminNavLinks onNavigate={() => setMobileNavOpen(false)} />
              </SheetContent>
            </Sheet>
            <span className="truncate text-sm text-muted-foreground">
              {user?.email ?? "Belum login"}
            </span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOutIcon />
            <span className="hidden sm:inline">Keluar</span>
          </Button>
        </header>
        <div className="flex-1 overflow-x-hidden p-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
