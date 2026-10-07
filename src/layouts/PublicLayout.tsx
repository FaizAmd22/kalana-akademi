import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"

import { Navbar } from "@/components/navbar/Navbar"
import { Footer } from "@/components/footer/Footer"

// Client-side navigation keeps the previous scroll position by default, so a
// link clicked at the bottom of one page would open the next page mid-way.
function ScrollToTopOnNavigate() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export function PublicLayout() {
  return (
    // overflow-x-clip (not hidden) so full-bleed sticky bars cannot cause a
    // horizontal scrollbar without breaking position: sticky
    <div className="flex min-h-svh flex-col overflow-x-clip">
      <ScrollToTopOnNavigate />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
