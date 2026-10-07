import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { TentorCard } from "@/components/shared/TentorCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useTentorFirst } from "@/hooks/useTentor";
import { cn } from "@/lib/utils";

const MAX_DISPLAYED = 5;

export function TentorHighlight({ onDark = false }: { onDark?: boolean }) {
  const { data: tentors, loading } = useTentorFirst(MAX_DISPLAYED);

  if (!loading && (!tentors || tentors.length === 0)) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Tentor"
          title="Belajar Bersama Tentor Terbaik"
          description="Didampingi tentor yang berpengalaman dan peduli pada perkembangan setiap siswa."
          inverted={onDark}
        />
        <Link
          to="/tentang-kami/tentor"
          className={cn(
            "flex items-center gap-1 text-sm font-medium hover:underline",
            onDark ? "text-sky-200" : "text-primary"
          )}
        >
          Lihat semua tentor <ArrowRightIcon className="size-4" />
        </Link>
      </div>

      {/* swipeable row on mobile, grid from md up */}
      <div className="stagger mt-6 -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-5">
        {loading
          ? Array.from({ length: MAX_DISPLAYED }).map((_, i) => (
              <Skeleton
                key={i}
                className="aspect-[3/4] w-[42%] shrink-0 snap-start rounded-2xl sm:w-[30%] md:w-full"
              />
            ))
          : tentors!.map((tentor, i) => (
              // the 4-column (tablet) grid would leave the 5th card alone on
              // its own row, so hide it there (carousel and 5 columns are fine)
              <div
                key={tentor.id}
                className={cn(
                  "w-[42%] shrink-0 snap-start sm:w-[30%] md:w-auto",
                  i === 4 && "md:max-lg:hidden"
                )}
              >
                <TentorCard tentor={tentor} />
              </div>
            ))}
      </div>
    </section>
  );
}
