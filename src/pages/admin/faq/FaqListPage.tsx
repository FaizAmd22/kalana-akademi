import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { PencilIcon, PlusIcon, Trash2Icon } from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { useAdminFaqList } from "@/hooks/useFaq"
import { toOrderPayload } from "@/lib/reorder"
import { faqService } from "@/services/faq.service"
import type { Faq } from "@/types"

const faqSchema = z.object({
  question: z.string().min(1, "Pertanyaan wajib diisi"),
  answer: z.string().min(1, "Jawaban wajib diisi"),
})

type FaqFormValues = z.infer<typeof faqSchema>

export function AdminFaqListPage() {
  const { data: faqs, loading, error } = useAdminFaqList()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState<Faq | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<FaqFormValues>({
    resolver: zodResolver(faqSchema),
    defaultValues: { question: "", answer: "" },
  })

  useEffect(() => {
    form.reset({
      question: editing?.question ?? "",
      answer: editing?.answer ?? "",
    })
  }, [editing, form])

  function openCreate() {
    setEditing(null)
    setOpen(true)
  }

  function openEdit(faq: Faq) {
    setEditing(faq)
    setOpen(true)
  }

  async function onSubmit(values: FaqFormValues) {
    setSubmitting(true)
    try {
      if (editing) {
        await faqService.update(editing.id, values)
        toast.success("FAQ berhasil diperbarui")
      } else {
        // append to the end; exact position is fixed by drag-and-drop in the list
        await faqService.create({ ...values, order: Date.now() })
        toast.success("FAQ berhasil ditambahkan")
      }
      setOpen(false)
    } catch {
      toast.error("Gagal menyimpan FAQ")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id: string) {
    try {
      await faqService.remove(id)
      toast.success("FAQ berhasil dihapus")
    } catch {
      toast.error("Gagal menghapus FAQ")
    }
  }

  async function handleReorder(reordered: Faq[]) {
    try {
      await faqService.updateOrder(toOrderPayload(reordered))
    } catch {
      toast.error("Gagal menyimpan urutan FAQ")
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-xl font-semibold">FAQ</h1>
        <Button onClick={openCreate}>
          <PlusIcon /> Tambah FAQ
        </Button>
      </div>

      {loading ? (
        <Skeleton className="h-64 w-full" />
      ) : error ? (
        <EmptyState
          title="Gagal memuat data"
          description="Periksa konfigurasi Firebase (.env) lalu muat ulang halaman."
        />
      ) : faqs.length === 0 ? (
        <EmptyState description="Belum ada FAQ. Tambahkan pertanyaan pertama Anda." />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-8" />
              <TableHead>Pertanyaan</TableHead>
              <TableHead className="w-24 text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <SortableTableBody items={faqs} onReorder={handleReorder}>
            {faqs.map((faq) => (
              <SortableRow key={faq.id} id={faq.id}>
                <TableCell>
                  <DragHandle />
                </TableCell>
                <TableCell className="font-medium">{faq.question}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => openEdit(faq)}
                    >
                      <PencilIcon />
                    </Button>
                    <ConfirmDeleteDialog
                      title="Hapus FAQ ini?"
                      description={`"${faq.question}" akan dihapus permanen.`}
                      onConfirm={() => handleDelete(faq.id)}
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
            <DialogTitle>{editing ? "Edit FAQ" : "Tambah FAQ"}</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="question"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pertanyaan</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="answer"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jawaban</FormLabel>
                    <FormControl>
                      <Textarea rows={3} {...field} />
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
