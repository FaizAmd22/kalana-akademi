import type { ReactNode } from "react"
import {
  CircleIcon,
  PlusIcon,
  SparkleIcon,
  SquareIcon,
  TriangleIcon,
  type LucideIcon,
} from "lucide-react"

import { useParallax } from "@/hooks/use-parallax"
import { cn } from "@/lib/utils"

interface Layer {
  className: string
  /** see useParallax: positive drifts slower than the page, negative faster */
  speed: number
  /** small outlined shape; `className` then only positions it */
  icon?: LucideIcon
  iconClassName?: string
}

// Pattern layers are oversized (-inset-y-80) so even the largest shift never
// exposes their edge inside the section.
const DOTS =
  "bg-[radial-gradient(circle_at_1px_1px,var(--color-primary)_1.5px,transparent_0)] bg-size-[24px_24px] opacity-[0.12]"
const GRID =
  "bg-[linear-gradient(to_right,var(--color-primary)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-primary)_1px,transparent_1px)] bg-size-[48px_48px] opacity-[0.07]"

// Distinct small shapes moving at clearly different speeds are what make the
// depth readable — a uniform pattern alone barely looks like it moves.
const VARIANTS = {
  // dot field from the left, glow top-right, ring bottom-left
  dots: [
    {
      className: cn(
        DOTS,
        "inset-x-0 -inset-y-80 mask-[linear-gradient(to_right,black,transparent_70%)]"
      ),
      speed: 0.35,
    },
    {
      className:
        "-top-24 -right-24 size-80 rounded-full bg-sky-300/40 blur-3xl md:size-[28rem]",
      speed: 0.55,
    },
    {
      className:
        "-bottom-24 -left-16 size-64 rounded-full border-[36px] border-primary/10",
      speed: -0.3,
    },
    {
      icon: PlusIcon,
      className: "top-[12%] left-[8%]",
      iconClassName: "size-8 text-sky-500/50",
      speed: -0.45,
    },
    {
      icon: CircleIcon,
      className: "top-[30%] right-[6%]",
      iconClassName: "size-10 text-primary/25",
      speed: 0.6,
    },
    {
      icon: SquareIcon,
      className: "bottom-[18%] right-[22%]",
      iconClassName: "size-6 rotate-12 text-sky-500/40",
      speed: -0.25,
    },
    {
      icon: SparkleIcon,
      className: "bottom-[10%] left-[38%] hidden md:block",
      iconClassName: "size-7 text-primary/25",
      speed: 0.4,
    },
  ],
  // grid glowing from the centre, glow bottom-right
  grid: [
    {
      className: cn(
        GRID,
        "inset-x-0 -inset-y-80 mask-[radial-gradient(ellipse_at_center,black,transparent_65%)]"
      ),
      speed: 0.3,
    },
    {
      className:
        "-right-32 -bottom-32 size-96 rounded-full bg-primary/15 blur-3xl",
      speed: 0.55,
    },
    {
      className:
        "top-8 -left-12 size-32 rounded-full border-[18px] border-sky-400/25",
      speed: -0.35,
    },
    {
      icon: TriangleIcon,
      className: "top-[16%] right-[10%]",
      iconClassName: "size-9 rotate-12 text-sky-500/45",
      speed: -0.5,
    },
    {
      icon: PlusIcon,
      className: "bottom-[14%] left-[12%]",
      iconClassName: "size-8 text-primary/30",
      speed: 0.55,
    },
    {
      icon: CircleIcon,
      className: "top-[45%] left-[48%] hidden md:block",
      iconClassName: "size-5 text-sky-500/40",
      speed: -0.3,
    },
    {
      icon: SquareIcon,
      className: "bottom-[24%] right-[30%]",
      iconClassName: "size-7 -rotate-12 text-primary/20",
      speed: 0.4,
    },
  ],
  // dot field from the right, glow top-left, ring right
  "dots-reverse": [
    {
      className: cn(
        DOTS,
        "inset-x-0 -inset-y-80 mask-[linear-gradient(to_left,black,transparent_70%)]"
      ),
      speed: 0.35,
    },
    {
      className:
        "-top-28 -left-28 size-80 rounded-full bg-sky-300/40 blur-3xl md:size-[28rem]",
      speed: 0.55,
    },
    {
      className:
        "top-1/4 -right-20 size-56 rounded-full border-[32px] border-primary/10",
      speed: -0.3,
    },
    {
      icon: SparkleIcon,
      className: "top-[14%] left-[30%]",
      iconClassName: "size-8 text-sky-500/50",
      speed: -0.45,
    },
    {
      icon: SquareIcon,
      className: "bottom-[16%] left-[6%]",
      iconClassName: "size-8 rotate-45 text-primary/25",
      speed: 0.55,
    },
    {
      icon: PlusIcon,
      className: "bottom-[30%] right-[14%]",
      iconClassName: "size-7 text-sky-500/45",
      speed: -0.3,
    },
    {
      icon: TriangleIcon,
      className: "top-[20%] right-[34%] hidden md:block",
      iconClassName: "size-6 -rotate-12 text-primary/20",
      speed: 0.45,
    },
  ],
} satisfies Record<string, Layer[]>

function ParallaxLayer({ className, speed, icon: Icon, iconClassName }: Layer) {
  const ref = useParallax<HTMLDivElement>(speed)
  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute", className)}
    >
      {Icon && <Icon className={iconClassName} strokeWidth={2.5} />}
    </div>
  )
}

/**
 * Full-width section band with decorative background layers that move at
 * different speeds while scrolling.
 */
export function ParallaxSection({
  variant,
  tinted = false,
  className,
  children,
}: {
  variant: keyof typeof VARIANTS
  tinted?: boolean
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden",
        tinted && "bg-accent/40",
        className
      )}
    >
      <div aria-hidden className="absolute inset-0 -z-10">
        {VARIANTS[variant].map((layer, i) => (
          <ParallaxLayer key={i} {...layer} />
        ))}
      </div>
      {children}
    </div>
  )
}
