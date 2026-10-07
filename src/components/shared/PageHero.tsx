import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { ChevronRightIcon, type LucideIcon } from "lucide-react"

import { ParallaxSection } from "@/components/shared/ParallaxSection"
import { useParallax } from "@/hooks/use-parallax"
import { cn } from "@/lib/utils"

interface Crumb {
  label: string
  href?: string
}

interface PageHeroProps {
  eyebrow?: string
  title: string
  description?: string
  icon?: LucideIcon
  breadcrumbs?: Crumb[]
  /** illustration shown beside the title from md up */
  image?: string
  imageAlt?: string
  /** rendered at the bottom of the banner, e.g. sub-navigation */
  children?: ReactNode
}

/** Gradient page banner with parallax decoration, used by inner pages. */
export function PageHero({
  eyebrow,
  title,
  description,
  icon: Icon,
  breadcrumbs = [],
  image,
  imageAlt = "",
  children,
}: PageHeroProps) {
  const imageRef = useParallax<HTMLDivElement>(-0.12)

  return (
    <ParallaxSection
      variant="dots"
      className="border-b border-primary/10 bg-linear-to-b from-accent/90 via-accent/50 to-accent/20"
    >
      <div className="mx-auto max-w-6xl px-4 pt-8 pb-10 md:pt-12 md:pb-14">
        {breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
          >
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            {breadcrumbs.map((crumb) => (
              <span key={crumb.label} className="flex items-center gap-1">
                <ChevronRightIcon className="size-3.5" />
                {crumb.href ? (
                  <Link to={crumb.href} className="hover:text-foreground">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-medium text-foreground">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            {/* below md the illustration stands in for the icon as a thumbnail */}
            {image && (
              <img
                src={image}
                alt=""
                className="size-20 shrink-0 rounded-2xl object-cover shadow-lg ring-4 ring-background md:hidden"
              />
            )}
            {Icon && (
              <span
                className={cn(
                  "size-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-sky-600 text-primary-foreground shadow-lg shadow-primary/25 motion-safe:animate-float md:size-16",
                  image ? "hidden md:flex" : "flex"
                )}
              >
                <Icon className="size-7 md:size-8" />
              </span>
            )}
            <div className="space-y-2">
              {eyebrow && (
                <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-sky-600 uppercase dark:text-sky-400">
                  <span aria-hidden className="h-0.5 w-6 rounded-full bg-current" />
                  {eyebrow}
                </p>
              )}
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
                {title}
              </h1>
              {description && (
                <p className="max-w-2xl text-muted-foreground md:text-lg">
                  {description}
                </p>
              )}
            </div>
          </div>

          {image && (
            <div
              ref={imageRef}
              className="relative mr-3 hidden size-48 md:block lg:size-60"
            >
              <div
                aria-hidden
                className="absolute inset-0 translate-x-3 translate-y-3 rotate-6 rounded-[2rem] bg-linear-to-br from-sky-300/70 to-primary/30"
              />
              <img
                src={image}
                alt={imageAlt}
                className="relative size-full -rotate-3 rounded-[2rem] object-cover shadow-xl ring-4 ring-background transition-transform duration-500 hover:rotate-0"
              />
            </div>
          )}
        </div>

        {children && <div className="mt-8">{children}</div>}
      </div>
    </ParallaxSection>
  )
}
