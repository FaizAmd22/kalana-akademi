import { XIcon } from "lucide-react"

/** "12 hasil untuk "fisika"" line with a reset button, shown while searching. */
export function SearchResultInfo({
  query,
  total,
  onClear,
}: {
  query: string
  total?: number
  onClear: () => void
}) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
      <p>
        {total === undefined ? "Mencari" : (
          <>
            <span className="font-semibold text-foreground">{total}</span> hasil
          </>
        )}{" "}
        untuk <span className="font-semibold text-foreground">“{query}”</span>
      </p>
      <button
        type="button"
        onClick={onClear}
        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium text-primary hover:bg-accent"
      >
        <XIcon className="size-3.5" /> Hapus pencarian
      </button>
    </div>
  )
}
