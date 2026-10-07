import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * Horizontal card carousel on native CSS scroll-snap: swipe on touch,
 * arrow buttons and position dots everywhere. No carousel library, so it
 * costs almost nothing in bundle size and scrolling stays on the
 * compositor.
 */
export function CardCarousel({
  children,
  label,
  itemClassName = "w-[85%] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]",
}: {
  children: ReactNode
  /** accessible name of the carousel region */
  label: string
  /** width of each slide, per breakpoint (gap is 1.25rem) */
  itemClassName?: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const items = Children.toArray(children)
  const [page, setPage] = useState(0)
  const [pageCount, setPageCount] = useState(1)

  const measure = useCallback(() => {
    const track = trackRef.current
    const first = track?.firstElementChild as HTMLElement | null
    if (!track || !first) return
    const step = first.offsetWidth + parseFloat(getComputedStyle(track).columnGap || "0")
    const visible = Math.max(1, Math.round(track.clientWidth / step))
    const maxScroll = track.scrollWidth - track.clientWidth
    setPageCount(Math.max(1, items.length - visible + 1))
    // snap to the last dot once the end is reached, even if it is not a
    // whole step away
    setPage(
      track.scrollLeft >= maxScroll - 2
        ? Math.max(0, items.length - visible)
        : Math.round(track.scrollLeft / step)
    )
  }, [items.length])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(measure)
    }
    measure()
    track.addEventListener("scroll", onScroll, { passive: true })
    const observer = new ResizeObserver(onScroll)
    observer.observe(track)
    return () => {
      cancelAnimationFrame(frame)
      track.removeEventListener("scroll", onScroll)
      observer.disconnect()
    }
  }, [measure])

  function scrollToIndex(index: number) {
    const track = trackRef.current
    const first = track?.firstElementChild as HTMLElement | null
    const target = track?.children[index] as HTMLElement | undefined
    if (!track || !first || !target) return
    track.scrollTo({
      // both share the same offsetParent, so the difference is the scroll
      // distance from the first slide
      left: target.offsetLeft - first.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    })
  }

  const canPrev = page > 0
  const canNext = page < pageCount - 1
  const navButton =
    "flex size-10 items-center justify-center rounded-full bg-background text-foreground shadow-md ring-1 ring-foreground/10 transition-all hover:bg-primary hover:text-primary-foreground disabled:pointer-events-none disabled:opacity-40"

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={trackRef}
        // padding gives hover lift / shadows room inside the scroll clip;
        // the negative margin keeps the cards aligned with the container
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto overscroll-x-contain px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((child, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} dari ${items.length}`}
            className={cn("shrink-0 snap-start", itemClassName)}
          >
            {child}
          </div>
        ))}
      </div>

      {pageCount > 1 && (
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Ke slide ${i + 1}`}
                aria-current={i === page ? "true" : undefined}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  i === page
                    ? "w-6 bg-primary"
                    : "w-2 bg-primary/25 hover:bg-primary/50"
                )}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollToIndex(page - 1)}
              disabled={!canPrev}
              className={navButton}
            >
              <ChevronLeftIcon className="size-5" />
              <span className="sr-only">Sebelumnya</span>
            </button>
            <button
              type="button"
              onClick={() => scrollToIndex(page + 1)}
              disabled={!canNext}
              className={navButton}
            >
              <ChevronRightIcon className="size-5" />
              <span className="sr-only">Berikutnya</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
