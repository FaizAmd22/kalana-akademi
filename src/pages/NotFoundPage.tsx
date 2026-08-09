import { Link } from "react-router-dom"

import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll"
import { Button } from "@/components/ui/button"

export function NotFoundPage() {
  return (
    <AnimateOnScroll
      animation="fadeIn"
      className="mx-auto flex max-w-lg flex-col items-center gap-3 px-4 py-24 text-center"
    >
      <p className="text-6xl font-bold text-primary">404</p>
      <h1 className="text-xl font-semibold">Halaman Tidak Ditemukan</h1>
      <p className="text-muted-foreground">
        Halaman yang Anda cari tidak tersedia atau sudah dipindahkan.
      </p>
      <Button className="mt-2" nativeButton={false} render={<Link to="/" />}>
        Kembali ke Beranda
      </Button>
    </AnimateOnScroll>
  )
}
