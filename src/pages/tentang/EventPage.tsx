import { EmptyState } from "@/components/shared/EmptyState"
import { EventGrid } from "@/components/shared/EventGrid"
import { TentangKamiShell } from "@/components/shared/TentangKamiShell"
import { Skeleton } from "@/components/ui/skeleton"
import { useEventList } from "@/hooks/useEvent"

export function EventPage() {
  const { data: events, loading } = useEventList()

  return (
    <TentangKamiShell title="Event Kalana">
      {loading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="aspect-square w-full" />
          ))}
        </div>
      ) : !events || events.length === 0 ? (
        <EmptyState description="Belum ada event yang tersedia." />
      ) : (
        <EventGrid items={events} />
      )}
    </TentangKamiShell>
  )
}
