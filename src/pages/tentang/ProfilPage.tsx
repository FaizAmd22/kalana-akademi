import {
  BookOpenIcon,
  CalendarCheckIcon,
  GraduationCapIcon,
  UsersIcon,
} from "lucide-react"

import heroImage from "@/assets/images/hero_image.png"
import { WhyChooseUs } from "@/components/home/WhyChooseUs"
import { TentangKamiShell } from "@/components/shared/TentangKamiShell"
import { STATISTIK } from "@/lib/constants"

const JENJANG = ["SD", "SMP", "SMA", "Persiapan UTBK", "Olimpiade Sains"]

const STATS = [
  { label: "Siswa Aktif", value: STATISTIK.jumlahSiswa, icon: UsersIcon },
  {
    label: "Alumni Diterima PTN",
    value: STATISTIK.alumniPTN,
    icon: GraduationCapIcon,
  },
  {
    label: "Tahun Pengalaman",
    value: STATISTIK.tahunPengalaman,
    icon: CalendarCheckIcon,
  },
  { label: "Program Aktif", value: STATISTIK.programAktif, icon: BookOpenIcon },
]

export function ProfilPage() {
  return (
    <TentangKamiShell slug="profil" title="Profil Kalana Akademik">
      <div className="grid items-center gap-10 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-5">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Pendampingan belajar yang{" "}
            <span className="text-primary">menyesuaikan setiap siswa</span>
          </h2>
          <div className="space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Kalana Akademik adalah lembaga bimbingan belajar yang berfokus
              pada pendampingan akademik siswa SD, SMP, dan SMA, termasuk
              persiapan UTBK dan pembinaan olimpiade sains.
            </p>
            <p>
              Kami percaya setiap siswa memiliki potensi yang berbeda, sehingga
              pendekatan belajar yang kami gunakan disesuaikan dengan kebutuhan
              masing-masing siswa, didampingi oleh tutor-tutor berpengalaman di
              bidangnya.
            </p>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold">Jenjang yang kami dampingi</p>
            <div className="flex flex-wrap gap-2">
              {JENJANG.map((j) => (
                <span
                  key={j}
                  className="rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground"
                >
                  {j}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xs sm:max-w-sm">
          <div
            aria-hidden
            className="absolute inset-[6%] rounded-full bg-linear-to-br from-sky-200/80 via-accent to-primary/10 ring-1 ring-primary/10"
          />
          <img
            src={heroImage}
            alt="Maskot Kalana Akademik"
            className="relative w-full drop-shadow-xl motion-safe:animate-float"
          />
        </div>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {STATS.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 rounded-2xl bg-card p-5 text-center ring-1 ring-foreground/10 sm:flex-row sm:text-left"
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
              <Icon className="size-5" />
            </span>
            <span>
              <span className="block text-2xl font-bold text-primary">
                {value}+
              </span>
              <span className="block text-xs text-muted-foreground sm:text-sm">
                {label}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* WhyChooseUs brings its own section padding/container */}
      <div className="-mx-4 mt-4">
        <WhyChooseUs />
      </div>
    </TentangKamiShell>
  )
}
