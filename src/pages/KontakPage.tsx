import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  HelpCircleIcon,
  MailIcon,
  MessageCircleIcon,
  SendIcon,
} from "lucide-react";

import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { PageHero } from "@/components/shared/PageHero";
import { WhatsAppFloatButton } from "@/components/shared/WhatsAppFloatButton";
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
import {
  DEFAULT_EMAIL,
  DEFAULT_WA_MESSAGE,
  DEFAULT_WHATSAPP_NUMBER,
} from "@/lib/constants";
import { MASCOT } from "@/lib/mascots";
import { instagramHandle } from "@/lib/social";
import { buildWhatsappUrl } from "@/lib/whatsapp";

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

  const whatsappNumber = settings?.whatsappNumber || DEFAULT_WHATSAPP_NUMBER;
  const email = settings?.email || DEFAULT_EMAIL;
  const instagramUrl = settings?.instagramUrl;

  const channels = [
    {
      label: "WhatsApp",
      value: `+${whatsappNumber}`,
      hint: "Cara tercepat untuk bertanya dan mendaftar",
      href: buildWhatsappUrl(
        whatsappNumber,
        settings?.defaultWaMessage || DEFAULT_WA_MESSAGE
      ),
      icon: WhatsAppIcon,
      iconClass: "bg-[#25D366] text-white shadow-[#25D366]/30",
      external: true,
    },
    {
      label: "Email",
      value: email,
      hint: "Untuk pertanyaan detail atau kerja sama",
      href: `mailto:${email}`,
      icon: MailIcon,
      iconClass:
        "bg-linear-to-br from-primary to-sky-600 text-primary-foreground shadow-primary/30",
      external: false,
    },
    ...(instagramUrl
      ? [
          {
            label: "Instagram",
            value: instagramHandle(instagramUrl),
            hint: "Ikuti kabar dan kegiatan terbaru kami",
            href: instagramUrl,
            icon: InstagramIcon,
            iconClass:
              "bg-linear-to-br from-amber-400 via-pink-500 to-purple-600 text-white shadow-pink-500/30",
            external: true,
          },
        ]
      : []),
  ];

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

    window.open(
      buildWhatsappUrl(whatsappNumber, message),
      "_blank",
      "noopener,noreferrer"
    );
    form.reset();
  }

  return (
    <div>
      <PageHero
        eyebrow="Kontak"
        title="Hubungi Kalana Akademik"
        description="Punya pertanyaan seputar program atau pendaftaran? Tim kami siap membantu."
        icon={MessageCircleIcon}
        image={MASCOT.testimoni}
        imageAlt="Maskot Kalana Akademik melambaikan tangan"
        breadcrumbs={[{ label: "Kontak" }]}
      />

      <div className="mx-auto grid max-w-6xl items-start gap-8 px-4 py-10 md:py-14 lg:grid-cols-[1fr_1.15fr] lg:gap-10">
        {/* contact channels */}
        <AnimateOnScroll animation="fadeIn" className="space-y-4">
          <div>
            <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
              Pilih cara menghubungi kami
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Klik salah satu kontak di bawah untuk langsung terhubung.
            </p>
          </div>

          <div className="stagger space-y-3">
            {channels.map(
              ({ label, value, hint, href, icon: Icon, iconClass, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external && { target: "_blank", rel: "noreferrer" })}
                  className="group flex items-center gap-4 rounded-2xl bg-card p-4 ring-1 ring-foreground/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10 hover:ring-primary/25 sm:p-5"
                >
                  <span
                    className={`flex size-12 shrink-0 items-center justify-center rounded-xl shadow-md transition-transform duration-300 group-hover:scale-110 ${iconClass}`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs font-medium text-muted-foreground">
                      {label}
                    </span>
                    <span className="block truncate font-semibold">{value}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {hint}
                    </span>
                  </span>
                  <ArrowUpRightIcon className="size-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </a>
              )
            )}
          </div>

          <Link
            to="/tentang-kami/faq"
            className="group flex items-center gap-4 rounded-2xl bg-accent/60 p-4 transition-colors hover:bg-accent sm:p-5"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-background text-primary shadow-sm">
              <HelpCircleIcon className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold">Cek FAQ dulu</span>
              <span className="block text-sm text-muted-foreground">
                Mungkin pertanyaanmu sudah terjawab di sini.
              </span>
            </span>
            <ArrowRightIcon className="size-5 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        </AnimateOnScroll>

        {/* message form */}
        <AnimateOnScroll animation="fadeInUp">
          <div className="relative overflow-hidden rounded-3xl bg-card p-6 shadow-xl shadow-primary/10 ring-1 ring-foreground/10 sm:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 size-56 rounded-full bg-sky-200/40 blur-3xl"
            />
            <div className="relative">
              <div className="flex items-start gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                  <SendIcon className="size-5" />
                </span>
                <div>
                  <h2 className="text-lg font-bold tracking-tight sm:text-xl">
                    Kirim Pesan
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Isi form di bawah, pesanmu akan dibuka di WhatsApp dan
                    tinggal dikirim.
                  </p>
                </div>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mt-6 space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="nama"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Nama lengkap kamu"
                            className="h-11"
                            {...field}
                          />
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
                        <FormLabel>Program yang diminati</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          items={programKategori.map((k) => ({
                            value: k.value,
                            label: k.label,
                          }))}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full text-base data-[size=default]:h-11 md:text-sm">
                              <SelectValue placeholder="Pilih program" />
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
                            placeholder="Tuliskan pertanyaan atau kebutuhan belajarmu"
                            // fixed height; long messages scroll inside, and
                            // it can still be dragged taller
                            className="h-40 max-h-96 min-h-32 resize-y py-2.5 field-sizing-fixed"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 w-full rounded-full bg-[#25D366] text-base text-white shadow-lg shadow-[#25D366]/25 hover:bg-[#1ebe5a]"
                  >
                    <WhatsAppIcon className="size-5 shrink-0" /> Kirim ke
                    WhatsApp
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </AnimateOnScroll>
      </div>

      <WhatsAppFloatButton />
    </div>
  );
}
