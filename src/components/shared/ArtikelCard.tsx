import { Link } from "react-router-dom"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useKategori } from "@/hooks/useKategori"
import type { Artikel } from "@/types"

export function ArtikelCard({ artikel }: { artikel: Artikel }) {
  const { getLabel } = useKategori()
  const kategoriText = getLabel("artikel", artikel.kategori)

  return (
    <Link to={`/artikel/${artikel.id}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <img
          src={artikel.image}
          alt={artikel.title}
          className="aspect-video w-full object-cover"
        />
        <CardHeader>
          <Badge variant="outline" className="mb-1 w-fit">
            {kategoriText}
          </Badge>
          <CardTitle className="line-clamp-2">{artikel.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-3">
            {artikel.description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  )
}
