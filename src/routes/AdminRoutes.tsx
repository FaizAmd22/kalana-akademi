import { Route, Routes } from "react-router-dom"

import { ProtectedRoute } from "@/components/admin/ProtectedRoute"
import { AuthProvider } from "@/context/AuthContext"
import { AdminLayout } from "@/layouts/AdminLayout"
import { AdminArtikelFormPage } from "@/pages/admin/artikel/ArtikelFormPage"
import { AdminArtikelListPage } from "@/pages/admin/artikel/ArtikelListPage"
import { AdminBankSoalFormPage } from "@/pages/admin/banksoal/BankSoalFormPage"
import { AdminBankSoalListPage } from "@/pages/admin/banksoal/BankSoalListPage"
import { AdminDashboardPage } from "@/pages/admin/DashboardPage"
import { AdminEventFormPage } from "@/pages/admin/event/EventFormPage"
import { AdminEventListPage } from "@/pages/admin/event/EventListPage"
import { AdminFaqListPage } from "@/pages/admin/faq/FaqListPage"
import { AdminGaleriFormPage } from "@/pages/admin/galeri/GaleriFormPage"
import { AdminGaleriListPage } from "@/pages/admin/galeri/GaleriListPage"
import { AdminKategoriListPage } from "@/pages/admin/kategori/KategoriListPage"
import { AdminLoginPage } from "@/pages/admin/LoginPage"
import { AdminPengaturanPage } from "@/pages/admin/pengaturan/PengaturanPage"
import { AdminProgramFormPage } from "@/pages/admin/program/ProgramFormPage"
import { AdminProgramListPage } from "@/pages/admin/program/ProgramListPage"
import { AdminTentorFormPage } from "@/pages/admin/tentor/TentorFormPage"
import { AdminTentorListPage } from "@/pages/admin/tentor/TentorListPage"
import { AdminTestimoniFormPage } from "@/pages/admin/testimoni/TestimoniFormPage"
import { AdminTestimoniListPage } from "@/pages/admin/testimoni/TestimoniListPage"

/**
 * Everything under /admin, loaded as its own chunk (React.lazy in App) so
 * public visitors never download the admin pages, Firebase Auth or the
 * drag-and-drop/form libraries they use.
 */
export default function AdminRoutes() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<AdminLoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboardPage />} />

            <Route path="kategori" element={<AdminKategoriListPage />} />

            <Route path="program" element={<AdminProgramListPage />} />
            <Route
              path="program/baru"
              element={<AdminProgramFormPage />}
            />
            <Route
              path="program/:id/edit"
              element={<AdminProgramFormPage />}
            />

            <Route path="artikel" element={<AdminArtikelListPage />} />
            <Route
              path="artikel/baru"
              element={<AdminArtikelFormPage />}
            />
            <Route
              path="artikel/:id/edit"
              element={<AdminArtikelFormPage />}
            />

            <Route path="bank-soal" element={<AdminBankSoalListPage />} />
            <Route
              path="bank-soal/baru"
              element={<AdminBankSoalFormPage />}
            />
            <Route
              path="bank-soal/:id/edit"
              element={<AdminBankSoalFormPage />}
            />

            <Route path="faq" element={<AdminFaqListPage />} />

            <Route
              path="testimoni"
              element={<AdminTestimoniListPage />}
            />
            <Route
              path="testimoni/baru"
              element={<AdminTestimoniFormPage />}
            />
            <Route
              path="testimoni/:id/edit"
              element={<AdminTestimoniFormPage />}
            />

            <Route path="tentor" element={<AdminTentorListPage />} />
            <Route path="tentor/baru" element={<AdminTentorFormPage />} />
            <Route
              path="tentor/:id/edit"
              element={<AdminTentorFormPage />}
            />

            <Route path="event" element={<AdminEventListPage />} />
            <Route path="event/baru" element={<AdminEventFormPage />} />
            <Route
              path="event/:id/edit"
              element={<AdminEventFormPage />}
            />

            <Route path="galeri" element={<AdminGaleriListPage />} />
            <Route path="galeri/baru" element={<AdminGaleriFormPage />} />
            <Route
              path="galeri/:id/edit"
              element={<AdminGaleriFormPage />}
            />

            <Route path="pengaturan" element={<AdminPengaturanPage />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  )
}
