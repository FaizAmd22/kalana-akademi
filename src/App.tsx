import { lazy, Suspense, useEffect, type ComponentType } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"

import { Toaster } from "@/components/ui/sonner"
import { KategoriProvider } from "@/context/KategoriContext"
import { PublicLayout } from "@/layouts/PublicLayout"
// the landing page stays in the main bundle so it renders without an extra
// round trip; every other page is its own chunk
import { HomePage } from "@/pages/HomePage"

// Public page chunks. Kept in one map so they can also be prefetched while
// the browser is idle, which keeps navigation instant after the first load.
const publicPages = {
  ProgramListPage: () => import("@/pages/program/ProgramListPage"),
  ProgramDetailPage: () => import("@/pages/program/ProgramDetailPage"),
  ArtikelListPage: () => import("@/pages/artikel/ArtikelListPage"),
  ArtikelDetailPage: () => import("@/pages/artikel/ArtikelDetailPage"),
  BankSoalListPage: () => import("@/pages/banksoal/BankSoalListPage"),
  TentangKamiPage: () => import("@/pages/tentang/TentangKamiPage"),
  ProfilPage: () => import("@/pages/tentang/ProfilPage"),
  VisiMisiPage: () => import("@/pages/tentang/VisiMisiPage"),
  TentorPage: () => import("@/pages/tentang/TentorPage"),
  TestimoniPage: () => import("@/pages/tentang/TestimoniPage"),
  FaqPage: () => import("@/pages/tentang/FaqPage"),
  GaleriPage: () => import("@/pages/tentang/GaleriPage"),
  EventPage: () => import("@/pages/tentang/EventPage"),
  KontakPage: () => import("@/pages/KontakPage"),
  NotFoundPage: () => import("@/pages/NotFoundPage"),
}

type PageName = keyof typeof publicPages

/** React.lazy for a page module that uses a named export. */
function lazyPage(name: PageName) {
  return lazy(() =>
    publicPages[name]().then((module) => ({
      default: (module as Record<string, ComponentType>)[name],
    }))
  )
}

const ProgramListPage = lazyPage("ProgramListPage")
const ProgramDetailPage = lazyPage("ProgramDetailPage")
const ArtikelListPage = lazyPage("ArtikelListPage")
const ArtikelDetailPage = lazyPage("ArtikelDetailPage")
const BankSoalListPage = lazyPage("BankSoalListPage")
const TentangKamiPage = lazyPage("TentangKamiPage")
const ProfilPage = lazyPage("ProfilPage")
const VisiMisiPage = lazyPage("VisiMisiPage")
const TentorPage = lazyPage("TentorPage")
const TestimoniPage = lazyPage("TestimoniPage")
const FaqPage = lazyPage("FaqPage")
const GaleriPage = lazyPage("GaleriPage")
const EventPage = lazyPage("EventPage")
const KontakPage = lazyPage("KontakPage")
const NotFoundPage = lazyPage("NotFoundPage")

// the whole admin area (incl. Firebase Auth) as a single separate chunk
const AdminRoutes = lazy(() => import("@/routes/AdminRoutes"))

function AdminFallback() {
  return (
    <div className="flex min-h-svh items-center justify-center text-sm text-muted-foreground">
      Memuat...
    </div>
  )
}

function usePrefetchPublicPages() {
  useEffect(() => {
    const prefetch = () => Object.values(publicPages).forEach((load) => load())
    // after the landing page has settled, not competing with it
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(prefetch, { timeout: 5000 })
      return () => window.cancelIdleCallback(id)
    }
    const id = setTimeout(prefetch, 3000)
    return () => clearTimeout(id)
  }, [])
}

function App() {
  usePrefetchPublicPages()

  return (
    <BrowserRouter>
      <KategoriProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="program" element={<ProgramListPage />} />
            <Route path="program/:id" element={<ProgramDetailPage />} />
            <Route path="artikel" element={<ArtikelListPage />} />
            <Route path="artikel/:id" element={<ArtikelDetailPage />} />
            <Route path="bank-soal" element={<BankSoalListPage />} />
            <Route path="tentang-kami" element={<TentangKamiPage />} />
            <Route path="tentang-kami/profil" element={<ProfilPage />} />
            <Route path="tentang-kami/visi-misi" element={<VisiMisiPage />} />
            <Route path="tentang-kami/tentor" element={<TentorPage />} />
            <Route path="tentang-kami/testimoni" element={<TestimoniPage />} />
            <Route path="tentang-kami/faq" element={<FaqPage />} />
            <Route path="tentang-kami/galeri" element={<GaleriPage />} />
            <Route path="tentang-kami/event-kalana" element={<EventPage />} />
            <Route path="kontak" element={<KontakPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route
            path="/admin/*"
            element={
              <Suspense fallback={<AdminFallback />}>
                <AdminRoutes />
              </Suspense>
            }
          />
        </Routes>
      </KategoriProvider>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
