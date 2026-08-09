import { Link } from "react-router-dom"
import { PencilIcon, PlusIcon, Trash2Icon } from "lucide-react"
import { toast } from "sonner"

import { ConfirmDeleteDialog } from "@/components/admin/ConfirmDeleteDialog"
import { EmptyState } from "@/components/shared/EmptyState"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useAdminGaleriList } from "@/hooks/useGaleri"
import { galeriService } from "@/services/galeri.service"

export function AdminGaleriListPage() {
  const { data: items, loading, error } = useAdminGaleriList()

  async function handleDelete(id: string) {
    try {
      await galeriService.remove(id)
      toast.success("Foto berhasil dihapus")
    } catch {
      toast.error("Gagal menghapus foto")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Galeri</h1>
        <Button nativeButton={false} render={<Link to="/admin/galeri/baru" />}>
          <PlusIcon /> Tambah Foto
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
        <EmptyState description="Belum ada foto. Tambahkan foto pertama Anda." />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="space-y-2">
              <img
                src={item.image}
                alt={item.caption ?? "Galeri"}
                className="aspect-square w-full rounded-lg object-cover ring-1 ring-foreground/10"
              />
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-xs text-muted-foreground">
                  {item.caption ?? "-"}
                </p>
                <div className="flex shrink-0 gap-1">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    nativeButton={false}
                    render={<Link to={`/admin/galeri/${item.id}/edit`} />}
                  >
                    <PencilIcon />
                  </Button>
                  <ConfirmDeleteDialog
                    title="Hapus foto ini?"
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
