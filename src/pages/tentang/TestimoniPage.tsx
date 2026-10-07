import { EmptyState } from "@/components/shared/EmptyState"
import { TentangKamiShell } from "@/components/shared/TentangKamiShell"
import { TestimoniCard } from "@/components/shared/TestimoniCard"
import { Skeleton } from "@/components/ui/skeleton"
import { useTestimoniList } from "@/hooks/useTestimoni"

export function TestimoniPage() {
  const { data: testimonis, loading } = useTestimoniList()

  return (
    <TentangKamiShell title="Testimoni Siswa & Orang Tua">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))
        ) : !testimonis || testimonis.length === 0 ? (
          <div className="sm:col-span-2 lg:col-span-3">
            <EmptyState description="Belum ada testimoni yang tersedia." />
          </div>
        ) : (
          testimonis.map((testimoni) => (
            <TestimoniCard key={testimoni.id} testimoni={testimoni} />
          ))
        )}
      </div>
    </TentangKamiShell>
  )
}
