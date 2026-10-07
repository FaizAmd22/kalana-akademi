import { Link, useParams } from "react-router-dom"
import {
  ArrowRightIcon,
  CalendarIcon,
  ClockIcon,
  LinkIcon,
} from "lucide-react"
import { toast } from "sonner"

import { ReadyToJoin } from "@/components/home/ReadyToJoin"
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon"
import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll"
import { ArtikelCard } from "@/components/shared/ArtikelCard"
import { CardCarousel } from "@/components/shared/CardCarousel"
import { PageHero } from "@/components/shared/PageHero"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useArtikelById, useArtikelLatest } from "@/hooks/useArtikel"
import { useKategori } from "@/hooks/useKategori"
import { responsiveImage } from "@/lib/cloudinary"

const WORDS_PER_MINUTE = 200
const OTHERS_COUNT = 6

export function ArtikelDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { getLabel } = useKategori()
  const { data: artikel, loading } = useArtikelById(id)
  // one extra so the count holds after leaving out the current article
  const { data: latest } = useArtikelLatest(OTHERS_COUNT + 1)

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-12">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-9 w-2/3" />
        <Skeleton className="aspect-video w-full rounded-2xl" />
      </div>
    )
  }

  if (!artikel) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-lg font-medium">Artikel tidak ditemukan.</p>
        <Button
          className="mt-4 rounded-full"
          nativeButton={false}
          render={<Link to="/artikel" />}
        >
          Kembali ke Artikel
        </Button>
      </div>
    )
  }

  const kategoriText = getLabel("artikel", artikel.kategori)
  const date = artikel.createdAt?.toDate().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
  const words = artikel.description.trim().split(/\s+/).length
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE))
  const paragraphs = artikel.description
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
  const others = (latest ?? []).filter((a) => a.id !== artikel.id).slice(0, OTHERS_COUNT)

  const pageUrl = window.location.href
  const shareUrl = `https://wa.me/?text=${encodeURIComponent(`${artikel.title} — ${pageUrl}`)}`

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(pageUrl)
      toast.success("Link artikel disalin")
    } catch {
      toast.error("Gagal menyalin link")
    }
  }

  return (
    <div>
      <PageHero
        eyebrow={kategoriText}
        title={artikel.title}
        breadcrumbs={[
          { label: "Artikel", href: "/artikel" },
          { label: kategoriText, href: `/artikel?kategori=${artikel.kategori}` },
          { label: artikel.title },
        ]}
      >
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
          {date && (
            <span className="flex items-center gap-1.5">
              <CalendarIcon className="size-4 text-sky-500" />
              {date}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <ClockIcon className="size-4 text-sky-500" />
            {minutes} menit baca
          </span>
        </div>
      </PageHero>

      <AnimateOnScroll animation="fadeInUp">
        <article className="mx-auto max-w-3xl px-4 py-10 md:py-14">
          {artikel.image && (
            <img
              {...responsiveImage(artikel.image, [700, 1400], "(min-width: 768px) 720px, 100vw")}
              alt={artikel.title}
              className="aspect-video w-full rounded-2xl object-cover shadow-lg ring-1 ring-foreground/10"
            />
          )}

          <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground/85 md:text-lg md:leading-relaxed">
            {paragraphs.map((p, i) => (
              <p
                key={i}
                className="whitespace-pre-line first:first-letter:float-left first:first-letter:mr-2 first:first-letter:text-5xl first:first-letter:leading-none first:first-letter:font-bold first:first-letter:text-primary"
              >
                {p}
              </p>
            ))}
          </div>

          {/* share */}
          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-border pt-6">
            <span className="text-sm font-medium">Bagikan artikel:</span>
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              className="rounded-full"
              render={<a href={shareUrl} target="_blank" rel="noreferrer" />}
            >
              <WhatsAppIcon className="size-4 text-[#25D366]" /> WhatsApp
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={copyLink}
            >
              <LinkIcon /> Salin link
            </Button>
          </div>
        </article>
      </AnimateOnScroll>

      {others.length > 0 && (
        <section className="border-t border-border bg-accent/30">
          <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-2xl font-bold tracking-tight">
                Artikel Lainnya
              </h2>
              <Link
                to="/artikel"
                className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Lihat semua <ArrowRightIcon className="size-4" />
              </Link>
            </div>
            <div className="mt-3">
              <CardCarousel label="Artikel lainnya">
                {others.map((a) => (
                  <ArtikelCard key={a.id} artikel={a} />
                ))}
              </CardCarousel>
            </div>
          </div>
        </section>
      )}

      <AnimateOnScroll animation="zoomIn">
        <ReadyToJoin />
      </AnimateOnScroll>
    </div>
  )
}
