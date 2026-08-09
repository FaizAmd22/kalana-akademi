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
import { useKategori } from "@/hooks/useKategori"
import { useProgramById } from "@/hooks/useProgram"
import { programService } from "@/services/program.service"

const programSchema = z.object({
  label: z.string().min(1, "Label wajib dipilih"),
  title: z.string().min(1, "Judul wajib diisi"),
  description: z.string().min(1, "Deskripsi wajib diisi"),
  image: z.string().min(1, "Gambar wajib diunggah"),
  points: z.string().min(1, "Isi minimal satu poin"),
  daftarLink: z.string().min(1, "Link pendaftaran wajib diisi"),
})

type ProgramFormValues = z.infer<typeof programSchema>

export function AdminProgramFormPage() {
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const navigate = useNavigate()
  const { data: existing, loading: loadingExisting } = useProgramById(id)
  const { getByTipe } = useKategori()
  const [submitting, setSubmitting] = useState(false)

  const programKategori = getByTipe("program").sort((a, b) => a.order - b.order)

  const form = useForm<ProgramFormValues>({
    resolver: zodResolver(programSchema),
    defaultValues: {
      label: "",
      title: "",
      description: "",
      image: "",
      points: "",
      daftarLink: "",
    },
  })

  useEffect(() => {
    if (existing) {
      form.reset({
        label: existing.label,
        title: existing.title,
        description: existing.description,
        image: existing.images[0] ?? "",
        points: existing.points.join("\n"),
        daftarLink: existing.daftarLink,
      })
    }
  }, [existing, form])

  async function onSubmit(values: ProgramFormValues) {
    setSubmitting(true)
    const base = {
      label: values.label,
      title: values.title,
      description: values.description,
      images: [values.image],
      points: values.points.split("\n").map((p) => p.trim()).filter(Boolean),
      daftarLink: values.daftarLink,
    }

    try {
      if (isEdit && id && existing) {
        await programService.update(id, { ...base, order: existing.order })
        toast.success("Program berhasil diperbarui")
      } else {
        // append to the end; exact position is fixed by drag-and-drop in the list
        await programService.create({ ...base, order: Date.now() })
        toast.success("Program berhasil ditambahkan")
      }
      navigate("/admin/program")
    } catch {
      toast.error("Gagal menyimpan program")
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
        {isEdit ? "Edit Program" : "Tambah Program"}
      </h1>

      {programKategori.length === 0 && (
        <p className="rounded-lg border border-dashed border-border p-3 text-sm text-muted-foreground">
          Belum ada kategori Program. Tambahkan dulu lewat menu{" "}
          <span className="font-medium text-foreground">Kategori</span>.
        </p>
      )}

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
                  items={programKategori.map((k) => ({
                    value: k.value,
                    label: k.label,
                  }))}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih label" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {programKategori.map((k) => (
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
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gambar</FormLabel>
                <FormControl>
                  <ImageUploader
                    value={field.value}
                    onChange={field.onChange}
                    folder="programs"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="points"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Poin (satu per baris)</FormLabel>
                <FormControl>
                  <Textarea rows={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="daftarLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link Pendaftaran</FormLabel>
                <FormControl>
                  <Input placeholder="https://forms.gle/..." {...field} />
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
              onClick={() => navigate("/admin/program")}
            >
              Batal
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
