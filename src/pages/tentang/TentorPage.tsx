import { EmptyState } from "@/components/shared/EmptyState"
import { TentangKamiShell } from "@/components/shared/TentangKamiShell"
import { TentorDirectory } from "@/components/shared/TentorDirectory"
import { Skeleton } from "@/components/ui/skeleton"
import { useTentorList } from "@/hooks/useTentor"

export function TentorPage() {
  const { data: tentors, loading } = useTentorList()

  return (
    <TentangKamiShell
      slug="tentor"
      title="Tentor Kalana"
      description="Kenali tentor-tentor yang akan mendampingi belajarmu."
    >
      {loading ? (
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[3/4] w-full" />
          ))}
        </div>
      ) : !tentors || tentors.length === 0 ? (
        <EmptyState description="Belum ada data tentor yang tersedia." />
      ) : (
        <TentorDirectory tentors={tentors} />
      )}
    </TentangKamiShell>
  )
}
