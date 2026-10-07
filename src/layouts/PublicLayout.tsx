import { Outlet } from "react-router-dom"

import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/footer/Footer"

export function PublicLayout() {
  return (
    // overflow-x-clip (not hidden) so full-bleed sticky bars cannot cause a
    // horizontal scrollbar without breaking position: sticky
    <div className="flex min-h-svh flex-col overflow-x-clip">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
