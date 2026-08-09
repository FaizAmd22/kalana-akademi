import { StarIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Testimoni } from "@/types"

export function TestimoniCard({ testimoni }: { testimoni: Testimoni }) {
  const initials = testimoni.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")

  return (
    <Card className="h-full">
      <CardContent className="flex h-full flex-col gap-3">
        {testimoni.rating && (
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon
                key={i}
                className={cn(
                  "size-4",
                  i < testimoni.rating!
                    ? "fill-primary text-primary"
                    : "text-muted-foreground/30"
                )}
              />
            ))}
          </div>
        )}
        <p className="flex-1 text-sm text-muted-foreground">
          "{testimoni.message}"
        </p>
        <div className="flex items-center gap-2.5">
          <Avatar className="size-9">
            <AvatarImage src={testimoni.image} alt={testimoni.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{testimoni.name}</p>
            <p className="text-xs text-muted-foreground">{testimoni.role}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
