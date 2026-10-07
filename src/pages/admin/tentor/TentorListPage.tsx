import { Link } from "react-router-dom"
import { PencilIcon, PlusIcon, Trash2Icon } from "lucide-react"
import { toast } from "sonner"

import { ConfirmDeleteDialog } from "@/components/admin/ConfirmDeleteDialog"
import { DragHandle, SortableRow } from "@/components/admin/SortableRow"
import { SortableTableBody } from "@/components/admin/SortableTableBody"
import { EmptyState } from "@/components/shared/EmptyState"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAdminKategoriList } from "@/hooks/useKategori"
import { useAdminTentorList } from "@/hooks/useTentor"
import { toOrderPayload } from "@/lib/reorder"
import { KategoriTable } from "@/pages/admin/kategori/KategoriTable"
import { tentorService } from "@/services/tentor.service"
import type { Tentor } from "@/types"

export function AdminTentorListPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Tentor</h1>
        <p className="text-sm text-muted-foreground">
          Kelola daftar tentor dan peran yang bisa dipilih untuk setiap tentor.
        </p>
      </div>

      <Tabs defaultValue="tentor">
        <TabsList>
          <TabsTrigger value="tentor">Daftar Tentor</TabsTrigger>
          <TabsTrigger value="peran">Peran</TabsTrigger>
        </TabsList>
        <TabsContent value="tentor">
          <TentorTable />
        </TabsContent>
        <TabsContent value="peran">
          <KategoriTable tipe="tentor" itemLabel="Peran" autoSlug />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TentorTable() {
  const { data: tentors, loading, error } = useAdminTentorList()
  const { data: roleKategori } = useAdminKategoriList("tentor")
  const roleOptions = [...roleKategori].sort((a, b) => a.order - b.order)

  async function handleDelete(id: string) {
    try {
      await tentorService.remove(id)
      toast.success("Tentor berhasil dihapus")
    } catch {
      toast.error("Gagal menghapus tentor")
    }
  }

  async function handleReorder(reordered: Tentor[]) {
    try {
      await tentorService.updateOrder(toOrderPayload(reordered))
    } catch {
      toast.error("Gagal menyimpan urutan tentor")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm text-muted-foreground">
          Seret untuk mengatur urutan. 5 tentor teratas tampil di halaman Home.
        </p>
        <Button nativeButton={false} render={<Link to="/admin/tentor/baru" />}>
          <PlusIcon /> Tambah Tentor
        </Button>
      </div>

      {loading ? (
        <Skeleton className="h-64 w-full" />
      ) : error ? (
        <EmptyState
          title="Gagal memuat data"
          description="Periksa konfigurasi Firebase (.env) lalu muat ulang halaman."
        />
      ) : tentors.length === 0 ? (
        <EmptyState description="Belum ada tentor. Tambahkan tentor pertama Anda." />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8" />
              <TableHead>Nama</TableHead>
              <TableHead className="hidden lg:table-cell">Jurusan</TableHead>
              <TableHead className="hidden md:table-cell">Universitas / Sekolah</TableHead>
              <TableHead>Peran</TableHead>
              <TableHead className="w-24 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <SortableTableBody items={tentors} onReorder={handleReorder}>
            {tentors.map((tentor) => (
              <SortableRow key={tentor.id} id={tentor.id}>
                <TableCell>
                  <DragHandle />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="size-8">
                      <AvatarImage src={tentor.image} alt={tentor.name} />
                      <AvatarFallback>{tentor.name[0]}</AvatarFallback>
                    </Avatar>
                    {tentor.name}
                  </div>
                </TableCell>
                <TableCell className="hidden max-w-xs truncate text-muted-foreground lg:table-cell">
                  {tentor.jurusan || "-"}
                </TableCell>
                <TableCell className="hidden max-w-xs truncate text-muted-foreground md:table-cell">
                  {tentor.universitas}
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {roleOptions
                      .filter((r) => tentor.roles?.includes(r.value))
                      .map((r) => (
                      <Badge key={r.value} variant="secondary">
                        {r.label}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      nativeButton={false}
                      render={<Link to={`/admin/tentor/${tentor.id}/edit`} />}
                    >
                      <PencilIcon />
                    </Button>
                    <ConfirmDeleteDialog
                      title="Hapus tentor ini?"
                      description={`"${tentor.name}" akan dihapus permanen.`}
                      onConfirm={() => handleDelete(tentor.id)}
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
