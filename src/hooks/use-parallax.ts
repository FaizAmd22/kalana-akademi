import { useEffect, useRef } from "react"

type Updater = () => void

// One shared, rAF-throttled scroll/resize listener for every parallax element
// on the page instead of one listener per element.
const updaters = new Set<Updater>()
let frame = 0

function schedule() {
  if (frame) return
  frame = requestAnimationFrame(() => {
    frame = 0
    updaters.forEach((update) => update())
  })
}

function subscribe(update: Updater) {
  if (updaters.size === 0) {
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
  }
  updaters.add(update)
  update()
  return () => {
    updaters.delete(update)
    if (updaters.size === 0) {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }
}

/**
 * Moves the element vertically relative to scroll. `speed` is the fraction of
 * the element's distance from the viewport centre it shifts by: positive
 * values drift slower than the page (feel further away), negative ones
 * faster. Uses the CSS `translate` property so it composes with any
 * `transform`-based animation on the same element. No-op for users who
 * prefer reduced motion.
 *
 * `minWidth` limits the effect to viewports at least that wide — useful for
 * content that stacks on mobile, where layers moving at different speeds
 * would overlap each other.
 */
export function useParallax<T extends HTMLElement>(
  speed: number,
  { minWidth }: { minWidth?: number } = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    // keep the element on its own compositor layer (blurred blobs are
    // expensive to repaint on every scroll frame otherwise)
    el.style.willChange = "translate"

    const widthQuery = minWidth
      ? window.matchMedia(`(min-width: ${minWidth}px)`)
      : null

    let offset = 0
    const unsubscribe = subscribe(() => {
      // checked on every update so resizing across the breakpoint works
      if (widthQuery && !widthQuery.matches) {
        if (offset !== 0) {
          offset = 0
          el.style.translate = ""
        }
        return
      }

      const rect = el.getBoundingClientRect()
      // remove our own shift so the measurement reflects the natural position
      const top = rect.top - offset
      const viewport = window.innerHeight
      // skip work while the element is well outside the viewport
      if (top > viewport * 1.5 || top + rect.height < -viewport * 0.5) return

      const fromCentre = top + rect.height / 2 - viewport / 2
      // scrolling moves the element up by d; shifting it back by d * speed
      // makes it travel at (1 - speed) of the scroll rate
      offset = Math.round(-fromCentre * speed * 10) / 10
      el.style.translate = `0 ${offset}px`
    })

    return () => {
      unsubscribe()
      el.style.translate = ""
      el.style.willChange = ""
    }
  }, [speed, minWidth])

  return ref
}
