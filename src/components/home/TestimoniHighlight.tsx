import { QuoteIcon } from "lucide-react";

import { Marquee } from "@/components/shared/Marquee";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TestimoniCard } from "@/components/shared/TestimoniCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useParallax } from "@/hooks/use-parallax";
import { useTestimoniList } from "@/hooks/useTestimoni";

export function TestimoniHighlight() {
  const { data: testimonis, loading } = useTestimoniList();
  const quoteRef = useParallax<HTMLDivElement>(0.35);

  if (!loading && (!testimonis || testimonis.length === 0)) return null;

  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      <div
        ref={quoteRef}
        aria-hidden
        className="pointer-events-none absolute top-6 left-1/2 -translate-x-1/2"
      >
        <QuoteIcon className="size-40 text-primary/5" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Testimoni"
          title="Kata Mereka Tentang Kalana Akademik"
          description="Pengalaman siswa dan orang tua yang sudah belajar bersama kami."
          align="center"
        />
      </div>

      <div className="relative mt-6">
        {loading ? (
          <div className="mx-auto flex max-w-6xl gap-4 overflow-hidden px-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-40 w-72 shrink-0" />
            ))}
          </div>
        ) : (
          <Marquee
            items={testimonis!}
            keyFor={(t) => t.id}
            renderItem={(t) => (
              <div className="w-72 sm:w-80">
                <TestimoniCard testimoni={t} />
              </div>
            )}
          />
        )}
      </div>
    </section>
  );
}
