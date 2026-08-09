import { Link } from "react-router-dom"
import { PencilIcon, PlusIcon, Trash2Icon } from "lucide-react"
import { toast } from "sonner"

import { ConfirmDeleteDialog } from "@/components/admin/ConfirmDeleteDialog"
import { EmptyState } from "@/components/shared/EmptyState"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAdminTestimoniList } from "@/hooks/useTestimoni"
import { testimoniService } from "@/services/testimoni.service"

export function AdminTestimoniListPage() {
  const { data: testimonis, loading, error } = useAdminTestimoniList()

  async function handleDelete(id: string) {
    try {
      await testimoniService.remove(id)
      toast.success("Testimoni berhasil dihapus")
    } catch {
      toast.error("Gagal menghapus testimoni")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Testimoni</h1>
        <Button
          nativeButton={false}
          render={<Link to="/admin/testimoni/baru" />}
        >
          <PlusIcon /> Tambah Testimoni
        </Button>
      </div>

      {loading ? (
        <Skeleton className="h-64 w-full" />
      ) : error ? (
        <EmptyState
          title="Gagal memuat data"
          description="Periksa konfigurasi Firebase (.env) lalu muat ulang halaman."
        />
      ) : testimonis.length === 0 ? (
        <EmptyState description="Belum ada testimoni. Tambahkan testimoni pertama Anda." />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Peran</TableHead>
              <TableHead className="w-24 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonis.map((testimoni) => (
              <TableRow key={testimoni.id}>
                <TableCell className="font-medium">{testimoni.name}</TableCell>
                <TableCell>{testimoni.role}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      nativeButton={false}
                      render={
                        <Link to={`/admin/testimoni/${testimoni.id}/edit`} />
                      }
                    >
                      <PencilIcon />
                    </Button>
                    <ConfirmDeleteDialog
                      title="Hapus testimoni ini?"
                      description={`Testimoni dari "${testimoni.name}" akan dihapus permanen.`}
                      onConfirm={() => handleDelete(testimoni.id)}
                    >
                      <Trash2Icon />
                    </ConfirmDeleteDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
}
