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
  // required only when the slug field is shown — checked in onSubmit
  value: z.string(),
})

type KategoriFormValues = z.infer<typeof kategoriSchema>

export function KategoriTable({
  tipe,
  itemLabel = "Kategori",
  autoSlug = false,
}: {
  tipe: KategoriTipe
  itemLabel?: string
  // hide the slug field and derive it from the label. The slug is fixed at
  // creation so renaming a label never breaks data that references it.
  autoSlug?: boolean
}) {
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

  function uniqueSlug(base: string) {
    const taken = new Set(items.map((item) => item.value))
    let slug = base
    for (let i = 2; taken.has(slug); i++) slug = `${base}-${i}`
    return slug
  }

  async function onSubmit(values: KategoriFormValues) {
    const others = items.filter((item) => item.id !== editing?.id)
    const normalize = (s: string) => s.trim().replace(/\s+/g, " ").toLowerCase()
    if (others.some((item) => normalize(item.label) === normalize(values.label))) {
      form.setError("label", {
        message: `${itemLabel} "${values.label.trim()}" sudah ada`,
      })
      return
    }

    let value: string
    if (!autoSlug) {
      value = slugify(values.value)
    } else if (editing) {
      value = editing.value
    } else {
      value = uniqueSlug(slugify(values.label) || tipe)
    }
    if (!value) {
      form.setError("value", { message: "Slug wajib diisi" })
      return
    }
    if (!autoSlug && others.some((item) => item.value === value)) {
      form.setError("value", { message: `Slug "${value}" sudah dipakai` })
      return
    }

    setSubmitting(true)
    try {
      if (editing) {
        await kategoriService.update(editing.id, {
          label: values.label.trim(),
          value,
        })
        toast.success(`${itemLabel} berhasil diperbarui`)
      } else {
        // append to the end; exact position is fixed by drag-and-drop in the list
        await kategoriService.create({
          tipe,
          label: values.label.trim(),
          value,
          order: Date.now(),
        })
        toast.success(`${itemLabel} berhasil ditambahkan`)
      }
      setOpen(false)
    } catch {
      toast.error(`Gagal menyimpan ${itemLabel.toLowerCase()}`)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      await kategoriService.remove(id)
      toast.success(`${itemLabel} berhasil dihapus`)
    } catch {
      toast.error(`Gagal menghapus ${itemLabel.toLowerCase()}`)
    }
  }

  async function handleSeed() {
    setSeeding(true)
    try {
      const defaults = SEED_KATEGORI.filter((k) => k.tipe === tipe)
      await Promise.all(defaults.map((k) => kategoriService.create(k)))
      toast.success(`${itemLabel} bawaan berhasil dimuat`)
    } catch {
      toast.error(`Gagal memuat ${itemLabel.toLowerCase()} bawaan`)
    } finally {
      setSeeding(false)
    }
  }

  async function handleReorder(reordered: Kategori[]) {
    try {
      await kategoriService.updateOrder(toOrderPayload(reordered))
    } catch {
      toast.error(`Gagal menyimpan urutan ${itemLabel.toLowerCase()}`)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Button onClick={openCreate}>
          <PlusIcon /> Tambah {itemLabel}
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
          <EmptyState
            description={`Belum ada ${itemLabel.toLowerCase()}. Tambahkan ${itemLabel.toLowerCase()} pertama, atau muat ${itemLabel.toLowerCase()} bawaan.`}
          />
          <Button
            variant="outline"
            className="w-full"
            disabled={seeding}
            onClick={handleSeed}
          >
            <SparklesIcon /> {seeding ? "Memuat..." : `Muat ${itemLabel} Bawaan`}
          </Button>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8" />
              <TableHead>Label</TableHead>
              {!autoSlug && <TableHead>Slug</TableHead>}
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
                {!autoSlug && (
                  <TableCell className="text-muted-foreground">
                    {item.value}
                  </TableCell>
                )}
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
                      title={`Hapus ${itemLabel.toLowerCase()} ini?`}
                      description={`"${item.label}" akan dihapus permanen. Data yang memakai ${itemLabel.toLowerCase()} ini tidak akan terhapus, tapi tidak lagi punya nama ${itemLabel.toLowerCase()} yang cocok.`}
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
              {editing ? `Edit ${itemLabel}` : `Tambah ${itemLabel}`}
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
              {!autoSlug && (
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
              )}
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
