import { Link } from "react-router-dom";
import { ArrowRightIcon } from "lucide-react";

import { EventGrid } from "@/components/shared/EventGrid";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Skeleton } from "@/components/ui/skeleton";
import { useEventLatest } from "@/hooks/useEvent";

export function EventHighlight() {
  const { data: items, loading } = useEventLatest(4);

  if (!loading && (!items || items.length === 0)) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Event Kalana"
          title="Kegiatan & Acara Terbaru"
        />
        <Link
          to="/tentang-kami#event-kalana"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Lihat semua event <ArrowRightIcon className="size-4" />
        </Link>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full" />
            ))}
          </div>
        ) : (
          <EventGrid items={items!} />
        )}
      </div>
    </section>
  );
}
