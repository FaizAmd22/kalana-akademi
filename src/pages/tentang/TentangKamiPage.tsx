import { Link, Navigate, useLocation } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";

import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TENTANG_KAMI_PAGES } from "@/lib/nav-links";

export function TentangKamiPage() {
  const { hash } = useLocation();

  // Old links pointed at sections of a single page (/tentang-kami#galeri);
  // send them to the dedicated page instead.
  const legacyTarget = TENTANG_KAMI_PAGES.find(
    (page) => `#${page.slug}` === hash
  );
  if (legacyTarget) return <Navigate to={legacyTarget.href} replace />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <AnimateOnScroll animation="fadeInUp">
        <SectionHeading
          eyebrow="Tentang Kami"
          title="Mengenal Kalana Akademik Lebih Dekat"
          description="Pilih informasi yang ingin kamu ketahui tentang Kalana Akademik."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TENTANG_KAMI_PAGES.map(
            ({ slug, label, href, description, icon: Icon }) => (
              <Link
                key={slug}
                to={href}
                className="group flex items-start gap-4 rounded-xl bg-card p-5 ring-1 ring-foreground/10 transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-primary/40"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2 font-semibold">
                    {label}
                    <ArrowRightIcon className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" />
                  </span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {description}
                  </span>
                </span>
              </Link>
            )
          )}
        </div>
      </AnimateOnScroll>
    </div>
  );
}
