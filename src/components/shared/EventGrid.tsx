import { useMemo, useState } from "react";

import { Lightbox } from "@/components/shared/Lightbox";
import { responsiveImage } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";
import type { KalanaEvent } from "@/types";

// grid cells are at most ~280px wide; 2x for sharp retina thumbnails
const THUMB_WIDTH = 600;
// rendered width per breakpoint (2/3/4 columns inside the 6xl container)
const THUMB_SIZES =
  "(min-width: 1152px) 280px, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw";

function formatEventDate(value?: string) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function EventGrid({
  items,
  className,
}: {
  items: KalanaEvent[];
  className?: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const lightboxItems = useMemo(
    () =>
      items.map((item) => ({
        image: item.image,
        alt: item.title,
        details: (
          <div className="space-y-1">
            <p className="font-medium">{item.title}</p>
            {formatEventDate(item.eventDate) && (
              <p className="text-xs text-muted-foreground">
                {formatEventDate(item.eventDate)}
              </p>
            )}
            {item.description && (
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            )}
          </div>
        ),
      })),
    [items]
  );

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4",
          className
        )}
      >
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="group overflow-hidden rounded-xl bg-card text-left text-card-foreground ring-1 ring-foreground/10 focus-visible:outline-2 focus-visible:outline-ring hover:cursor-pointer"
          >
            <img
              {...responsiveImage(item.image, [300, THUMB_WIDTH], THUMB_SIZES)}
              alt={item.title}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="p-2">
              <p className="line-clamp-1 text-xs font-medium">{item.title}</p>
              {formatEventDate(item.eventDate) && (
                <p className="text-[11px] text-muted-foreground">
                  {formatEventDate(item.eventDate)}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        index={selectedIndex}
        onIndexChange={setSelectedIndex}
        onClose={() => setSelectedIndex(null)}
        items={lightboxItems}
      />
    </>
  );
}
