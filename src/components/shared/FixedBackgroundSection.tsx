import { useState, type ReactNode } from "react"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

const TONES = {
  // navy wash, stronger at the edges where headings and links sit
  dark: {
    wrapper: "text-primary-foreground",
    // solid base so the section is already dark before the photo loads
    layer: "bg-primary",
    image: "blur-[6px]",
    overlay:
      "bg-linear-to-b from-primary/95 via-primary/85 to-primary/95",
  },
}

/**
 * Section with a blurred image that stays fixed to the viewport while the
 * content scrolls over it.
 *
 * `background-attachment: fixed` is ignored on iOS Safari and can't be
 * combined with `filter: blur`, so instead the image is a `position: fixed`
 * layer clipped to this section with `clip-path: inset(0)`.
 *
 * Must not be placed inside an element with a transform/filter (e.g.
 * AnimateOnScroll) — that would make the fixed layer scroll with it.
 */
export function FixedBackgroundSection({
  image,
  tone = "dark",
  className,
  children,
}: {
  image: string
  tone?: keyof typeof TONES
  className?: string
  children: ReactNode
}) {
  const styles = TONES[tone]
  // A fixed layer always counts as "in the viewport", so loading="lazy" never
  // defers it. Only request the image once the section is getting close.
  const { ref, inView: near } = useInView<HTMLDivElement>({
    rootMargin: "600px 0px",
  })
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      ref={ref}
      className={cn(
        "relative isolate [clip-path:inset(0)]",
        styles.wrapper,
        className
      )}
    >
      <div
        aria-hidden
        className={cn("pointer-events-none fixed inset-0 -z-10", styles.layer)}
      >
        {/* slightly scaled so the blur doesn't fade out at the edges; the
            overlay below already gives the section its colour meanwhile */}
        {near && (
          <img
            src={image}
            alt=""
            decoding="async"
            onLoad={() => setLoaded(true)}
            className={cn(
              "size-full scale-105 object-cover transition-opacity duration-700",
              loaded ? "opacity-100" : "opacity-0",
              styles.image
            )}
          />
        )}
        <div className={cn("absolute inset-0", styles.overlay)} />
      </div>
      {children}
    </div>
  )
}
