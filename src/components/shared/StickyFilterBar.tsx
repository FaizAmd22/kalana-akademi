import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

// matches the public navbar: h-14 (56px) + 1px bottom border
const NAVBAR_OFFSET_PX = 57

/**
 * Filter bar that sticks right below the navbar while its parent scrolls by.
 * Must be a direct child of an element that also contains the filtered list —
 * sticky only works within the bounds of its parent.
 */
export function StickyFilterBar({
  children,
  className,
  scrollKey,
}: {
  children: ReactNode
  className?: string
  /**
   * Identifies the active filter. When it changes while the user has
   * scrolled past the start of the list, the page scrolls back so the bar
   * sits under the navbar with the first results right below it — instead
   * of leaving them looking at the bottom of a now-shorter list.
   */
  scrollKey?: string
}) {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [stuck, setStuck] = useState(false)
  const previousKey = useRef(scrollKey)

  useEffect(() => {
    if (scrollKey === previousKey.current) return
    previousKey.current = scrollKey

    const el = sentinelRef.current
    if (!el) return
    const top = el.getBoundingClientRect().top
    // already at or above the list start: nothing to bring into view
    if (top >= NAVBAR_OFFSET_PX) return

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches
    window.scrollTo({
      top: window.scrollY + top - NAVBAR_OFFSET_PX,
      behavior: reduceMotion ? "auto" : "smooth",
    })
  }, [scrollKey])

  // a zero-height marker right above the bar: once it scrolls under the
  // navbar, the bar is stuck and gets a divider so it reads as a toolbar
  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) =>
        setStuck(!entry.isIntersecting && entry.boundingClientRect.top < NAVBAR_OFFSET_PX),
      { rootMargin: `-${NAVBAR_OFFSET_PX}px 0px 0px 0px`, threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div ref={sentinelRef} aria-hidden />
      <div
        className={cn(
          // content stays aligned with the page container, while the ::before
          // layer paints the background + divider edge to edge like the navbar
          "sticky top-14 z-30 py-3",
          "before:pointer-events-none before:absolute before:inset-y-0 before:left-1/2 before:-z-10 before:w-screen before:-translate-x-1/2 before:border-b before:transition-colors",
          stuck
            ? "before:border-border before:bg-background/95 before:backdrop-blur supports-backdrop-filter:before:bg-background/80"
            : "before:border-transparent before:bg-background",
          className
        )}
      >
        {children}
      </div>
    </>
  )
}
