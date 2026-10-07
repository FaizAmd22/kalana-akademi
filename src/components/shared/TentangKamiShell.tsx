import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { ChevronRightIcon } from "lucide-react"

import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { cn } from "@/lib/utils"

interface TentangKamiShellProps {
  title: string
  description?: string
  width?: "narrow" | "wide"
  children: ReactNode
}

/** Shared frame for every /tentang-kami/* sub-page: breadcrumb + heading. */
export function TentangKamiShell({
  title,
  description,
  width = "wide",
  children,
}: TentangKamiShellProps) {
  return (
    <div
      className={cn(
        "mx-auto px-4 py-12",
        width === "narrow" ? "max-w-3xl" : "max-w-6xl"
      )}
    >
      <nav
        aria-label="Breadcrumb"
        className="mb-4 flex items-center gap-1 text-sm text-muted-foreground"
      >
        <Link to="/tentang-kami" className="hover:text-foreground">
          Tentang Kami
        </Link>
        <ChevronRightIcon className="size-3.5" />
        <span className="text-foreground">{title}</span>
      </nav>

      <AnimateOnScroll animation="fadeInUp">
        <SectionHeading title={title} description={description} />
        <div className="mt-8">{children}</div>
      </AnimateOnScroll>
    </div>
  )
}
