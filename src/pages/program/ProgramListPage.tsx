import { Link, useSearchParams } from "react-router-dom"

import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll"
import { EmptyState } from "@/components/shared/EmptyState"
import { ProgramCard } from "@/components/shared/ProgramCard"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useKategori } from "@/hooks/useKategori"
import { useProgramList } from "@/hooks/useProgram"

export function ProgramListPage() {
  const [searchParams] = useSearchParams()
  const label = searchParams.get("label") ?? undefined
  const { getByTipe } = useKategori()
  const { data: programs, loading, error } = useProgramList(label)

  const labelOptions = getByTipe("program").sort((a, b) => a.order - b.order)

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <AnimateOnScroll animation="fadeInUp">
        <SectionHeading eyebrow="Program" title="Program Bimbingan Belajar" />

        <div className="mt-6 flex flex-wrap gap-2">
          <Badge
            variant={!label ? "default" : "outline"}
            render={<Link to="/program" />}
          >
            Semua
          </Badge>
          {labelOptions.map((l) => (
            <Badge
              key={l.value}
              variant={label === l.value ? "default" : "outline"}
              render={<Link to={`/program?label=${l.value}`} />}
            >
              {l.label}
            </Badge>
          ))}
        </div>
      </AnimateOnScroll>

      {loading ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-72 w-full" />
          ))}
        </div>
      ) : error || !programs || programs.length === 0 ? (
        <div className="mt-6">
          <EmptyState description="Program untuk kategori ini belum tersedia. Hubungi kami untuk informasi lebih lanjut." />
        </div>
      ) : (
        <AnimateOnScroll animation="fadeInUp" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program) => (
              <ProgramCard key={program.id} program={program} />
            ))}
          </div>
        </AnimateOnScroll>
      )}
    </div>
  )
}
