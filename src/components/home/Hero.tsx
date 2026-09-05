import heroImage from "@/assets/images/hero_image.png";
import { DaftarSekarangButton } from "@/components/shared/DaftarSekarangButton";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-2 md:py-20">
      <div className="space-y-5">
        <p className="text-sm font-semibold text-primary">
          Bimbingan Belajar SD · SMP · SMA · UTBK · Olimpiade
        </p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Wujudkan Prestasi Akademikmu Bersama Kalana Akademik
        </h1>
        <p className="text-muted-foreground">
          Bimbingan belajar personal dengan tutor berpengalaman, untuk siswa SD
          hingga SMA, persiapan UTBK, dan pembinaan olimpiade sains.
        </p>
        <div className="flex flex-wrap gap-3">
          <DaftarSekarangButton size="lg" />
          <Button
            variant="outline"
            size="lg"
            nativeButton={false}
            className={"rounded-full px-5"}
            render={<Link to="/program" />}
          >
            Lihat Program
          </Button>
        </div>
      </div>

      <img
        src={heroImage}
        alt="Siswa belajar bersama Kalana Akademik"
        className="w-full rounded-2xl object-cover"
      />
    </section>
  );
}
