import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { PencilIcon, PlusIcon, SparklesIcon, Trash2Icon } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { ConfirmDeleteDialog } from "@/components/admin/ConfirmDeleteDialog"
import { DragHandle, SortableRow } from "@/components/admin/SortableRow"
import { SortableTableBody } from "@/components/admin/SortableTableBody"
import { EmptyState } from "@/components/shared/EmptyState"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import { Table, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useAdminKategoriList } from "@/hooks/useKategori"
import { SEED_KATEGORI } from "@/lib/constants"
import { toOrderPayload } from "@/lib/reorder"
import { slugify } from "@/lib/slugify"
import { kategoriService } from "@/services/kategori.service"
import type { Kategori, KategoriTipe } from "@/types"

const kategoriSchema = z.object({
  label: z.string().min(1, "Label wajib diisi"),
  value: z.string().min(1, "Slug wajib diisi"),
})

type KategoriFormValues = z.infer<typeof kategoriSchema>

export function KategoriTable({ tipe }: { tipe: KategoriTipe }) {
  const { data: items, loading, error } = useAdminKategoriList(tipe)
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Kategori | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [seeding, setSeeding] = useState(false)

  const sorted = [...items].sort((a, b) => a.order - b.order)

  const form = useForm<KategoriFormValues>({
    resolver: zodResolver(kategoriSchema),
    defaultValues: { label: "", value: "" },
  })

  useEffect(() => {
    form.reset({
      label: editing?.label ?? "",
      value: editing?.value ?? "",
    })
  }, [editing, form])

  function openCreate() {
    setEditing(null)
    setOpen(true)
  }

  function openEdit(item: Kategori) {
    setEditing(item)
    setOpen(true)
  }

  async function onSubmit(values: KategoriFormValues) {
    setSubmitting(true)
    try {
      if (editing) {
        await kategoriService.update(editing.id, {
          label: values.label,
          value: slugify(values.value),
        })
        toast.success("Kategori berhasil diperbarui")
      } else {
        // append to the end; exact position is fixed by drag-and-drop in the list
        await kategoriService.create({
          tipe,
          label: values.label,
          value: slugify(values.value),
          order: Date.now(),
        })
        toast.success("Kategori berhasil ditambahkan")
      }
      setOpen(false)
    } catch {
      toast.error("Gagal menyimpan kategori")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      await kategoriService.remove(id)
      toast.success("Kategori berhasil dihapus")
    } catch {
      toast.error("Gagal menghapus kategori")
    }
  }

  async function handleSeed() {
    setSeeding(true)
    try {
      const defaults = SEED_KATEGORI.filter((k) => k.tipe === tipe)
      await Promise.all(defaults.map((k) => kategoriService.create(k)))
      toast.success("Kategori bawaan berhasil dimuat")
    } catch {
      toast.error("Gagal memuat kategori bawaan")
    } finally {
      setSeeding(false)
    }
  }

  async function handleReorder(reordered: Kategori[]) {
    try {
      await kategoriService.updateOrder(toOrderPayload(reordered))
    } catch {
      toast.error("Gagal menyimpan urutan kategori")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Button onClick={openCreate}>
          <PlusIcon /> Tambah Kategori
        </Button>
      </div>

      {loading ? (
        <Skeleton className="h-48 w-full" />
      ) : error ? (
        <EmptyState
          title="Gagal memuat data"
          description="Periksa konfigurasi Firebase (.env) lalu muat ulang halaman."
        />
      ) : items.length === 0 ? (
        <div className="space-y-3">
          <EmptyState description="Belum ada kategori. Tambahkan kategori pertama, atau muat kategori bawaan." />
          <Button
            variant="outline"
            className="w-full"
            disabled={seeding}
            onClick={handleSeed}
          >
            <SparklesIcon /> {seeding ? "Memuat..." : "Muat Kategori Bawaan"}
          </Button>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8" />
              <TableHead>Label</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead className="w-24 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <SortableTableBody items={sorted} onReorder={handleReorder}>
            {sorted.map((item) => (
              <SortableRow key={item.id} id={item.id}>
                <TableCell>
                  <DragHandle />
                </TableCell>
                <TableCell className="font-medium">{item.label}</TableCell>
                <TableCell className="text-muted-foreground">
                  {item.value}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => openEdit(item)}
                    >
                      <PencilIcon />
                    </Button>
                    <ConfirmDeleteDialog
                      title="Hapus kategori ini?"
                      description={`"${item.label}" akan dihapus permanen. Program/Artikel/Bank Soal yang memakai kategori ini tidak akan terhapus, tapi tidak lagi punya nama kategori yang cocok.`}
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editing ? "Edit Kategori" : "Tambah Kategori"}
            </DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        onChange={(e) => {
                          field.onChange(e)
                          if (!editing) {
                            form.setValue("value", slugify(e.target.value))
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug (dipakai di URL)</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? "Menyimpan..." : "Simpan"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
