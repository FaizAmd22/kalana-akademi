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
import { useKategori } from "@/hooks/useKategori"
import { useAdminProgramList } from "@/hooks/useProgram"
import { toOrderPayload } from "@/lib/reorder"
import { programService } from "@/services/program.service"
import type { Program } from "@/types"

export function AdminProgramListPage() {
  const { data: programs, loading, error } = useAdminProgramList()
  const { getLabel } = useKategori()

  async function handleDelete(id: string) {
    try {
      await programService.remove(id)
      toast.success("Program berhasil dihapus")
    } catch {
      toast.error("Gagal menghapus program")
    }
  }

  async function handleReorder(reordered: Program[]) {
    try {
      await programService.updateOrder(toOrderPayload(reordered))
    } catch {
      toast.error("Gagal menyimpan urutan program")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">Program</h1>
        <Button nativeButton={false} render={<Link to="/admin/program/baru" />}>
          <PlusIcon /> Tambah Program
        </Button>
      </div>

      {loading ? (
        <Skeleton className="h-64 w-full" />
      ) : error ? (
        <EmptyState
          title="Gagal memuat data"
          description="Periksa konfigurasi Firebase (.env) lalu muat ulang halaman."
        />
      ) : programs.length === 0 ? (
        <EmptyState description="Belum ada program. Tambahkan program pertama Anda." />
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
          <SortableTableBody items={programs} onReorder={handleReorder}>
            {programs.map((program) => (
              <SortableRow key={program.id} id={program.id}>
                <TableCell>
                  <DragHandle />
                </TableCell>
                <TableCell className="font-medium">{program.title}</TableCell>
                <TableCell>
                  <Badge variant="secondary">
                    {getLabel("program", program.label)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      nativeButton={false}
                      render={<Link to={`/admin/program/${program.id}/edit`} />}
                    >
                      <PencilIcon />
                    </Button>
                    <ConfirmDeleteDialog
                      title="Hapus program ini?"
                      description={`"${program.title}" akan dihapus permanen.`}
                      onConfirm={() => handleDelete(program.id)}
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
