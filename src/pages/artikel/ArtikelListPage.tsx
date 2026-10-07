import { Link, useSearchParams } from "react-router-dom"

import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll"
import { ArtikelCard } from "@/components/shared/ArtikelCard"
import { EmptyState } from "@/components/shared/EmptyState"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { StickyFilterBar } from "@/components/shared/StickyFilterBar"
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
      <AnimateOnScroll animation="fadeInUp" className="mb-3">
        <SectionHeading eyebrow="Artikel" title="Artikel & Berita Kalana Akademik" />
      </AnimateOnScroll>

      <StickyFilterBar>
        {/* single scrollable row on mobile keeps the sticky bar short */}
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
          <Badge
            className="shrink-0"
            variant={!kategori ? "default" : "outline"}
            render={<Link to="/artikel" />}
          >
            Semua
          </Badge>
          {kategoriOptions.map((k) => (
            <Badge
              key={k.value}
              className="shrink-0"
              variant={kategori === k.value ? "default" : "outline"}
              render={<Link to={`/artikel?kategori=${k.value}`} />}
            >
              {k.label}
            </Badge>
          ))}
        </div>
      </StickyFilterBar>

      {loading ? (
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      ) : error || !artikels || artikels.length === 0 ? (
        <div className="mt-3">
          <EmptyState description="Belum ada artikel untuk kategori ini." />
        </div>
      ) : (
        <AnimateOnScroll animation="fadeInUp" className="mt-3">
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
