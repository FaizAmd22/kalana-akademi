import { useMemo, useState } from "react";

import { Lightbox } from "@/components/shared/Lightbox";
import { optimizeImage } from "@/lib/cloudinary";
import { cn } from "@/lib/utils";
import type { Galeri } from "@/types";

// grid cells are at most ~280px wide; 2x for sharp retina thumbnails
const THUMB_WIDTH = 600;

export function GaleriGrid({
  items,
  className,
}: {
  items: Galeri[];
  className?: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const lightboxItems = useMemo(
    () =>
      items.map((item) => ({
        image: item.image,
        alt: item.caption ?? "Galeri Kalana Akademik",
        details: item.caption ? (
          <p className="text-sm text-muted-foreground">{item.caption}</p>
        ) : undefined,
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
            className="group overflow-hidden rounded-xl bg-transparent text-left ring-1 ring-foreground/10 focus-visible:outline-2 focus-visible:outline-ring hover:cursor-pointer"
          >
            <img
              src={optimizeImage(item.image, THUMB_WIDTH)}
              alt={item.caption ?? "Galeri Kalana Akademik"}
              loading="lazy"
              decoding="async"
              className="aspect-square w-full object-cover transition-transform group-hover:scale-105"
            />
            {item.caption && (
              <p className="line-clamp-1 p-2 text-xs text-muted-foreground">
                {item.caption}
              </p>
            )}
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
