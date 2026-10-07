import {
  BookOpenIcon,
  CalendarCheckIcon,
  GraduationCapIcon,
  UsersIcon,
} from "lucide-react";

import { STATISTIK } from "@/lib/constants";
import { cn } from "@/lib/utils";

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
];

export function StatistikBar() {
  return (
    // pulled up so it overlaps the bottom of the hero
    <section className="relative z-10 mx-auto -mt-12 max-w-6xl px-4 md:-mt-16">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-4 py-6 text-primary-foreground shadow-xl shadow-primary/20 sm:px-8 sm:py-8">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-16 -right-10 size-48 rounded-full bg-sky-400/20 blur-2xl"
        />
        <div className="relative grid grid-cols-2 gap-y-6 lg:grid-cols-4">
          {STATS.map(({ label, value, icon: Icon }, i) => (
            <div
              key={label}
              className={cn(
                "flex flex-col items-center gap-2 px-2 text-center sm:flex-row sm:gap-3 sm:text-left lg:justify-center",
                // vertical dividers between columns (2 per row, 4 on desktop)
                i > 0 && "lg:border-l lg:border-primary-foreground/15",
                i % 2 === 1 && "border-l border-primary-foreground/15"
              )}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-foreground/10 sm:size-12">
                <Icon className="size-5 text-sky-300 sm:size-6" />
              </span>
              <span>
                <span className="block text-2xl font-bold sm:text-3xl">
                  {value}+
                </span>
                <span className="block text-xs text-primary-foreground/70 sm:text-sm">
                  {label}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
