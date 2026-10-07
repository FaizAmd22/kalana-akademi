import { EmptyState } from "@/components/shared/EmptyState"
import { FaqAccordion } from "@/components/shared/FaqAccordion"
import { TentangKamiShell } from "@/components/shared/TentangKamiShell"
import { Skeleton } from "@/components/ui/skeleton"
import { useFaqList } from "@/hooks/useFaq"

export function FaqPage() {
  const { data: faqs, loading } = useFaqList()

  return (
    <TentangKamiShell title="Pertanyaan yang Sering Diajukan" width="narrow">
      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full" />
          ))}
        </div>
      ) : !faqs || faqs.length === 0 ? (
        <EmptyState description="Belum ada pertanyaan yang tersedia." />
      ) : (
        <FaqAccordion faqs={faqs} />
      )}
    </TentangKamiShell>
  )
}
