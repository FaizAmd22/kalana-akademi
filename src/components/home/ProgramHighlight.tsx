import { Link } from "react-router-dom"
import { ArrowRightIcon } from "lucide-react"

import { ProgramCard } from "@/components/shared/ProgramCard"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { Skeleton } from "@/components/ui/skeleton"
import { useProgramList } from "@/hooks/useProgram"
import { cn } from "@/lib/utils"
import type { Program } from "@/types"

const MAX_DISPLAYED = 6

function pickOnePerLabel(programs: Program[]) {
  const seen = new Set<string>()
  const result: Program[] = []
  for (const program of programs) {
    if (seen.has(program.label)) continue
    seen.add(program.label)
    result.push(program)
  }
  return result
}

export function ProgramHighlight() {
  const { data: programs, loading } = useProgramList()
  const highlighted = programs
    ? pickOnePerLabel(programs).slice(0, MAX_DISPLAYED)
    : []
  const twoColsOnly = highlighted.length === 4

  if (!loading && highlighted.length === 0) return null

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading
          eyebrow="Program Unggulan"
          title="Pilih Program Sesuai Jenjangmu"
          description="Dari SD hingga persiapan UTBK dan olimpiade sains."
        />
        <Link
          to="/program"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Lihat semua program <ArrowRightIcon className="size-4" />
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="w-full sm:basis-[calc((100%-1rem)/2)] lg:basis-[calc((100%-2rem)/3)]"
              >
                <Skeleton className="h-72 w-full" />
              </div>
            ))
          : highlighted.map((program) => (
              <div
                key={program.id}
                className={cn(
                  "w-full sm:basis-[calc((100%-1rem)/2)]",
                  twoColsOnly
                    ? "lg:basis-[calc((100%-1rem)/2)]"
                    : "lg:basis-[calc((100%-2rem)/3)]"
                )}
              >
                <ProgramCard program={program} />
              </div>
            ))}
      </div>
    </section>
  )
}
