import { Link, useSearchParams } from "react-router-dom"

import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll"
import { BankSoalCard } from "@/components/shared/BankSoalCard"
import { EmptyState } from "@/components/shared/EmptyState"
import { SectionHeading } from "@/components/shared/SectionHeading"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useBankSoalList } from "@/hooks/useBankSoal"
import { useKategori } from "@/hooks/useKategori"

export function BankSoalListPage() {
  const [searchParams] = useSearchParams()
  const label = searchParams.get("label") ?? undefined
  const { getByTipe } = useKategori()
  const { data: items, loading, error } = useBankSoalList(label)

  const labelOptions = getByTipe("banksoal").sort((a, b) => a.order - b.order)

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <AnimateOnScroll animation="fadeInUp">
        <SectionHeading
          eyebrow="Bank Soal"
          title="Bank Soal Latihan"
          description="Latihan soal lengkap dengan pembahasan untuk persiapan ujian."
        />

        <div className="mt-6 flex flex-wrap gap-2">
          <Badge
            variant={!label ? "default" : "outline"}
            render={<Link to="/bank-soal" />}
          >
            Semua
          </Badge>
          {labelOptions.map((l) => (
            <Badge
              key={l.value}
              variant={label === l.value ? "default" : "outline"}
              render={<Link to={`/bank-soal?label=${l.value}`} />}
            >
              {l.label}
            </Badge>
          ))}
        </div>
      </AnimateOnScroll>

      {loading ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full" />
          ))}
        </div>
      ) : error || !items || items.length === 0 ? (
        <div className="mt-6">
          <EmptyState description="Bank soal untuk kategori ini belum tersedia." />
        </div>
      ) : (
        <AnimateOnScroll animation="fadeInUp" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <BankSoalCard key={item.id} bankSoal={item} />
            ))}
          </div>
        </AnimateOnScroll>
      )}
    </div>
  )
}
