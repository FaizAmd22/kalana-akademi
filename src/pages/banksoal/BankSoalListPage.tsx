import { useSearchParams } from "react-router-dom"
import { ClipboardListIcon } from "lucide-react"

import { ReadyToJoin } from "@/components/home/ReadyToJoin"
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll"
import { BankSoalCard } from "@/components/shared/BankSoalCard"
import { CategoryFilterBar } from "@/components/shared/CategoryFilterBar"
import { EmptyState } from "@/components/shared/EmptyState"
import { LoadMore } from "@/components/shared/LoadMore"
import { PageHero } from "@/components/shared/PageHero"
import { SearchResultInfo } from "@/components/shared/SearchResultInfo"
import { Skeleton } from "@/components/ui/skeleton"
import { useBankSoalPages } from "@/hooks/useBankSoal"
import { useKategori } from "@/hooks/useKategori"
import { useUrlSearch } from "@/hooks/use-url-search"
import { MASCOT } from "@/lib/mascots"

// a multiple of the desktop column count so full rows are loaded
const PAGE_SIZE = 9

export function BankSoalListPage() {
  const [searchParams] = useSearchParams()
  const label = searchParams.get("label") ?? undefined
  const { getByTipe, getLabel } = useKategori()
  const { input, setInput, query } = useUrlSearch()
  const {
    items,
    loading,
    error,
    total,
    hasMore,
    loadingMore,
    loadMore,
  } = useBankSoalPages(label, PAGE_SIZE, query || undefined)

  const labelOptions = getByTipe("banksoal").sort((a, b) => a.order - b.order)

  // category links keep the current search term
  const hrefFor = (value?: string) => {
    const params = new URLSearchParams()
    if (value) params.set("label", value)
    if (query) params.set("q", query)
    const qs = params.toString()
    return qs ? `/bank-soal?${qs}` : "/bank-soal"
  }

  return (
    <div>
      <PageHero
        eyebrow="Bank Soal"
        title="Bank Soal Latihan"
        description="Latihan soal lengkap dengan pembahasan untuk persiapan ujian."
        icon={ClipboardListIcon}
        image={MASCOT.question}
        imageAlt="Maskot Kalana Akademik sedang berpikir"
        breadcrumbs={[
          { label: "Bank Soal", href: label ? "/bank-soal" : undefined },
          ...(label ? [{ label: getLabel("banksoal", label) }] : []),
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
          searchPlaceholder="Cari judul soal..."
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
              <Skeleton key={i} className="h-56 w-full rounded-2xl" />
            ))}
          </div>
        ) : error || items.length === 0 ? (
          <div className="mt-4">
            {query ? (
              <EmptyState
                title="Tidak ditemukan"
                description={`Tidak ada soal dengan judul “${query}”. Coba kata kunci lain atau pilih kategori “Semua”.`}
              />
            ) : (
              <EmptyState description="Bank soal untuk kategori ini belum tersedia." />
            )}
          </div>
        ) : (
          <>
            <AnimateOnScroll animation="fadeIn" className="mt-4">
              <div className="stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item) => (
                  <BankSoalCard key={item.id} bankSoal={item} />
                ))}
              </div>
            </AnimateOnScroll>
            <LoadMore
              shown={items.length}
              total={total}
              hasMore={hasMore}
              loading={loadingMore}
              onLoadMore={loadMore}
              unit="paket soal"
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
