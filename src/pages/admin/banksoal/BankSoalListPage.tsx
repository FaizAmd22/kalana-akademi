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
import { useAdminBankSoalList } from "@/hooks/useBankSoal"
import { useKategori } from "@/hooks/useKategori"
import { toOrderPayload } from "@/lib/reorder"
import { banksoalService } from "@/services/banksoal.service"
import type { BankSoal } from "@/types"

export function AdminBankSoalListPage() {
  const { data: items, loading, error } = useAdminBankSoalList()
  const { getLabel } = useKategori()

  async function handleDelete(id: string) {
    try {
      await banksoalService.remove(id)
      toast.success("Bank soal berhasil dihapus")
    } catch {
      toast.error("Gagal menghapus bank soal")
    }
  }

  async function handleReorder(reordered: BankSoal[]) {
    try {
      await banksoalService.updateOrder(toOrderPayload(reordered))
    } catch {
      toast.error("Gagal menyimpan urutan bank soal")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Bank Soal</h1>
        <Button
          nativeButton={false}
          render={<Link to="/admin/bank-soal/baru" />}
        >
          <PlusIcon /> Tambah Bank Soal
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
        <EmptyState description="Belum ada bank soal. Tambahkan bank soal pertama Anda." />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8" />
              <TableHead>Judul</TableHead>
              <TableHead>Label</TableHead>
              <TableHead className="w-24 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <SortableTableBody items={items} onReorder={handleReorder}>
            {items.map((item) => (
              <SortableRow key={item.id} id={item.id}>
                <TableCell>
                  <DragHandle />
                </TableCell>
                <TableCell className="font-medium">{item.title}</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {getLabel("banksoal", item.label)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      nativeButton={false}
                      render={<Link to={`/admin/bank-soal/${item.id}/edit`} />}
                    >
                      <PencilIcon />
                    </Button>
                    <ConfirmDeleteDialog
                      title="Hapus bank soal ini?"
                      description={`"${item.title}" akan dihapus permanen.`}
                      onConfirm={() => handleDelete(item.id)}
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
