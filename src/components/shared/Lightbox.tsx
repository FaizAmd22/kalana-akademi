import { useEffect, useState, type ReactNode } from "react"
import { ChevronLeftIcon, ChevronRightIcon, Loader2Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { optimizeImage } from "@/lib/cloudinary"
import { cn } from "@/lib/utils"

const LIGHTBOX_WIDTH = 1600

export interface LightboxItem {
  image: string
  alt: string
  /** shown under the image */
  details?: ReactNode
}

/**
 * Full-size image viewer with prev/next, keyboard arrows, a loading
 * indicator and neighbour preloading so stepping through feels instant.
 */
export function Lightbox({
  items,
  index,
  onIndexChange,
  onClose,
}: {
  items: LightboxItem[]
  index: number | null
  onIndexChange: (index: number) => void
  onClose: () => void
}) {
  const current = index !== null ? items[index] : null
  const hasMultiple = items.length > 1
  const src = current ? optimizeImage(current.image, LIGHTBOX_WIDTH) : undefined
  // the src that has finished loading; anything else shows the spinner
  const [loadedSrc, setLoadedSrc] = useState<string>()
  const loading = !!src && loadedSrc !== src

  const step = (delta: number) => {
    if (index === null) return
    onIndexChange((index + delta + items.length) % items.length)
  }

  useEffect(() => {
    if (index === null) return

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") step(-1)
      if (e.key === "ArrowRight") step(1)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, items.length])

  // warm the cache for the previous/next image
  useEffect(() => {
    if (index === null || !hasMultiple) return
    for (const delta of [1, -1]) {
      const neighbour = items[(index + delta + items.length) % items.length]
      const url = optimizeImage(neighbour.image, LIGHTBOX_WIDTH)
      if (url) new Image().src = url
    }
  }, [index, items, hasMultiple])

  return (
    <Dialog open={current !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl gap-0 overflow-hidden p-0 sm:max-w-3xl">
        {current && (
          <div>
            <div className="relative flex min-h-64 items-center justify-center bg-black">
              <img
                // new element per image so the previous one never lingers
                key={src}
                src={src}
                alt={current.alt}
                onLoad={() => setLoadedSrc(src)}
                onError={() => setLoadedSrc(src)}
                className={cn(
                  "max-h-[75vh] w-full object-contain transition-opacity duration-300",
                  loading ? "opacity-0" : "opacity-100"
                )}
              />
              {loading && (
                <Loader2Icon className="absolute size-8 animate-spin text-white/70" />
              )}

              {hasMultiple && (
                <>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 left-2 z-10 -translate-y-1/2 bg-background/80 hover:bg-background"
                    onClick={() => step(-1)}
                  >
                    <ChevronLeftIcon />
                    <span className="sr-only">Sebelumnya</span>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-background/80 hover:bg-background"
                    onClick={() => step(1)}
                  >
                    <ChevronRightIcon />
                    <span className="sr-only">Berikutnya</span>
                  </Button>
                  <span className="absolute bottom-2 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/60 px-2.5 py-0.5 text-xs text-white">
                    {(index ?? 0) + 1} / {items.length}
                  </span>
                </>
              )}
            </div>
            {current.details && <div className="p-4">{current.details}</div>}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
