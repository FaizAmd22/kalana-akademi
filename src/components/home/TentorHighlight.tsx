import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { TentorCard } from "@/components/shared/TentorCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useTentorFirst } from "@/hooks/useTentor";
import { cn } from "@/lib/utils";

const MAX_DISPLAYED = 5;

export function TentorHighlight() {
  const { data: tentors, loading } = useTentorFirst(MAX_DISPLAYED);

  if (!loading && (!tentors || tentors.length === 0)) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Tentor"
          title="Belajar Bersama Tentor Terbaik"
          description="Didampingi tentor yang berpengalaman dan peduli pada perkembangan setiap siswa."
        />
        <Link
          to="/tentang-kami/tentor"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Lihat semua tentor <ArrowRightIcon className="size-4" />
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-7 md:grid-cols-4 lg:grid-cols-5">
        {loading
          ? Array.from({ length: MAX_DISPLAYED }).map((_, i) => (
              <Skeleton key={i} className="aspect-[3/4] w-full" />
            ))
          : tentors!.map((tentor, i) => (
              // the 4-column (tablet) grid would leave the 5th card alone on
              // its own row, so only show it where there are 3 or 5 columns
              <div
                key={tentor.id}
                className={cn(i === 4 && "md:max-lg:hidden")}
              >
                <TentorCard tentor={tentor} />
              </div>
            ))}
      </div>
    </section>
  );
}
