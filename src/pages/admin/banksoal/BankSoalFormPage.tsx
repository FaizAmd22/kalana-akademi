import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useAsyncData } from "@/hooks/use-async-data"
import { useKategori } from "@/hooks/useKategori"
import { banksoalService } from "@/services/banksoal.service"

const bankSoalSchema = z.object({
  label: z.string().min(1, "Label wajib dipilih"),
  title: z.string().min(1, "Judul wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  link: z.string().min(1, "Link wajib diisi"),
})

type BankSoalFormValues = z.infer<typeof bankSoalSchema>

export function AdminBankSoalFormPage() {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const { data: existing, loading: loadingExisting } = useAsyncData(
    () => (id ? banksoalService.getById(id) : Promise.resolve(null)),
    [id]
  )
  const { getByTipe } = useKategori()
  const [submitting, setSubmitting] = useState(false)

  const bankSoalKategori = getByTipe("banksoal").sort((a, b) => a.order - b.order)

  const form = useForm<BankSoalFormValues>({
    resolver: zodResolver(bankSoalSchema),
    defaultValues: { label: "", title: "", description: "", link: "" },
  })

  useEffect(() => {
    if (existing) {
      form.reset({
        label: existing.label,
        title: existing.title,
        description: existing.description,
        link: existing.link,
      })
    }
  }, [existing, form])

  async function onSubmit(values: BankSoalFormValues) {
    setSubmitting(true)
    try {
      if (isEdit && id && existing) {
        await banksoalService.update(id, { ...values, order: existing.order })
        toast.success("Bank soal berhasil diperbarui")
      } else {
        // append to the end; exact position is fixed by drag-and-drop in the list
        await banksoalService.create({ ...values, order: Date.now() })
        toast.success("Bank soal berhasil ditambahkan")
      }
      navigate("/admin/bank-soal")
    } catch {
      toast.error("Gagal menyimpan bank soal")
    } finally {
      setSubmitting(false)
    }
  }

  if (isEdit && loadingExisting) {
    return <p className="text-sm text-muted-foreground">Memuat data...</p>
  }

  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="text-xl font-semibold">
        {isEdit ? "Edit Bank Soal" : "Tambah Bank Soal"}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  items={bankSoalKategori.map((l) => ({
                    value: l.value,
                    label: l.label,
                  }))}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih label" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {bankSoalKategori.map((l) => (
                      <SelectItem key={l.value} value={l.value}>
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Judul</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi</FormLabel>
                <FormControl>
                  <Textarea rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link Soal</FormLabel>
                <FormControl>
                  <Input placeholder="https://..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-2">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Menyimpan..." : "Simpan"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/admin/bank-soal")}
            >
              Batal
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
