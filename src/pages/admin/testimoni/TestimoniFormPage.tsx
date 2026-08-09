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
import { Textarea } from "@/components/ui/textarea"
import { useAsyncData } from "@/hooks/use-async-data"
import { testimoniService } from "@/services/testimoni.service"

const testimoniSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  role: z.string().min(1, "Peran wajib diisi"),
  message: z.string().min(1, "Pesan wajib diisi"),
  image: z.string().optional(),
  rating: z.string(),
})

type TestimoniFormValues = z.infer<typeof testimoniSchema>

export function AdminTestimoniFormPage() {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const { data: existing, loading: loadingExisting } = useAsyncData(
    () => (id ? testimoniService.getById(id) : Promise.resolve(null)),
    [id]
  )
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<TestimoniFormValues>({
    resolver: zodResolver(testimoniSchema),
    defaultValues: { name: "", role: "", message: "", image: "", rating: "5" },
  })

  useEffect(() => {
    if (existing) {
      form.reset({
        name: existing.name,
        role: existing.role,
        message: existing.message,
        image: existing.image ?? "",
        rating: String(existing.rating ?? 5),
      })
    }
  }, [existing, form])

  async function onSubmit(values: TestimoniFormValues) {
    setSubmitting(true)
    const payload = {
      name: values.name,
      role: values.role,
      message: values.message,
      image: values.image,
      rating: Number(values.rating) || undefined,
    }
    try {
      if (isEdit && id) {
        await testimoniService.update(id, payload)
        toast.success("Testimoni berhasil diperbarui")
      } else {
        await testimoniService.create(payload)
        toast.success("Testimoni berhasil ditambahkan")
      }
      navigate("/admin/testimoni")
    } catch {
      toast.error("Gagal menyimpan testimoni")
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
        {isEdit ? "Edit Testimoni" : "Tambah Testimoni"}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Peran</FormLabel>
                <FormControl>
                  <Input placeholder="mis. Siswa SMA, Orang Tua Siswa" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pesan</FormLabel>
                <FormControl>
                  <Textarea rows={3} {...field} />
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
                <FormLabel>Foto (opsional)</FormLabel>
                <FormControl>
                  <ImageUploader
                    value={field.value}
                    onChange={field.onChange}
                    folder="testimonis"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating (1-5)</FormLabel>
                <FormControl>
                  <Input type="number" min={1} max={5} {...field} />
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
              onClick={() => navigate("/admin/testimoni")}
            >
              Batal
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
