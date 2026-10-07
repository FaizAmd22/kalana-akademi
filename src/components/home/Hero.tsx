import { Link } from "react-router-dom";
import {
  CheckCircle2Icon,
  GraduationCapIcon,
  SparklesIcon,
  UsersIcon,
} from "lucide-react";

import heroImage from "@/assets/images/hero_image.png";
import { DaftarSekarangButton } from "@/components/shared/DaftarSekarangButton";
import { Button } from "@/components/ui/button";
import { useParallax } from "@/hooks/use-parallax";
import { STATISTIK } from "@/lib/constants";

const HIGHLIGHTS = [
  "Tutor berpengalaman",
  "Kelas kecil & personal",
  "Jadwal fleksibel",
];

export function Hero() {
  // positive = drifts slower than the page (background), negative = faster
  const patternRef = useParallax<HTMLDivElement>(0.3);
  const blobTopRef = useParallax<HTMLDivElement>(0.4);
  const blobBottomRef = useParallax<HTMLDivElement>(-0.15);
  // text and mascot stack on mobile, so only offset them once side by side
  const sideBySide = { minWidth: 768 };
  const textRef = useParallax<HTMLDivElement>(0.1, sideBySide);
  const visualRef = useParallax<HTMLDivElement>(0.18, sideBySide);
  const statTopRef = useParallax<HTMLDivElement>(-0.12, sideBySide);
  const statBottomRef = useParallax<HTMLDivElement>(0.12, sideBySide);

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-accent/80 via-accent/30 to-background">
      {/* decoration */}
      <div
        ref={patternRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24 -bottom-24 bg-[radial-gradient(circle_at_1px_1px,var(--color-primary)_1px,transparent_0)] bg-size-[22px_22px] opacity-[0.07] mask-[linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <div
        ref={blobTopRef}
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-sky-300/30 blur-3xl"
      />
      <div
        ref={blobBottomRef}
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-32 size-96 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 pt-8 pb-24 md:grid-cols-2 md:gap-10 md:pt-16 md:pb-28">
        <div ref={textRef} className="space-y-6 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1 text-xs font-semibold text-primary shadow-sm ring-1 ring-primary/10 backdrop-blur sm:text-sm">
            <SparklesIcon className="size-3.5 text-sky-500" />
            SD · SMP · SMA · UTBK · Olimpiade
          </span>

          <h1 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl md:text-5xl">
            Wujudkan{" "}
            <span className="relative text-primary sm:whitespace-nowrap">
              Prestasi Akademikmu
              <svg
                aria-hidden
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                className="absolute -bottom-1.5 left-0 hidden h-2.5 w-full text-sky-400 sm:block"
              >
                <path
                  d="M2 9C60 3 150 1 298 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>{" "}
            Bersama Kalana Akademik
          </h1>

          <p className="mx-auto max-w-xl text-muted-foreground md:mx-0 md:text-lg">
            Bimbingan belajar personal dengan tutor berpengalaman, untuk siswa
            SD hingga SMA, persiapan UTBK, dan pembinaan olimpiade sains.
          </p>

          <div className="flex flex-wrap justify-center gap-3 md:justify-start">
            <DaftarSekarangButton size="lg" className="shadow-lg shadow-primary/20" />
            <Button
              variant="outline"
              size="lg"
              nativeButton={false}
              className="rounded-full bg-background/70 px-5 backdrop-blur"
              render={<Link to="/program" />}
            >
              Lihat Program
            </Button>
          </div>

          <ul className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground sm:text-sm md:justify-start">
            {HIGHLIGHTS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-1.5 rounded-full bg-background/70 px-3 py-1 ring-1 ring-primary/10 backdrop-blur"
              >
                <CheckCircle2Icon className="size-3.5 text-sky-500 sm:size-4" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div
          ref={visualRef}
          className="relative mx-auto w-full max-w-[17rem] sm:max-w-sm md:max-w-md"
        >
          <div
            aria-hidden
            className="absolute inset-[6%] rounded-full bg-linear-to-br from-sky-200/80 via-accent to-primary/10 ring-1 ring-primary/10"
          />
          <img
            src={heroImage}
            alt="Maskot Kalana Akademik sedang membaca buku"
            className="relative w-full drop-shadow-xl motion-safe:animate-float"
          />

          {/* floating stat cards */}
          <div
            ref={statTopRef}
            className="absolute top-[6%] -left-4 flex items-center gap-2 rounded-2xl bg-background/90 px-2.5 py-1.5 shadow-lg sm:top-[12%] sm:px-3 sm:py-2 ring-1 ring-foreground/5 backdrop-blur motion-safe:animate-float-delayed sm:-left-6">
            <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground sm:size-9 sm:rounded-xl">
              <UsersIcon className="size-3.5 sm:size-4" />
            </span>
            <span className="text-left leading-tight">
              <span className="block text-sm font-bold sm:text-base">
                {STATISTIK.jumlahSiswa}+
              </span>
              <span className="block text-[11px] text-muted-foreground sm:text-xs">
                Siswa aktif
              </span>
            </span>
          </div>
          <div
            ref={statBottomRef}
            className="absolute -right-4 bottom-[4%] flex items-center gap-2 rounded-2xl bg-background/90 px-2.5 py-1.5 shadow-lg sm:bottom-[10%] sm:px-3 sm:py-2 ring-1 ring-foreground/5 backdrop-blur motion-safe:animate-float sm:-right-6">
            <span className="flex size-7 items-center justify-center rounded-lg bg-sky-500 text-white sm:size-9 sm:rounded-xl">
              <GraduationCapIcon className="size-3.5 sm:size-4" />
            </span>
            <span className="text-left leading-tight">
              <span className="block text-sm font-bold sm:text-base">
                {STATISTIK.alumniPTN}+
              </span>
              <span className="block text-[11px] text-muted-foreground sm:text-xs">
                Alumni diterima PTN
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
