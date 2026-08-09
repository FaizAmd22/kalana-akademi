import { Link } from "react-router-dom"
import { ArrowRightIcon } from "lucide-react"

import { GaleriGrid } from "@/components/shared/GaleriGrid"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { Skeleton } from "@/components/ui/skeleton"
import { useGaleriLatest } from "@/hooks/useGaleri"

export function GaleriHighlight() {
  const { data: items, loading } = useGaleriLatest(8)

  if (!loading && (!items || items.length === 0)) return null

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading eyebrow="Galeri" title="Momen di Kalana Akademik" />
        <Link
          to="/tentang-kami#galeri"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Lihat semua galeri <ArrowRightIcon className="size-4" />
        </Link>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full" />
            ))}
          </div>
        ) : (
          <GaleriGrid items={items!} />
        )}
      </div>
    </section>
  )
}
