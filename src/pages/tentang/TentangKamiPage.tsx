import { Link, Navigate, useLocation } from "react-router-dom";
import { ArrowRightIcon, InfoIcon } from "lucide-react";

import { ReadyToJoin } from "@/components/home/ReadyToJoin";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { PageHero } from "@/components/shared/PageHero";
import { MASCOT } from "@/lib/mascots";
import { TENTANG_KAMI_PAGES } from "@/lib/nav-links";
import { cn } from "@/lib/utils";

export function TentangKamiPage() {
  const { hash } = useLocation();

  // Old links pointed at sections of a single page (/tentang-kami#galeri);
  // send them to the dedicated page instead.
  const legacyTarget = TENTANG_KAMI_PAGES.find(
    (page) => `#${page.slug}` === hash
  );
  if (legacyTarget) return <Navigate to={legacyTarget.href} replace />;

  const lastIndex = TENTANG_KAMI_PAGES.length - 1;

  return (
    <div>
      <PageHero
        eyebrow="Tentang Kami"
        title="Mengenal Kalana Akademik Lebih Dekat"
        description="Pilih informasi yang ingin kamu ketahui tentang Kalana Akademik."
        icon={InfoIcon}
        image={MASCOT.flag}
        imageAlt="Maskot Kalana Akademik menancapkan bendera"
        breadcrumbs={[{ label: "Tentang Kami" }]}
      />

      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <AnimateOnScroll animation="fadeInUp">
          {/* first card is featured; on desktop the last one widens so the
              3-column grid has no gap: 2+1 / 1+1+1 / 1+2 */}
          <div className="stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TENTANG_KAMI_PAGES.map(
              ({ slug, label, href, description, icon: Icon }, i) => {
                const featured = i === 0;
                return (
                  <Link
                    key={slug}
                    to={href}
                    className={cn(
                      "group relative flex flex-col overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                      featured
                        ? "bg-linear-to-br from-primary via-primary to-sky-800 text-primary-foreground shadow-lg shadow-primary/20 hover:shadow-primary/30 sm:col-span-2"
                        : "bg-card ring-1 ring-foreground/10 hover:shadow-primary/10 hover:ring-primary/25",
                      i === lastIndex && "lg:col-span-2"
                    )}
                  >
                    <Icon
                      aria-hidden
                      className={cn(
                        "absolute -right-4 -bottom-4 size-28 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6",
                        featured ? "text-primary-foreground/10" : "text-primary/5"
                      )}
                    />
                    <span
                      className={cn(
                        "flex size-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                        featured
                          ? "bg-primary-foreground/15 text-sky-300"
                          : "bg-linear-to-br from-primary to-sky-600 text-primary-foreground shadow-md shadow-primary/20"
                      )}
                    >
                      <Icon className="size-6" />
                    </span>
                    <span className="relative mt-5 text-lg font-semibold">
                      {label}
                    </span>
                    <span
                      className={cn(
                        "relative mt-1 max-w-md text-sm",
                        featured
                          ? "text-primary-foreground/75"
                          : "text-muted-foreground"
                      )}
                    >
                      {description}
                    </span>
                    <span
                      className={cn(
                        "relative mt-5 flex items-center gap-1 text-sm font-medium",
                        featured ? "text-sky-300" : "text-primary"
                      )}
                    >
                      Selengkapnya
                      <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                );
              }
            )}
          </div>
        </AnimateOnScroll>
      </div>

      <AnimateOnScroll animation="zoomIn">
        <ReadyToJoin />
      </AnimateOnScroll>
    </div>
  );
}
