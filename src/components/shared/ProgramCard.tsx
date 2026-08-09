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
import type { Program } from "@/types"

export function ProgramCard({ program }: { program: Program }) {
  const { getLabel } = useKategori()
  const labelText = getLabel("program", program.label)

  return (
    <Link to={`/program/${program.id}`} className="block h-full">
      <Card className="h-full transition-shadow hover:shadow-md">
        <img
          src={program.images[0]}
          alt={program.title}
          className="aspect-video w-full object-cover"
        />
        <CardHeader>
          <Badge variant="secondary" className="mb-1 w-fit">
            {labelText}
          </Badge>
          <CardTitle>{program.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {program.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-1 text-sm text-muted-foreground">
            {program.points.slice(0, 2).map((point) => (
              <li key={point} className="flex gap-1.5">
                <span className="text-primary">•</span>
                {point}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </Link>
  )
}
