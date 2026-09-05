import { Link } from "react-router-dom"
import { PencilIcon, PlusIcon, Trash2Icon } from "lucide-react"
import { toast } from "sonner"

import { ConfirmDeleteDialog } from "@/components/admin/ConfirmDeleteDialog"
import { EmptyState } from "@/components/shared/EmptyState"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useAdminEventList } from "@/hooks/useEvent"
import { eventService } from "@/services/event.service"

function formatEventDate(value?: string) {
  if (!value) return null
  return new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function AdminEventListPage() {
  const { data: items, loading, error } = useAdminEventList()

  async function handleDelete(id: string) {
    try {
      await eventService.remove(id)
      toast.success("Event berhasil dihapus")
    } catch {
      toast.error("Gagal menghapus event")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Event Kalana</h1>
        <Button nativeButton={false} render={<Link to="/admin/event/baru" />}>
          <PlusIcon /> Tambah Event
        </Button>
      </div>

      {loading ? (
        <Skeleton className="h-64 w-full" />
      ) : error ? (
        <EmptyState
          title="Gagal memuat data"
          description="Periksa konfigurasi Firebase (.env) lalu muat ulang halaman."
        />
      ) : items.length === 0 ? (
        <EmptyState description="Belum ada event. Tambahkan event pertama Anda." />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="space-y-2">
              <img
                src={item.image}
                alt={item.title}
                className="aspect-square w-full rounded-lg object-cover ring-1 ring-foreground/10"
              />
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium">{item.title}</p>
                  {formatEventDate(item.eventDate) && (
                    <p className="text-[11px] text-muted-foreground">
                      {formatEventDate(item.eventDate)}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    nativeButton={false}
                    render={<Link to={`/admin/event/${item.id}/edit`} />}
                  >
                    <PencilIcon />
                  </Button>
                  <ConfirmDeleteDialog
                    title="Hapus event ini?"
                    description={`"${item.title}" akan dihapus permanen.`}
                    onConfirm={() => handleDelete(item.id)}
                  >
                    <Trash2Icon />
                  </ConfirmDeleteDialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
