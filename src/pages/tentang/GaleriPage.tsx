import { EmptyState } from "@/components/shared/EmptyState"
import { GaleriGrid } from "@/components/shared/GaleriGrid"
import { TentangKamiShell } from "@/components/shared/TentangKamiShell"
import { Skeleton } from "@/components/ui/skeleton"
import { useGaleriList } from "@/hooks/useGaleri"

export function GaleriPage() {
  const { data: galeri, loading } = useGaleriList()

  return (
    <TentangKamiShell title="Galeri Kegiatan">
      {loading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full" />
          ))}
        </div>
      ) : !galeri || galeri.length === 0 ? (
        <EmptyState description="Belum ada foto galeri yang tersedia." />
      ) : (
        <GaleriGrid items={galeri} />
      )}
    </TentangKamiShell>
  )
}
