import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { KalanaEvent } from "@/types";

function formatEventDate(value?: string) {
  if (!value) return null;
  return new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function EventGrid({ items }: { items: KalanaEvent[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selected = selectedIndex !== null ? items[selectedIndex] : null;
  const hasMultiple = items.length > 1;

  function showPrev() {
    setSelectedIndex((i) =>
      i === null ? null : (i - 1 + items.length) % items.length
    );
  }

  function showNext() {
    setSelectedIndex((i) => (i === null ? null : (i + 1) % items.length));
  }

  useEffect(() => {
    if (selectedIndex === null) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedIndex]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {items.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="group overflow-hidden rounded-xl bg-transparent text-left ring-1 ring-foreground/10 focus-visible:outline-2 focus-visible:outline-ring hover:cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.title}
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

      <Dialog
        open={selected !== null}
        onOpenChange={(open) => !open && setSelectedIndex(null)}
      >
        <DialogContent className="max-w-3xl gap-0 overflow-hidden p-0 sm:max-w-3xl">
          {selected && (
            <div>
              <div className="relative flex items-center justify-center bg-black">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="max-h-[75vh] w-full object-contain"
                />
                {hasMultiple && (
                  <>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-1/2 left-2 -translate-y-1/2 bg-background/80 hover:bg-background"
                      onClick={showPrev}
                    >
                      <ChevronLeftIcon />
                      <span className="sr-only">Sebelumnya</span>
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-1/2 right-2 -translate-y-1/2 bg-background/80 hover:bg-background"
                      onClick={showNext}
                    >
                      <ChevronRightIcon />
                      <span className="sr-only">Berikutnya</span>
                    </Button>
                  </>
                )}
              </div>
              <div className="space-y-1 p-4">
                <p className="font-medium">{selected.title}</p>
                {formatEventDate(selected.eventDate) && (
                  <p className="text-xs text-muted-foreground">
                    {formatEventDate(selected.eventDate)}
                  </p>
                )}
                {selected.description && (
                  <p className="text-sm text-muted-foreground">
                    {selected.description}
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
