import { Link } from "react-router-dom"
import { ArrowRightIcon, CheckIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useKategori } from "@/hooks/useKategori"
import { optimizeImage } from "@/lib/cloudinary"
import type { Program } from "@/types"

export function ProgramCard({ program }: { program: Program }) {
  const { getLabel } = useKategori()
  const labelText = getLabel("program", program.label)

  return (
    <Link to={`/program/${program.id}`} className="group block h-full">
      <Card className="h-full pt-0 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-primary/10 group-hover:ring-primary/20">
        <div className="relative overflow-hidden">
          <img
            src={optimizeImage(program.images[0], 800)}
            loading="lazy"
            decoding="async"
            alt={program.title}
            className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <Badge className="absolute top-3 left-3 shadow-sm">{labelText}</Badge>
        </div>
        <CardHeader>
          <CardTitle className="text-base transition-colors group-hover:text-primary">
            {program.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {program.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col">
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            {program.points.slice(0, 2).map((point) => (
              <li key={point} className="flex gap-2">
                <CheckIcon className="mt-0.5 size-4 shrink-0 text-sky-500" />
                {point}
              </li>
            ))}
          </ul>
          <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium text-primary">
            Lihat detail
            <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
