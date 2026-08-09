import { Link, useParams } from "react-router-dom"

import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useArtikelById } from "@/hooks/useArtikel"
import { useKategori } from "@/hooks/useKategori"

export function ArtikelDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { getLabel } = useKategori()
  const { data: artikel, loading } = useArtikelById(id)

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-12">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-9 w-2/3" />
        <Skeleton className="aspect-video w-full" />
      </div>
    )
  }

  if (!artikel) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-lg font-medium">Artikel tidak ditemukan.</p>
        <Button
          className="mt-4"
          nativeButton={false}
          render={<Link to="/artikel" />}
        >
          Kembali ke Artikel
        </Button>
      </div>
    )
  }

  const kategoriText = getLabel("artikel", artikel.kategori)

  return (
    <AnimateOnScroll
      animation="fadeInUp"
      className="mx-auto max-w-3xl px-4 py-12"
    >
      <article>
        <Badge variant="outline">{kategoriText}</Badge>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          {artikel.title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {artikel.createdAt.toDate().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <img
          src={artikel.image}
          alt={artikel.title}
          className="mt-6 aspect-video w-full rounded-xl object-cover"
        />
        <p className="mt-6 leading-relaxed text-muted-foreground">
          {artikel.description}
        </p>
      </article>
    </AnimateOnScroll>
  )
}
