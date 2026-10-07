import { EmptyState } from "@/components/shared/EmptyState"
import { GaleriGrid } from "@/components/shared/GaleriGrid"
import { LoadMore } from "@/components/shared/LoadMore"
import { TentangKamiShell } from "@/components/shared/TentangKamiShell"
import { Skeleton } from "@/components/ui/skeleton"
import { useGaleriPages } from "@/hooks/useGaleri"

// 3 rows on desktop (4 columns), 6 on mobile (2 columns)
const PAGE_SIZE = 12

export function GaleriPage() {
  const { items, loading, total, hasMore, loadingMore, loadMore } =
    useGaleriPages(PAGE_SIZE)

  return (
    <TentangKamiShell slug="galeri" title="Galeri Kegiatan">
      {loading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState description="Belum ada foto galeri yang tersedia." />
      ) : (
        <>
          <GaleriGrid items={items} className="stagger" />
          <LoadMore
            shown={items.length}
            total={total}
            hasMore={hasMore}
            loading={loadingMore}
            onLoadMore={loadMore}
            unit="foto"
          />
        </>
      )}
    </TentangKamiShell>
  )
}
