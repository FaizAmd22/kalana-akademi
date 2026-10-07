import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { ImageUploader } from "@/components/admin/ImageUploader";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAsyncData } from "@/hooks/use-async-data";
import { useAdminKategoriList } from "@/hooks/useKategori";
import { cn } from "@/lib/utils";
import { tentorService } from "@/services/tentor.service";

const tentorSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  jurusan: z.string().optional(),
  universitas: z.string().min(1, "Universitas / sekolah wajib diisi"),
  image: z.string().optional(),
  roles: z.array(z.string()).min(1, "Pilih minimal satu peran"),
});

type TentorFormValues = z.infer<typeof tentorSchema>;

export function AdminTentorFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { data: existing, loading: loadingExisting } = useAsyncData(
    () => (id ? tentorService.getById(id) : Promise.resolve(null)),
    [id]
  );
  const [submitting, setSubmitting] = useState(false);
  // live so roles just added in the "Peran" tab show up without a reload
  const { data: roleKategori, loading: loadingRoles } =
    useAdminKategoriList("tentor");
  const roleOptions = [...roleKategori].sort((a, b) => a.order - b.order);

  const form = useForm<TentorFormValues>({
    resolver: zodResolver(tentorSchema),
    defaultValues: {
      name: "",
      jurusan: "",
      universitas: "",
      image: "",
      roles: [],
    },
  });

  useEffect(() => {
    if (existing) {
      form.reset({
        name: existing.name,
        jurusan: existing.jurusan ?? "",
        universitas: existing.universitas ?? "",
        image: existing.image ?? "",
        roles: existing.roles ?? [],
      });
    }
  }, [existing, form]);

  async function onSubmit(values: TentorFormValues) {
    // drop roles whose Kategori was deleted — they're invisible in the picker
    const roles = values.roles.filter((r) =>
      roleOptions.some((o) => o.value === r)
    );
    if (roles.length === 0) {
      form.setError("roles", { message: "Pilih minimal satu peran" });
      return;
    }

    setSubmitting(true);
    const payload = { ...values, roles };
    try {
      if (isEdit && id && existing) {
        await tentorService.update(id, { ...payload, order: existing.order });
        toast.success("Tentor berhasil diperbarui");
      } else {
        await tentorService.create({ ...payload, order: Date.now() });
        toast.success("Tentor berhasil ditambahkan");
      }
      navigate("/admin/tentor");
    } catch {
      toast.error("Gagal menyimpan tentor");
    } finally {
      setSubmitting(false);
    }
  }

  if (isEdit && loadingExisting) {
    return <p className="text-sm text-muted-foreground">Memuat data...</p>;
  }

  return (
    <div className="max-w-2xl space-y-4">
      <h1 className="text-xl font-semibold">
        {isEdit ? "Edit Tentor" : "Tambah Tentor"}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    folder="tentors"
                  />
                </FormControl>
                <FormDescription>
                  Gunakan foto persegi (rasio 1:1), ukuran 600×600 hingga
                  1000×1000 px, maksimal ±1 MB.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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
            name="jurusan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jurusan (opsional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="mis. Undergraduate Student in Informatics"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Kosongkan jika tentor lulusan SMA atau sederajat.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="universitas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Universitas / Sekolah</FormLabel>
                <FormControl>
                  <Input placeholder="mis. ITB, SMAN 1 Majalengka" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roles"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Peran</FormLabel>
                {!loadingRoles && roleOptions.length === 0 && (
                  <p className="rounded-lg border border-dashed border-border p-3 text-sm text-muted-foreground">
                    Belum ada peran. Tambahkan dulu di tab "Peran" pada halaman
                    Tentor.
                  </p>
                )}
                <div className="flex flex-wrap gap-2">
                  {roleOptions.map((role) => {
                    const selected = field.value.includes(role.value);
                    return (
                      <button
                        key={role.value}
                        type="button"
                        aria-pressed={selected}
                        onClick={() =>
                          field.onChange(
                            selected
                              ? field.value.filter((v) => v !== role.value)
                              : [...field.value, role.value]
                          )
                        }
                        className={cn(
                          "rounded-full border px-3 py-1 text-sm font-medium transition-colors",
                          selected
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border hover:bg-muted"
                        )}
                      >
                        {role.label}
                      </button>
                    );
                  })}
                </div>
                <FormDescription>
                  Boleh memilih lebih dari satu.
                </FormDescription>
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
              onClick={() => navigate("/admin/tentor")}
            >
              Batal
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
