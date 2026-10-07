import {
  ClipboardCheckIcon,
  ClockIcon,
  GraduationCapIcon,
  UsersIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/shared/SectionHeading";

const REASONS = [
  {
    icon: GraduationCapIcon,
    title: "Tutor Berpengalaman",
    description:
      "Diajar oleh tutor yang kompeten di bidangnya, termasuk alumni peraih prestasi olimpiade dan PTN favorit.",
  },
  {
    icon: UsersIcon,
    title: "Kelas Kecil & Personal",
    description:
      "Maksimal 8 siswa per kelas agar setiap siswa mendapat perhatian dan bimbingan yang optimal.",
  },
  {
    icon: ClipboardCheckIcon,
    title: "Kurikulum Terupdate",
    description:
      "Materi selalu disesuaikan dengan kurikulum terbaru dan pola soal ujian terkini.",
  },
  {
    icon: ClockIcon,
    title: "Jadwal Fleksibel",
    description:
      "Pilihan jadwal belajar yang menyesuaikan kesibukan siswa, tanpa mengorbankan kualitas belajar.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-16 pb-14 md:pt-24 md:pb-20">
      <SectionHeading
        eyebrow="Kenapa Kalana Akademik"
        title="Alasan Memilih Kami"
        description="Komitmen kami untuk mendampingi setiap siswa meraih prestasi terbaiknya."
        align="center"
      />

      <div className="stagger mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        {REASONS.map(({ icon: Icon, title, description }, i) => (
          <div
            key={title}
            // icon beside the text on mobile, stacked from sm up
            className="group relative flex gap-4 overflow-hidden rounded-2xl bg-card p-5 ring-1 sm:block sm:p-6 ring-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:ring-primary/20"
          >
            <span
              aria-hidden
              className="absolute top-4 right-5 hidden text-5xl font-bold text-primary/5 sm:block transition-colors group-hover:text-sky-500/15"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl sm:size-12 bg-linear-to-br from-primary to-sky-600 text-primary-foreground shadow-md shadow-primary/20 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
              <Icon className="size-6" />
            </div>
            <div>
              <p className="font-semibold sm:mt-5">{title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:mt-2">
                {description}
              </p>
            </div>
            <span
              aria-hidden
              className="absolute bottom-0 left-0 h-1 w-0 bg-linear-to-r from-primary to-sky-500 transition-all duration-300 group-hover:w-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
