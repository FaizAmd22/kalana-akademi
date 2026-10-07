import { Link } from "react-router-dom"
import { ArrowRightIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useKategori } from "@/hooks/useKategori"
import { responsiveImage } from "@/lib/cloudinary"
import { toPlainText } from "@/lib/rich-text"
import type { Artikel } from "@/types"

export function ArtikelCard({ artikel }: { artikel: Artikel }) {
  const { getLabel } = useKategori()
  const kategoriText = getLabel("artikel", artikel.kategori)

  return (
    <Link to={`/artikel/${artikel.id}`} className="group block h-full">
      <Card className="h-full pt-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-primary/10 group-hover:ring-primary/20">
        <div className="relative overflow-hidden">
          <img
            {...responsiveImage(
              artikel.image,
              [400, 800],
              "(min-width: 1024px) 280px, (min-width: 640px) 50vw, 80vw"
            )}
            loading="lazy"
            decoding="async"
            alt={artikel.title}
            className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <Badge
            variant="secondary"
            className="absolute top-3 left-3 bg-background/90 shadow-sm backdrop-blur"
          >
            {kategoriText}
          </Badge>
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-2 transition-colors group-hover:text-primary">
            {artikel.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col">
          <CardDescription className="line-clamp-3">
            {toPlainText(artikel.description)}
          </CardDescription>
          <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium text-primary">
            Baca selengkapnya
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
