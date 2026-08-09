import { Link, useParams } from "react-router-dom"
import { CheckIcon } from "lucide-react"

import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useKategori } from "@/hooks/useKategori"
import { useProgramById } from "@/hooks/useProgram"
import { useSettings } from "@/hooks/useSettings"

export function ProgramDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { getLabel } = useKategori()
  const { data: program, loading } = useProgramById(id)
  const { data: settings } = useSettings()

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 px-4 py-12">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-9 w-2/3" />
        <Skeleton className="aspect-video w-full" />
      </div>
    )
  }

  if (!program) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-lg font-medium">Program tidak ditemukan.</p>
        <Button className="mt-4" nativeButton={false} render={<Link to="/" />}>
          Kembali ke Beranda
        </Button>
      </div>
    )
  }

  const labelText = getLabel("program", program.label)
  const daftarLink = program.daftarLink || settings?.googleFormUrl || "#"

  return (
    <AnimateOnScroll animation="fadeInUp" className="mx-auto max-w-4xl px-4 py-12">
      <Badge variant="secondary">{labelText}</Badge>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">
        {program.title}
      </h1>
      <img
        src={program.images[0]}
        alt={program.title}
        className="mt-6 aspect-video w-full rounded-xl object-cover"
      />
      <p className="mt-6 text-muted-foreground">{program.description}</p>

      <ul className="mt-6 space-y-2">
        {program.points.map((point) => (
          <li key={point} className="flex items-start gap-2 text-sm">
            <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
            {point}
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <Button
          size="lg"
          nativeButton={false}
          render={<a href={daftarLink} target="_blank" rel="noreferrer" />}
        >
          Daftar Sekarang
        </Button>
      </div>
    </AnimateOnScroll>
  )
}
