import { Link } from "react-router-dom"
import { PencilIcon, PlusIcon, Trash2Icon } from "lucide-react"
import { toast } from "sonner"

import { ConfirmDeleteDialog } from "@/components/admin/ConfirmDeleteDialog"
import { DragHandle, SortableRow } from "@/components/admin/SortableRow"
import { SortableTableBody } from "@/components/admin/SortableTableBody"
import { EmptyState } from "@/components/shared/EmptyState"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAdminArtikelList } from "@/hooks/useArtikel"
import { useKategori } from "@/hooks/useKategori"
import { toOrderPayload } from "@/lib/reorder"
import { artikelService } from "@/services/artikel.service"
import type { Artikel } from "@/types"

export function AdminArtikelListPage() {
  const { data: artikels, loading, error } = useAdminArtikelList()
  const { getLabel } = useKategori()

  async function handleDelete(id: string) {
    try {
      await artikelService.remove(id)
      toast.success("Artikel berhasil dihapus")
    } catch {
      toast.error("Gagal menghapus artikel")
    }
  }

  async function handleReorder(reordered: Artikel[]) {
    try {
      await artikelService.updateOrder(toOrderPayload(reordered))
    } catch {
      toast.error("Gagal menyimpan urutan artikel")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Artikel</h1>
        <Button nativeButton={false} render={<Link to="/admin/artikel/baru" />}>
          <PlusIcon /> Tambah Artikel
        </Button>
      </div>

      {loading ? (
        <Skeleton className="h-64 w-full" />
      ) : error ? (
        <EmptyState
          title="Gagal memuat data"
          description="Periksa konfigurasi Firebase (.env) lalu muat ulang halaman."
        />
      ) : artikels.length === 0 ? (
        <EmptyState description="Belum ada artikel. Tambahkan artikel pertama Anda." />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8" />
              <TableHead>Judul</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead className="w-24 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <SortableTableBody items={artikels} onReorder={handleReorder}>
            {artikels.map((artikel) => (
              <SortableRow key={artikel.id} id={artikel.id}>
                <TableCell>
                  <DragHandle />
                </TableCell>
                <TableCell className="font-medium">{artikel.title}</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {getLabel("artikel", artikel.kategori)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      nativeButton={false}
                      render={<Link to={`/admin/artikel/${artikel.id}/edit`} />}
                    >
                      <PencilIcon />
                    </Button>
                    <ConfirmDeleteDialog
                      title="Hapus artikel ini?"
                      description={`"${artikel.title}" akan dihapus permanen.`}
                      onConfirm={() => handleDelete(artikel.id)}
                    >
                      <Trash2Icon />
                    </ConfirmDeleteDialog>
                  </div>
                </TableCell>
              </SortableRow>
            ))}
          </SortableTableBody>
        </Table>
      )}
    </div>
  )
}
