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
import { eventService } from "@/services/event.service"

const eventSchema = z.object({
  title: z.string().min(1, "Judul event wajib diisi"),
  image: z.string().min(1, "Gambar wajib diunggah"),
  eventDate: z.string().optional(),
  description: z.string().optional(),
})

type EventFormValues = z.infer<typeof eventSchema>

export function AdminEventFormPage() {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const { data: existing, loading: loadingExisting } = useAsyncData(
    () => (id ? eventService.getById(id) : Promise.resolve(null)),
    [id]
  )
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: { title: "", image: "", eventDate: "", description: "" },
  })

  useEffect(() => {
    if (existing) {
      form.reset({
        title: existing.title,
        image: existing.image,
        eventDate: existing.eventDate ?? "",
        description: existing.description ?? "",
      })
    }
  }, [existing, form])

  async function onSubmit(values: EventFormValues) {
    setSubmitting(true)
    try {
      if (isEdit && id) {
        await eventService.update(id, values)
        toast.success("Event berhasil diperbarui")
      } else {
        await eventService.create(values)
        toast.success("Event berhasil ditambahkan")
      }
      navigate("/admin/event")
    } catch {
      toast.error("Gagal menyimpan event")
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
        {isEdit ? "Edit Event" : "Tambah Event"}
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
                    folder="events"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Judul Event</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="eventDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tanggal Event (opsional)</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
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
                <FormLabel>Deskripsi (opsional)</FormLabel>
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
              onClick={() => navigate("/admin/event")}
            >
              Batal
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
