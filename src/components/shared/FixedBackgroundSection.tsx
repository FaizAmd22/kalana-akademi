import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

const TONES = {
  // navy wash, stronger at the edges where headings and links sit
  dark: {
    wrapper: "text-primary-foreground",
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

  return (
    <div
      className={cn(
        "relative isolate [clip-path:inset(0)]",
        styles.wrapper,
        className
      )}
    >
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        {/* slightly scaled so the blur doesn't fade out at the edges */}
        <img
          src={image}
          alt=""
          className={cn("size-full scale-105 object-cover", styles.image)}
        />
        <div className={cn("absolute inset-0", styles.overlay)} />
      </div>
      {children}
    </div>
  )
}
