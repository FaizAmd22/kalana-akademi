import { useSearchParams } from "react-router-dom"
import { NewspaperIcon } from "lucide-react"

import { ReadyToJoin } from "@/components/home/ReadyToJoin"
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll"
import { ArtikelCard } from "@/components/shared/ArtikelCard"
import { CategoryFilterBar } from "@/components/shared/CategoryFilterBar"
import { EmptyState } from "@/components/shared/EmptyState"
import { LoadMore } from "@/components/shared/LoadMore"
import { PageHero } from "@/components/shared/PageHero"
import { SearchResultInfo } from "@/components/shared/SearchResultInfo"
import { Skeleton } from "@/components/ui/skeleton"
import { useArtikelPages } from "@/hooks/useArtikel"
import { useKategori } from "@/hooks/useKategori"
import { useUrlSearch } from "@/hooks/use-url-search"
import { MASCOT } from "@/lib/mascots"

// a multiple of the desktop column count so full rows are loaded
const PAGE_SIZE = 8

export function ArtikelListPage() {
  const [searchParams] = useSearchParams()
  const kategori = searchParams.get("kategori") ?? undefined
  const { getByTipe, getLabel } = useKategori()
  const { input, setInput, query } = useUrlSearch()
  const {
    items: artikels,
    loading,
    error,
    total,
    hasMore,
    loadingMore,
    loadMore,
  } = useArtikelPages(kategori, PAGE_SIZE, query || undefined)

  const kategoriOptions = getByTipe("artikel").sort((a, b) => a.order - b.order)

  // category links keep the current search term
  const hrefFor = (value?: string) => {
    const params = new URLSearchParams()
    if (value) params.set("kategori", value)
    if (query) params.set("q", query)
    const qs = params.toString()
    return qs ? `/artikel?${qs}` : "/artikel"
  }

  return (
    <div>
      <PageHero
        eyebrow="Artikel"
        title="Artikel & Berita Kalana Akademik"
        description="Tips belajar, info UTBK dan olimpiade, serta kabar terbaru dari Kalana Akademik."
        icon={NewspaperIcon}
        image={MASCOT.painter}
        imageAlt="Maskot Kalana Akademik sedang melukis"
        breadcrumbs={[
          { label: "Artikel", href: kategori ? "/artikel" : undefined },
          ...(kategori ? [{ label: getLabel("artikel", kategori) }] : []),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6 md:py-8">
        <CategoryFilterBar
          options={[
            { label: "Semua", href: hrefFor(), active: !kategori },
            ...kategoriOptions.map((k) => ({
              label: k.label,
              href: hrefFor(k.value),
              active: kategori === k.value,
            })),
          ]}
          search={input}
          onSearchChange={setInput}
          searchPlaceholder="Cari judul artikel..."
        />

        {query && (
          <SearchResultInfo
            query={query}
            total={total}
            onClear={() => setInput("")}
          />
        )}

        {loading ? (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-72 w-full rounded-xl" />
            ))}
          </div>
        ) : error || artikels.length === 0 ? (
          <div className="mt-4">
            {query ? (
              <EmptyState
                title="Tidak ditemukan"
                description={`Tidak ada artikel dengan judul “${query}”. Coba kata kunci lain atau pilih kategori “Semua”.`}
              />
            ) : (
              <EmptyState description="Belum ada artikel untuk kategori ini." />
            )}
          </div>
        ) : (
          <>
            <AnimateOnScroll animation="fadeIn" className="mt-4">
              <div className="stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {artikels.map((artikel) => (
                  <ArtikelCard key={artikel.id} artikel={artikel} />
                ))}
              </div>
            </AnimateOnScroll>
            <LoadMore
              shown={artikels.length}
              total={total}
              hasMore={hasMore}
              loading={loadingMore}
              onLoadMore={loadMore}
              unit="artikel"
            />
          </>
        )}
      </div>

      <AnimateOnScroll animation="zoomIn">
        <ReadyToJoin />
      </AnimateOnScroll>
    </div>
  )
}
