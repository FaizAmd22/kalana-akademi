import { useSearchParams } from "react-router-dom"
import { BookOpenIcon } from "lucide-react"

import { ReadyToJoin } from "@/components/home/ReadyToJoin"
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll"
import { CategoryFilterBar } from "@/components/shared/CategoryFilterBar"
import { EmptyState } from "@/components/shared/EmptyState"
import { LoadMore } from "@/components/shared/LoadMore"
import { PageHero } from "@/components/shared/PageHero"
import { SearchResultInfo } from "@/components/shared/SearchResultInfo"
import { ProgramCard } from "@/components/shared/ProgramCard"
import { Skeleton } from "@/components/ui/skeleton"
import { useKategori } from "@/hooks/useKategori"
import { useUrlSearch } from "@/hooks/use-url-search"
import { useProgramPages } from "@/hooks/useProgram"
import { MASCOT } from "@/lib/mascots"

// a multiple of the desktop column count so full rows are loaded
const PAGE_SIZE = 9

export function ProgramListPage() {
  const [searchParams] = useSearchParams()
  const label = searchParams.get("label") ?? undefined
  const { getByTipe, getLabel } = useKategori()
  const { input, setInput, query } = useUrlSearch()
  const {
    items: programs,
    loading,
    error,
    total,
    hasMore,
    loadingMore,
    loadMore,
  } = useProgramPages(label, PAGE_SIZE, query || undefined)

  const labelOptions = getByTipe("program").sort((a, b) => a.order - b.order)

  // category links keep the current search term
  const hrefFor = (value?: string) => {
    const params = new URLSearchParams()
    if (value) params.set("label", value)
    if (query) params.set("q", query)
    const qs = params.toString()
    return qs ? `/program?${qs}` : "/program"
  }

  return (
    <div>
      <PageHero
        eyebrow="Program"
        title="Program Bimbingan Belajar"
        description="Pilih program yang sesuai dengan jenjang dan targetmu, dari SD hingga persiapan UTBK dan olimpiade sains."
        icon={BookOpenIcon}
        image={MASCOT.teaching}
        imageAlt="Maskot Kalana Akademik sedang mengajar"
        breadcrumbs={[
          { label: "Program", href: label ? "/program" : undefined },
          ...(label ? [{ label: getLabel("program", label) }] : []),
        ]}
      />

      <div className="mx-auto max-w-6xl px-4 py-6 md:py-8">
        <CategoryFilterBar
          options={[
            { label: "Semua", href: hrefFor(), active: !label },
            ...labelOptions.map((l) => ({
              label: l.label,
              href: hrefFor(l.value),
              active: label === l.value,
            })),
          ]}
          search={input}
          onSearchChange={setInput}
          searchPlaceholder="Cari judul program..."
        />

        {query && (
          <SearchResultInfo
            query={query}
            total={total}
            onClear={() => setInput("")}
          />
        )}

        {loading ? (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-80 w-full rounded-xl" />
            ))}
          </div>
        ) : error || programs.length === 0 ? (
          <div className="mt-4">
            {query ? (
              <EmptyState
                title="Tidak ditemukan"
                description={`Tidak ada program dengan judul “${query}”. Coba kata kunci lain atau pilih kategori “Semua”.`}
              />
            ) : (
              <EmptyState description="Program untuk kategori ini belum tersedia. Hubungi kami untuk informasi lebih lanjut." />
            )}
          </div>
        ) : (
          <>
            <AnimateOnScroll animation="fadeIn" className="mt-4">
              <div className="stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {programs.map((program) => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>
            </AnimateOnScroll>
            <LoadMore
              shown={programs.length}
              total={total}
              hasMore={hasMore}
              loading={loadingMore}
              onLoadMore={loadMore}
              unit="program"
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
