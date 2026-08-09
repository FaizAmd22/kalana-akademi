import { Link } from "react-router-dom";

import { DaftarSekarangButton } from "@/components/shared/DaftarSekarangButton";
import { Button } from "@/components/ui/button";

export function ReadyToJoin() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Siap Bergabung dengan Kalana Akademik?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
          Mulai langkah pertama menuju prestasi akademik bersama tutor
          berpengalaman kami. Konsultasi awal gratis, tanpa komitmen.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <DaftarSekarangButton
            size="lg"
            className="bg-background text-foreground hover:bg-background/90"
          />
          <Button
            variant="outline"
            size="lg"
            nativeButton={false}
            className="border-primary-foreground/30 bg-transparent rounded-full px-5 text-primary-foreground hover:bg-primary-foreground/10"
            render={<Link to="/kontak" />}
          >
            Hubungi Kami
          </Button>
        </div>
      </div>
    </section>
  );
}
