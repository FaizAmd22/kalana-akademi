import { Link } from "react-router-dom"
import { SearchIcon, XIcon } from "lucide-react"

import { StickyFilterBar } from "@/components/shared/StickyFilterBar"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface FilterOption {
  label: string
  href: string
  active: boolean
}

/**
 * Sticky bar with link-based category chips and a title search box.
 * Must sit directly in the container that also holds the filtered list.
 */
export function CategoryFilterBar({
  options,
  search,
  onSearchChange,
  searchPlaceholder,
}: {
  options: FilterOption[]
  search: string
  onSearchChange: (value: string) => void
  searchPlaceholder: string
}) {
  return (
    <StickyFilterBar
      className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6"
      // the active link's href encodes both the category and the search term
      scrollKey={options.find((o) => o.active)?.href}
    >
      {/* single scrollable row on mobile keeps the sticky bar short */}
      <nav
        aria-label="Filter kategori"
        className="order-2 -mx-4 flex min-w-0 gap-2 overflow-x-auto px-4 [scrollbar-width:none] md:order-1 md:mx-0 md:flex-1 md:flex-wrap md:px-0"
      >
        {options.map((option) => (
          <Link
            key={option.label}
            to={option.href}
            aria-current={option.active ? "page" : undefined}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              option.active
                ? "border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20"
                : "border-border bg-background hover:border-primary/30 hover:bg-muted"
            )}
          >
            {option.label}
          </Link>
        ))}
      </nav>

      <div className="relative order-1 md:order-2 md:w-72 md:shrink-0">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          aria-label={searchPlaceholder}
          className="h-10 rounded-full bg-background pr-9 pl-9 [&::-webkit-search-cancel-button]:hidden"
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            className="absolute top-1/2 right-2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <XIcon className="size-3.5" />
            <span className="sr-only">Hapus pencarian</span>
          </button>
        )}
      </div>
    </StickyFilterBar>
  )
}
