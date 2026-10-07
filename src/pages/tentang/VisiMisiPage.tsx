import {
  GraduationCapIcon,
  LightbulbIcon,
  QuoteIcon,
  TargetIcon,
  TrophyIcon,
} from "lucide-react"

import { TentangKamiShell } from "@/components/shared/TentangKamiShell"

const MISI = [
  {
    icon: GraduationCapIcon,
    text: "Memberikan bimbingan belajar berkualitas dan personal.",
  },
  {
    icon: TrophyIcon,
    text: "Mempersiapkan siswa menghadapi ujian sekolah, UTBK, dan olimpiade sains.",
  },
  {
    icon: LightbulbIcon,
    text: "Menumbuhkan semangat belajar mandiri pada setiap siswa.",
  },
]

export function VisiMisiPage() {
  return (
    <TentangKamiShell slug="visi-misi" title="Visi & Misi">
      {/* Visi */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary via-primary to-sky-800 px-6 py-10 text-primary-foreground shadow-xl shadow-primary/20 sm:px-10 md:py-14">
        <QuoteIcon
          aria-hidden
          className="absolute -top-4 right-4 size-32 text-primary-foreground/10 md:size-44"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-16 size-64 rounded-full bg-sky-400/25 blur-3xl"
        />
        <div className="relative max-w-3xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold tracking-wider uppercase">
            <TargetIcon className="size-3.5 text-sky-300" />
            Visi
          </span>
          <p className="mt-5 text-xl leading-relaxed font-semibold sm:text-2xl md:text-3xl md:leading-snug">
            Menjadi lembaga bimbingan belajar terpercaya yang membantu siswa
            meraih prestasi akademik dan mencapai cita-citanya.
          </p>
        </div>
      </div>

      {/* Misi */}
      <div className="mt-14">
        <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-sky-600 uppercase dark:text-sky-400">
          <span aria-hidden className="h-0.5 w-6 rounded-full bg-current" />
          Misi
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
          Langkah kami untuk mewujudkannya
        </h2>

        <div className="stagger mt-8 grid gap-4 md:grid-cols-3">
          {MISI.map(({ icon: Icon, text }, i) => (
            <div
              key={text}
              className="group relative overflow-hidden rounded-2xl bg-card p-6 ring-1 ring-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:ring-primary/20"
            >
              <span
                aria-hidden
                className="absolute top-4 right-5 text-5xl font-bold text-primary/5 transition-colors group-hover:text-sky-500/15"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex size-12 items-center justify-center rounded-xl bg-linear-to-br from-primary to-sky-600 text-primary-foreground shadow-md shadow-primary/20 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <Icon className="size-6" />
              </span>
              <p className="mt-5 leading-relaxed font-medium">{text}</p>
              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-primary to-sky-500 transition-all duration-300 group-hover:w-full"
              />
            </div>
          ))}
        </div>
      </div>
    </TentangKamiShell>
  )
}
