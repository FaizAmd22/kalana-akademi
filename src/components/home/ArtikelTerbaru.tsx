import { Link } from "react-router-dom"
import { ArrowRightIcon } from "lucide-react"

import { ArtikelCard } from "@/components/shared/ArtikelCard"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { Skeleton } from "@/components/ui/skeleton"
import { useArtikelLatest } from "@/hooks/useArtikel"

export function ArtikelTerbaru() {
  const { data: artikels, loading } = useArtikelLatest(4)

  if (!loading && (!artikels || artikels.length === 0)) return null

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Artikel"
          title="Artikel & Tips Belajar Terbaru"
        />
        <Link
          to="/artikel"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Lihat semua artikel <ArrowRightIcon className="size-4" />
        </Link>
      </div>

      {/* swipeable row on mobile, grid from sm up */}
      <div className="stagger mt-6 -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-64 w-[80%] shrink-0 snap-start sm:w-full"
              />
            ))
          : artikels!.map((artikel) => (
              <div
                key={artikel.id}
                className="w-[80%] shrink-0 snap-start sm:w-auto"
              >
                <ArtikelCard artikel={artikel} />
              </div>
            ))}
      </div>
    </section>
  )
}
