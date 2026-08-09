import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useSettings } from "@/hooks/useSettings"
import { settingsService } from "@/services/settings.service"

const settingsSchema = z.object({
  googleFormUrl: z.string().optional(),
  whatsappNumber: z.string().min(1, "Nomor WhatsApp wajib diisi"),
  defaultWaMessage: z.string().min(1, "Pesan default wajib diisi"),
  email: z.string().optional(),
  instagramUrl: z.string().optional(),
})

type SettingsFormValues = z.infer<typeof settingsSchema>

export function AdminPengaturanPage() {
  const { data: settings, loading } = useSettings()
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      googleFormUrl: "",
      whatsappNumber: "",
      defaultWaMessage: "",
      email: "",
      instagramUrl: "",
    },
  })

  useEffect(() => {
    if (settings) {
      form.reset({
        googleFormUrl: settings.googleFormUrl,
        whatsappNumber: settings.whatsappNumber,
        defaultWaMessage: settings.defaultWaMessage,
        email: settings.email,
        instagramUrl: settings.instagramUrl,
      })
    }
  }, [settings, form])

  async function onSubmit(values: SettingsFormValues) {
    setSubmitting(true)
    try {
      await settingsService.update(values)
      toast.success("Pengaturan berhasil disimpan")
    } catch {
      toast.error("Gagal menyimpan pengaturan")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <p className="text-sm text-muted-foreground">Memuat data...</p>
  }

  return (
    <div className="max-w-xl space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Pengaturan</h1>
        <p className="text-sm text-muted-foreground">
          Atur link dan pesan default untuk tombol "Daftar Sekarang".
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="googleFormUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL Google Form</FormLabel>
                <FormControl>
                  <Input placeholder="https://forms.gle/..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="whatsappNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor WhatsApp</FormLabel>
                <FormControl>
                  <Input placeholder="62812xxxxxxx" {...field} />
                </FormControl>
                <FormDescription>
                  Format internasional tanpa tanda "+" (contoh: 62812xxxxxxx).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="defaultWaMessage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pesan Default WhatsApp</FormLabel>
                <FormControl>
                  <Textarea rows={3} {...field} />
                </FormControl>
                <FormDescription>
                  Digunakan jika program tidak memiliki pesan WhatsApp khusus.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="info@kalanaakademik.id" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instagramUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL Instagram</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://instagram.com/kalanaakademik"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={submitting}>
            {submitting ? "Menyimpan..." : "Simpan Pengaturan"}
          </Button>
        </form>
      </Form>
    </div>
  )
}
