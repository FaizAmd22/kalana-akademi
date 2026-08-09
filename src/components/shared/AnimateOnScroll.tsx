import type { ReactNode } from "react"

import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

interface AnimateOnScrollProps {
  children: ReactNode
  /** animate.css animation name, without the "animate__" prefix. */
  animation?: string
  /** Delay in ms before the animation starts, once in view. */
  delay?: number
  className?: string
}

export function AnimateOnScroll({
  children,
  animation = "fadeInUp",
  delay = 0,
  className,
}: AnimateOnScrollProps) {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={cn(
        !inView && "opacity-0",
        inView && `animate__animated animate__${animation}`,
        className
      )}
      style={inView && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
