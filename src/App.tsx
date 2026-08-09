import { BrowserRouter, Route, Routes } from "react-router-dom"

import { ProtectedRoute } from "@/components/admin/ProtectedRoute"
import { AuthProvider } from "@/context/AuthContext"
import { KategoriProvider } from "@/context/KategoriContext"
import { AdminLayout } from "@/layouts/AdminLayout"
import { PublicLayout } from "@/layouts/PublicLayout"
import { AdminArtikelFormPage } from "@/pages/admin/artikel/ArtikelFormPage"
import { AdminArtikelListPage } from "@/pages/admin/artikel/ArtikelListPage"
import { AdminBankSoalFormPage } from "@/pages/admin/banksoal/BankSoalFormPage"
import { AdminBankSoalListPage } from "@/pages/admin/banksoal/BankSoalListPage"
import { AdminDashboardPage } from "@/pages/admin/DashboardPage"
import { AdminFaqListPage } from "@/pages/admin/faq/FaqListPage"
import { AdminGaleriFormPage } from "@/pages/admin/galeri/GaleriFormPage"
import { AdminGaleriListPage } from "@/pages/admin/galeri/GaleriListPage"
import { AdminKategoriListPage } from "@/pages/admin/kategori/KategoriListPage"
import { AdminLoginPage } from "@/pages/admin/LoginPage"
import { AdminPengaturanPage } from "@/pages/admin/pengaturan/PengaturanPage"
import { AdminProgramFormPage } from "@/pages/admin/program/ProgramFormPage"
import { AdminProgramListPage } from "@/pages/admin/program/ProgramListPage"
import { AdminTestimoniFormPage } from "@/pages/admin/testimoni/TestimoniFormPage"
import { AdminTestimoniListPage } from "@/pages/admin/testimoni/TestimoniListPage"
import { ArtikelDetailPage } from "@/pages/artikel/ArtikelDetailPage"
import { ArtikelListPage } from "@/pages/artikel/ArtikelListPage"
import { BankSoalListPage } from "@/pages/banksoal/BankSoalListPage"
import { HomePage } from "@/pages/HomePage"
import { KontakPage } from "@/pages/KontakPage"
import { NotFoundPage } from "@/pages/NotFoundPage"
import { ProgramDetailPage } from "@/pages/program/ProgramDetailPage"
import { ProgramListPage } from "@/pages/program/ProgramListPage"
import { TentangKamiPage } from "@/pages/tentang/TentangKamiPage"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
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
              <Route path="kontak" element={<KontakPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>

            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
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
        </KategoriProvider>
      </AuthProvider>
      <Toaster />
    </BrowserRouter>
  )
}

export default App
