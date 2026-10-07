import { Link } from "react-router-dom"
import { MessageCircleQuestionIcon } from "lucide-react"

import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import { EmptyState } from "@/components/shared/EmptyState"
import { FaqAccordion } from "@/components/shared/FaqAccordion"
import { TentangKamiShell } from "@/components/shared/TentangKamiShell"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useFaqList } from "@/hooks/useFaq"
import { useSettings } from "@/hooks/useSettings"
import { DEFAULT_WA_MESSAGE, DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants"
import { buildWhatsappUrl } from "@/lib/whatsapp"

export function FaqPage() {
  const { data: faqs, loading } = useFaqList()
  const { data: settings } = useSettings()
  const whatsappUrl = buildWhatsappUrl(
    settings?.whatsappNumber || DEFAULT_WHATSAPP_NUMBER,
    settings?.defaultWaMessage || DEFAULT_WA_MESSAGE
  )

  return (
    <TentangKamiShell slug="faq" title="Pertanyaan yang Sering Diajukan">
      <div className="grid items-start gap-8 lg:grid-cols-[1fr_20rem]">
        <div>
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-14 w-full rounded-xl" />
              ))}
            </div>
          ) : !faqs || faqs.length === 0 ? (
            <EmptyState description="Belum ada pertanyaan yang tersedia." />
          ) : (
            <FaqAccordion faqs={faqs} />
          )}
        </div>

        {/* sticks beside the list on desktop (top-14 navbar + gap) */}
        <aside className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary to-sky-800 p-6 text-primary-foreground shadow-xl shadow-primary/20 lg:sticky lg:top-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-sky-400/25 blur-2xl"
          />
          <div className="relative">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary-foreground/10">
              <MessageCircleQuestionIcon className="size-5 text-sky-300" />
            </span>
            <p className="mt-4 text-lg font-semibold">Masih punya pertanyaan?</p>
            <p className="mt-1 text-sm text-primary-foreground/75">
              Tim kami siap membantu menjawab pertanyaanmu seputar program dan
              pendaftaran.
            </p>
            <div className="mt-5 flex flex-col gap-2">
              <Button
                nativeButton={false}
                className="rounded-full bg-background text-foreground hover:bg-background/90"
                render={<a href={whatsappUrl} target="_blank" rel="noreferrer" />}
              >
                <WhatsAppIcon className="size-4" /> Chat via WhatsApp
              </Button>
              <Button
                variant="outline"
                nativeButton={false}
                className="rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                render={<Link to="/kontak" />}
              >
                Halaman Kontak
              </Button>
            </div>
          </div>
        </aside>
      </div>
    </TentangKamiShell>
  )
}
