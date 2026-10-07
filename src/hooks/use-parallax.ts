import { useEffect, useRef } from "react"

/** Measures (reads layout) and returns the DOM write to apply, if any. */
type Updater = () => (() => void) | void

// One shared, rAF-throttled scroll/resize listener for every parallax element
// on the page instead of one listener per element.
const updaters = new Set<Updater>()
let frame = 0

function runFrame() {
  // all reads first, then all writes: interleaving them would force the
  // browser to recalculate layout once per element ("forced reflow")
  const writes: (() => void)[] = []
  updaters.forEach((measure) => {
    const write = measure()
    if (write) writes.push(write)
  })
  writes.forEach((write) => write())
}

function schedule() {
  if (frame) return
  frame = requestAnimationFrame(() => {
    frame = 0
    runFrame()
  })
}

function subscribe(update: Updater) {
  if (updaters.size === 0) {
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
  }
  updaters.add(update)
  update()?.()
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

    const widthQuery = minWidth
      ? window.matchMedia(`(min-width: ${minWidth}px)`)
      : null

    let offset = 0
    const unsubscribe = subscribe(() => {
      // checked on every update so resizing across the breakpoint works
      if (widthQuery && !widthQuery.matches) {
        if (offset === 0) return
        offset = 0
        return () => {
          el.style.translate = ""
          el.style.willChange = ""
        }
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
      const next = Math.round(-fromCentre * speed * 10) / 10
      if (next === offset) return
      offset = next
      return () => {
        el.style.translate = `0 ${next}px`
        // own compositor layer while moving (blurred blobs are expensive to
        // repaint every frame); only set when the effect is actually active
        el.style.willChange = "translate"
      }
    })

    return () => {
      unsubscribe()
      el.style.translate = ""
      el.style.willChange = ""
    }
  }, [speed, minWidth])

  return ref
}
