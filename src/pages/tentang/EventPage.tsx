import { EmptyState } from "@/components/shared/EmptyState"
import { EventGrid } from "@/components/shared/EventGrid"
import { LoadMore } from "@/components/shared/LoadMore"
import { TentangKamiShell } from "@/components/shared/TentangKamiShell"
import { Skeleton } from "@/components/ui/skeleton"
import { useEventPages } from "@/hooks/useEvent"

// 3 rows on desktop (4 columns), 6 on mobile (2 columns)
const PAGE_SIZE = 12

export function EventPage() {
  const { items, loading, total, hasMore, loadingMore, loadMore } =
    useEventPages(PAGE_SIZE)

  return (
    <TentangKamiShell slug="event-kalana" title="Event Kalana">
      {loading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full rounded-xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState description="Belum ada event yang tersedia." />
      ) : (
        <>
          <EventGrid items={items} className="stagger" />
          <LoadMore
            shown={items.length}
            total={total}
            hasMore={hasMore}
            loading={loadingMore}
            onLoadMore={loadMore}
            unit="event"
          />
        </>
      )}
    </TentangKamiShell>
  )
}
