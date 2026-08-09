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
import { useAsyncData } from "@/hooks/use-async-data"
import { galeriService } from "@/services/galeri.service"

const galeriSchema = z.object({
  image: z.string().min(1, "Gambar wajib diunggah"),
  caption: z.string().optional(),
})

type GaleriFormValues = z.infer<typeof galeriSchema>

export function AdminGaleriFormPage() {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const { data: existing, loading: loadingExisting } = useAsyncData(
    () => (id ? galeriService.getById(id) : Promise.resolve(null)),
    [id]
  )
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<GaleriFormValues>({
    resolver: zodResolver(galeriSchema),
    defaultValues: { image: "", caption: "" },
  })

  useEffect(() => {
    if (existing) {
      form.reset({ image: existing.image, caption: existing.caption ?? "" })
    }
  }, [existing, form])

  async function onSubmit(values: GaleriFormValues) {
    setSubmitting(true)
    try {
      if (isEdit && id) {
        await galeriService.update(id, values)
        toast.success("Foto berhasil diperbarui")
      } else {
        await galeriService.create(values)
        toast.success("Foto berhasil ditambahkan")
      }
      navigate("/admin/galeri")
    } catch {
      toast.error("Gagal menyimpan foto")
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
        {isEdit ? "Edit Foto" : "Tambah Foto"}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    folder="galeris"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="caption"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keterangan (opsional)</FormLabel>
                <FormControl>
                  <Input {...field} />
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
              onClick={() => navigate("/admin/galeri")}
            >
              Batal
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
