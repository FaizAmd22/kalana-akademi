import type { ReactNode } from "react"
import { Link } from "react-router-dom"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

import { ReadyToJoin } from "@/components/home/ReadyToJoin"
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll"
import { PageHero } from "@/components/shared/PageHero"
import { TENTANG_KAMI_MASCOT } from "@/lib/mascots"
import { TENTANG_KAMI_PAGES } from "@/lib/nav-links"
import { cn } from "@/lib/utils"

interface TentangKamiShellProps {
  /** slug of this page in TENTANG_KAMI_PAGES */
  slug: string
  title: string
  description?: string
  width?: "narrow" | "wide"
  children: ReactNode
}

/**
 * Shared frame for every /tentang-kami/* sub-page: banner with breadcrumb and
 * section switcher, the page content, prev/next links and a closing CTA.
 */
export function TentangKamiShell({
  slug,
  title,
  description,
  width = "wide",
  children,
}: TentangKamiShellProps) {
  const index = TENTANG_KAMI_PAGES.findIndex((page) => page.slug === slug)
  const page = TENTANG_KAMI_PAGES[index]
  const prev = TENTANG_KAMI_PAGES[index - 1]
  const next = TENTANG_KAMI_PAGES[index + 1]

  return (
    <div>
      <PageHero
        eyebrow="Tentang Kami"
        title={title}
        description={description ?? page?.description}
        icon={page?.icon}
        image={TENTANG_KAMI_MASCOT[slug]}
        imageAlt={`Maskot Kalana Akademik — ${page?.label ?? title}`}
        breadcrumbs={[
          { label: "Tentang Kami", href: "/tentang-kami" },
          { label: page?.label ?? title },
        ]}
      >
        {/* section switcher; one scrollable row on small screens */}
        <nav
          aria-label="Halaman Tentang Kami"
          className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0"
        >
          {TENTANG_KAMI_PAGES.map(({ slug: s, label, href, icon: Icon }) => (
            <Link
              key={s}
              to={href}
              aria-current={s === slug ? "page" : undefined}
              className={cn(
                "flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                s === slug
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "bg-background/80 text-muted-foreground ring-1 ring-foreground/10 backdrop-blur hover:text-foreground hover:ring-primary/30"
              )}
            >
              <Icon className="size-3.5" />
              {label}
            </Link>
          ))}
        </nav>
      </PageHero>

      <div
        className={cn(
          "mx-auto px-4 py-12 md:py-16",
          width === "narrow" ? "max-w-3xl" : "max-w-6xl"
        )}
      >
        <AnimateOnScroll animation="fadeInUp">{children}</AnimateOnScroll>

        {(prev || next) && (
          <div className="mt-14 grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
            {prev ? (
              <PageLink to={prev.href} label={prev.label} direction="prev" />
            ) : (
              <span className="hidden sm:block" />
            )}
            {next && (
              <PageLink to={next.href} label={next.label} direction="next" />
            )}
          </div>
        )}
      </div>

      <AnimateOnScroll animation="zoomIn">
        <ReadyToJoin />
      </AnimateOnScroll>
    </div>
  )
}

function PageLink({
  to,
  label,
  direction,
}: {
  to: string
  label: string
  direction: "prev" | "next"
}) {
  const isNext = direction === "next"
  return (
    <Link
      to={to}
      className={cn(
        "group flex items-center gap-3 rounded-xl bg-card p-4 ring-1 ring-foreground/10 transition-all hover:shadow-md hover:ring-primary/30",
        isNext && "flex-row-reverse text-right"
      )}
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        {isNext ? (
          <ArrowRightIcon className="size-4" />
        ) : (
          <ArrowLeftIcon className="size-4" />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-muted-foreground">
          {isNext ? "Berikutnya" : "Sebelumnya"}
        </span>
        <span className="block truncate font-semibold">{label}</span>
      </span>
    </Link>
  )
}
