import { MessageSquareQuoteIcon, StarIcon } from "lucide-react"

import { EmptyState } from "@/components/shared/EmptyState"
import { LoadMore } from "@/components/shared/LoadMore"
import { TentangKamiShell } from "@/components/shared/TentangKamiShell"
import { TestimoniCard } from "@/components/shared/TestimoniCard"
import { Skeleton } from "@/components/ui/skeleton"
import { useTestimoniPages, useTestimoniRating } from "@/hooks/useTestimoni"
import { cn } from "@/lib/utils"

const PAGE_SIZE = 9

function RatingSummary({ total }: { total?: number }) {
  // averaged on the server: with pagination not every testimoni is loaded
  const { data: rating } = useTestimoniRating()
  const average = rating?.average ?? null

  return (
    <div className="mb-8 flex flex-col items-center gap-6 rounded-2xl bg-card p-6 text-center ring-1 ring-foreground/10 sm:flex-row sm:text-left">
      {average !== null && rating && rating.count > 0 && (
        <div className="flex items-center gap-4 sm:border-r sm:border-border sm:pr-6">
          <span className="text-5xl font-bold text-primary">
            {average.toFixed(1)}
          </span>
          <span>
            <span className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <StarIcon
                  key={i}
                  className={cn(
                    "size-5",
                    i < Math.round(average)
                      ? "fill-amber-400 text-amber-400"
                      : "text-muted-foreground/30"
                  )}
                />
              ))}
            </span>
            <span className="mt-1 block text-sm text-muted-foreground">
              Rata-rata dari {rating.count} penilaian
            </span>
          </span>
        </div>
      )}
      <div className="flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
          <MessageSquareQuoteIcon className="size-5" />
        </span>
        <span>
          <span className="block text-2xl font-bold">{total ?? "–"}</span>
          <span className="block text-sm text-muted-foreground">
            Cerita dari siswa & orang tua
          </span>
        </span>
      </div>
    </div>
  )
}

export function TestimoniPage() {
  const { items, loading, total, hasMore, loadingMore, loadMore } =
    useTestimoniPages(PAGE_SIZE)

  return (
    <TentangKamiShell slug="testimoni" title="Testimoni Siswa & Orang Tua">
      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-44 w-full rounded-xl" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyState description="Belum ada testimoni yang tersedia." />
      ) : (
        <>
          <RatingSummary total={total} />
          {/* regular grid: reads left-to-right and every row lines up */}
          <div className="stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((testimoni) => (
              <TestimoniCard key={testimoni.id} testimoni={testimoni} />
            ))}
          </div>
          <LoadMore
            shown={items.length}
            total={total}
            hasMore={hasMore}
            loading={loadingMore}
            onLoadMore={loadMore}
            unit="testimoni"
          />
        </>
      )}
    </TentangKamiShell>
  )
}
