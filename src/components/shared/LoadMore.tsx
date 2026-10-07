import { ChevronDownIcon, Loader2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"

/** Progress line + "load more" button shown under a paginated list. */
export function LoadMore({
  shown,
  total,
  hasMore,
  loading,
  onLoadMore,
  unit,
}: {
  shown: number
  total?: number
  hasMore: boolean
  loading: boolean
  onLoadMore: () => void
  /** noun after the count, e.g. "program" */
  unit: string
}) {
  // nothing to say for a list that fits on one page
  if (!hasMore && (total === undefined || total <= shown)) return null

  const progress = total ? Math.min(100, (shown / total) * 100) : undefined

  return (
    <div className="mt-10 flex flex-col items-center gap-4">
      {total !== undefined && (
        <div className="w-full max-w-xs text-center">
          <p className="text-sm text-muted-foreground">
            Menampilkan{" "}
            <span className="font-semibold text-foreground">{shown}</span> dari{" "}
            <span className="font-semibold text-foreground">{total}</span>{" "}
            {unit}
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-linear-to-r from-primary to-sky-500 transition-[width] duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {hasMore && (
        <Button
          variant="outline"
          size="lg"
          className="h-11 rounded-full px-6"
          disabled={loading}
          onClick={onLoadMore}
        >
          {loading ? (
            <>
              <Loader2Icon className="animate-spin" /> Memuat...
            </>
          ) : (
            <>
              Muat lebih banyak <ChevronDownIcon />
            </>
          )}
        </Button>
      )}
    </div>
  )
}
