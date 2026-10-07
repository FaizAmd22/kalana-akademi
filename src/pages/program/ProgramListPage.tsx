import { Link, useSearchParams } from "react-router-dom"

import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll"
import { EmptyState } from "@/components/shared/EmptyState"
import { ProgramCard } from "@/components/shared/ProgramCard"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { StickyFilterBar } from "@/components/shared/StickyFilterBar"
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
      <AnimateOnScroll animation="fadeInUp" className="mb-3">
        <SectionHeading eyebrow="Program" title="Program Bimbingan Belajar" />
      </AnimateOnScroll>

      <StickyFilterBar>
        {/* single scrollable row on mobile keeps the sticky bar short */}
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
          <Badge
            className="shrink-0"
            variant={!label ? "default" : "outline"}
            render={<Link to="/program" />}
          >
            Semua
          </Badge>
          {labelOptions.map((l) => (
            <Badge
              key={l.value}
              className="shrink-0"
              variant={label === l.value ? "default" : "outline"}
              render={<Link to={`/program?label=${l.value}`} />}
            >
              {l.label}
            </Badge>
          ))}
        </div>
      </StickyFilterBar>

      {loading ? (
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-72 w-full" />
          ))}
        </div>
      ) : error || !programs || programs.length === 0 ? (
        <div className="mt-3">
          <EmptyState description="Program untuk kategori ini belum tersedia. Hubungi kami untuk informasi lebih lanjut." />
        </div>
      ) : (
        <AnimateOnScroll animation="fadeInUp" className="mt-3">
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
