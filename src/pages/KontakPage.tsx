import { MessageCircleIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useKategori } from "@/hooks/useKategori";
import { useSettings } from "@/hooks/useSettings";
import { DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

const kontakSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  program: z.string().min(1, "Program wajib dipilih"),
  pesan: z.string().min(1, "Pesan wajib diisi"),
});

type KontakFormValues = z.infer<typeof kontakSchema>;

export function KontakPage() {
  const { getByTipe } = useKategori();
  const { data: settings } = useSettings();
  const programKategori = getByTipe("program").sort(
    (a, b) => a.order - b.order
  );

  const form = useForm<KontakFormValues>({
    resolver: zodResolver(kontakSchema),
    defaultValues: { nama: "", program: "", pesan: "" },
  });

  function onSubmit(values: KontakFormValues) {
    const programLabel =
      programKategori.find((k) => k.value === values.program)?.label ??
      values.program;

    const message = [
      `Halo Kalana Akademik, saya ${values.nama}.`,
      `Program yang diminati: ${programLabel}`,
      `Pesan: ${values.pesan}`,
    ].join("\n");

    const number = settings?.whatsappNumber ?? DEFAULT_WHATSAPP_NUMBER;
    const url = buildWhatsappUrl(number, message);

    window.open(url, "_blank", "noopener,noreferrer");
    form.reset();
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <AnimateOnScroll animation="fadeInUp">
        <SectionHeading
          eyebrow="Kontak"
          title="Hubungi Kalana Akademik"
          description="Punya pertanyaan seputar program atau pendaftaran? Hubungi kami lewat kontak di bawah ini."
        />
      </AnimateOnScroll>

      <AnimateOnScroll animation="fadeInUp" className="mt-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="max-w-lg space-y-4"
          >
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama lengkap Anda" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="program"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program</FormLabel>
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
                        <SelectValue placeholder="Pilih program yang diminati" />
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
              name="pesan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pesan</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      placeholder="Tuliskan pertanyaan atau pesan Anda"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" size="lg">
              <WhatsAppIcon className="size-4 shrink-0" /> Kirim ke WhatsApp
            </Button>
          </form>
        </Form>
      </AnimateOnScroll>
    </div>
  );
}
