import { Link, useSearchParams } from "react-router-dom"

import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll"
import { ArtikelCard } from "@/components/shared/ArtikelCard"
import { EmptyState } from "@/components/shared/EmptyState"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useArtikelList } from "@/hooks/useArtikel"
import { useKategori } from "@/hooks/useKategori"

export function ArtikelListPage() {
  const [searchParams] = useSearchParams()
  const kategori = searchParams.get("kategori") ?? undefined
  const { getByTipe } = useKategori()
  const { data: artikels, loading, error } = useArtikelList(kategori)

  const kategoriOptions = getByTipe("artikel").sort((a, b) => a.order - b.order)

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <AnimateOnScroll animation="fadeInUp">
        <SectionHeading eyebrow="Artikel" title="Artikel & Berita Kalana Akademik" />

        <div className="mt-6 flex flex-wrap gap-2">
          <Badge
            variant={!kategori ? "default" : "outline"}
            render={<Link to="/artikel" />}
          >
            Semua
          </Badge>
          {kategoriOptions.map((k) => (
            <Badge
              key={k.value}
              variant={kategori === k.value ? "default" : "outline"}
              render={<Link to={`/artikel?kategori=${k.value}`} />}
            >
              {k.label}
            </Badge>
          ))}
        </div>
      </AnimateOnScroll>

      {loading ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      ) : error || !artikels || artikels.length === 0 ? (
        <div className="mt-6">
          <EmptyState description="Belum ada artikel untuk kategori ini." />
        </div>
      ) : (
        <AnimateOnScroll animation="fadeInUp" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {artikels.map((artikel) => (
              <ArtikelCard key={artikel.id} artikel={artikel} />
            ))}
          </div>
        </AnimateOnScroll>
      )}
    </div>
  )
}
