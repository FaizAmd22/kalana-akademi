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
    <section className="mx-auto max-w-6xl px-4 py-12">
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

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))
          : artikels!.map((artikel) => (
              <ArtikelCard key={artikel.id} artikel={artikel} />
            ))}
      </div>
    </section>
  )
}
