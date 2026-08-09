import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { ImageUploader } from "@/components/admin/ImageUploader"
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
import { useArtikelById } from "@/hooks/useArtikel"
import { useKategori } from "@/hooks/useKategori"
import { artikelService } from "@/services/artikel.service"

const artikelSchema = z.object({
  kategori: z.string().min(1, "Kategori wajib dipilih"),
  title: z.string().min(1, "Judul wajib diisi"),
  image: z.string().min(1, "Gambar wajib diunggah"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
})

type ArtikelFormValues = z.infer<typeof artikelSchema>

export function AdminArtikelFormPage() {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const { data: existing, loading: loadingExisting } = useArtikelById(id)
  const { getByTipe } = useKategori()
  const [submitting, setSubmitting] = useState(false)

  const artikelKategori = getByTipe("artikel").sort((a, b) => a.order - b.order)

  const form = useForm<ArtikelFormValues>({
    resolver: zodResolver(artikelSchema),
    defaultValues: {
      kategori: "",
      title: "",
      image: "",
      description: "",
    },
  })

  useEffect(() => {
    if (existing) {
      form.reset({
        kategori: existing.kategori,
        title: existing.title,
        image: existing.image,
        description: existing.description,
      })
    }
  }, [existing, form])

  async function onSubmit(values: ArtikelFormValues) {
    setSubmitting(true)
    try {
      if (isEdit && id && existing) {
        await artikelService.update(id, { ...values, order: existing.order })
        toast.success("Artikel berhasil diperbarui")
      } else {
        // append to the end; exact position is fixed by drag-and-drop in the list
        await artikelService.create({ ...values, order: Date.now() })
        toast.success("Artikel berhasil ditambahkan")
      }
      navigate("/admin/artikel")
    } catch {
      toast.error("Gagal menyimpan artikel")
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
        {isEdit ? "Edit Artikel" : "Tambah Artikel"}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="kategori"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kategori</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  items={artikelKategori.map((k) => ({
                    value: k.value,
                    label: k.label,
                  }))}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {artikelKategori.map((k) => (
                      <SelectItem key={k.value} value={k.value}>
                        {k.label}
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
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gambar</FormLabel>
                <FormControl>
                  <ImageUploader
                    value={field.value}
                    onChange={field.onChange}
                    folder="artikels"
                  />
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
                  <Textarea rows={4} {...field} />
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
              onClick={() => navigate("/admin/artikel")}
            >
              Batal
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
