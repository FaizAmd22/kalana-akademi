import { QuoteIcon, StarIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { optimizeImage } from "@/lib/cloudinary"
import { cn } from "@/lib/utils"
import type { Testimoni } from "@/types"

export function TestimoniCard({ testimoni }: { testimoni: Testimoni }) {
  const initials = testimoni.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()

  return (
    <div className="relative flex h-full flex-col rounded-2xl bg-card p-5 text-card-foreground ring-1 ring-foreground/10 transition-shadow hover:shadow-lg hover:shadow-primary/10">
      <QuoteIcon
        aria-hidden
        className="absolute top-4 right-4 size-8 text-primary/10"
      />

      {testimoni.rating ? (
        <div
          className="flex gap-0.5"
          role="img"
          aria-label={`Rating ${testimoni.rating} dari 5`}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className={cn(
                "size-4",
                i < testimoni.rating!
                  ? "fill-amber-400 text-amber-400"
                  : "text-muted-foreground/25"
              )}
            />
          ))}
        </div>
      ) : null}

      <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/80">
        “{testimoni.message}”
      </p>

      <div className="mt-4 flex items-center gap-3 border-t border-border pt-4">
        <Avatar className="size-10 ring-2 ring-accent">
          <AvatarImage
            src={optimizeImage(testimoni.image, 96)}
            // the name is printed right next to the avatar
            alt=""
            loading="lazy"
          />
          <AvatarFallback className="bg-accent font-semibold text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{testimoni.name}</p>
          <p className="truncate text-xs text-muted-foreground">
            {testimoni.role}
          </p>
        </div>
      </div>
    </div>
  )
}
