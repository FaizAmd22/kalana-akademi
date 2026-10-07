import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { ArrowRightIcon, CheckIcon, SparklesIcon } from "lucide-react"

import { ReadyToJoin } from "@/components/home/ReadyToJoin"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll"
import { PageHero } from "@/components/shared/PageHero"
import { ProgramCard } from "@/components/shared/ProgramCard"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useKategori } from "@/hooks/useKategori"
import { useAsyncData } from "@/hooks/use-async-data"
import { useProgramById } from "@/hooks/useProgram"
import { useSettings } from "@/hooks/useSettings"
import { optimizeImage, responsiveImage } from "@/lib/cloudinary"
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { buildWhatsappUrl } from "@/lib/whatsapp"
import { programService } from "@/services/program.service"

export function ProgramDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { getLabel } = useKategori()
  const { data: program, loading } = useProgramById(id)
  // one extra so 3 remain after leaving out the current program
  const { data: sameLabel } = useAsyncData(
    () =>
      program
        ? programService.page(program.label, 4, null).then((p) => p.items)
        : Promise.resolve([]),
    [program?.label]
  )
  const { data: settings } = useSettings()
  // keyed by program id so the selection resets when navigating to another
  // program (same component instance, different :id)
  const [selected, setSelected] = useState({ id, index: 0 })
  const activeImage = selected.id === id ? selected.index : 0

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-12">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-9 w-2/3" />
        <Skeleton className="aspect-video w-full rounded-2xl" />
      </div>
    )
  }

  if (!program) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-lg font-medium">Program tidak ditemukan.</p>
        <Button
          className="mt-4 rounded-full"
          nativeButton={false}
          render={<Link to="/program" />}
        >
          Lihat Semua Program
        </Button>
      </div>
    )
  }

  const labelText = getLabel("program", program.label)
  const daftarLink = program.daftarLink || settings?.googleFormUrl || "#"
  const whatsappUrl = buildWhatsappUrl(
    settings?.whatsappNumber || DEFAULT_WHATSAPP_NUMBER,
    `Halo Kalana Akademik, saya ingin konsultasi tentang program ${program.title}.`
  )
  const images = program.images.filter(Boolean)
  const related = (sameLabel ?? [])
    .filter((p) => p.id !== program.id)
    .slice(0, 3)

  return (
    <div>
      <PageHero
        eyebrow={labelText}
        title={program.title}
        breadcrumbs={[
          { label: "Program", href: "/program" },
          { label: labelText, href: `/program?label=${program.label}` },
          { label: program.title },
        ]}
      />

      <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 py-10 md:py-14 lg:grid-cols-[1fr_22rem]">
        <AnimateOnScroll animation="fadeInUp" className="min-w-0 space-y-10">
          {/* gallery */}
          {images.length > 0 && (
            <div className="space-y-3">
              <div className="overflow-hidden rounded-2xl shadow-lg ring-1 ring-foreground/10">
                <img
                  {...responsiveImage(
                    images[activeImage] ?? images[0],
                    [700, 1400],
                    "(min-width: 1024px) 750px, 100vw"
                  )}
                  alt={program.title}
                  className="aspect-video w-full object-cover"
                />
              </div>
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
                  {images.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setSelected({ id, index: i })}
                      aria-label={`Lihat gambar ${i + 1}`}
                      className={cn(
                        "w-24 shrink-0 overflow-hidden rounded-lg ring-2 transition-all sm:w-28",
                        i === activeImage
                          ? "ring-primary"
                          : "opacity-70 ring-transparent hover:opacity-100"
                      )}
                    >
                      <img
                        src={optimizeImage(src, 300)}
                        alt=""
                        className="aspect-video w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          <section>
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              Tentang Program
            </h2>
            <p className="mt-3 leading-relaxed whitespace-pre-line text-muted-foreground">
              {program.description}
            </p>
          </section>

          {program.points.length > 0 && (
            <section>
              <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                Yang Kamu Dapatkan
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {program.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 rounded-xl bg-card p-4 text-sm ring-1 ring-foreground/10"
                  >
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-sky-500/15 text-sky-700">
                      <CheckIcon className="size-3.5" />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </AnimateOnScroll>

        {/* sticks beside the content on desktop (top-14 navbar + gap) */}
        <aside className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary via-primary to-sky-800 p-6 text-primary-foreground shadow-xl shadow-primary/20 lg:sticky lg:top-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-sky-400/25 blur-2xl"
          />
          <div className="relative">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold">
              <SparklesIcon className="size-3.5 text-sky-300" />
              {labelText}
            </span>
            <p className="mt-4 text-lg leading-snug font-semibold">
              Tertarik dengan program ini?
            </p>
            <p className="mt-1 text-sm text-primary-foreground/75">
              Daftar sekarang atau konsultasikan dulu kebutuhan belajarmu
              dengan tim kami.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <Button
                size="lg"
                nativeButton={false}
                className="h-11 rounded-full bg-background text-foreground hover:bg-background/90"
                render={<a href={daftarLink} target="_blank" rel="noreferrer" />}
              >
                Daftar Sekarang
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                className="h-11 rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                render={<a href={whatsappUrl} target="_blank" rel="noreferrer" />}
              >
                <WhatsAppIcon className="size-4" /> Konsultasi via WhatsApp
              </Button>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="border-t border-border bg-accent/30">
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-2xl font-bold tracking-tight">
                Program {labelText} Lainnya
              </h2>
              <Link
                to={`/program?label=${program.label}`}
                className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Lihat semua <ArrowRightIcon className="size-4" />
              </Link>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <ProgramCard key={p.id} program={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <AnimateOnScroll animation="zoomIn">
        <ReadyToJoin />
      </AnimateOnScroll>
    </div>
  )
}
