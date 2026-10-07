import { Link } from "react-router-dom";

import { DaftarSekarangButton } from "@/components/shared/DaftarSekarangButton";
import { Button } from "@/components/ui/button";
import { useParallax } from "@/hooks/use-parallax";
import { MASCOT } from "@/lib/mascots";

export function ReadyToJoin() {
  const glowRef = useParallax<HTMLDivElement>(0.35);
  const ringRef = useParallax<HTMLDivElement>(-0.25);
  const mascotRef = useParallax<HTMLDivElement>(-0.1);

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-primary via-primary to-sky-800 px-6 py-12 text-center text-primary-foreground shadow-xl shadow-primary/20 sm:px-12 md:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] bg-size-[22px_22px] opacity-10 mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]"
        />
        <div
          ref={glowRef}
          aria-hidden
          className="pointer-events-none absolute -top-20 -left-20 size-64 rounded-full bg-sky-400/25 blur-3xl"
        />
        <div
          ref={ringRef}
          aria-hidden
          className="pointer-events-none absolute -right-16 -bottom-24 size-72 rounded-full border-[40px] border-primary-foreground/5"
        />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:text-left">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Siap Bergabung dengan Kalana Akademik?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80 lg:mx-0">
              Mulai langkah pertama menuju prestasi akademik bersama tutor
              berpengalaman kami. Konsultasi awal gratis, tanpa komitmen.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
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

          {/* mascot badge, desktop only so the mobile CTA stays compact */}
          <div ref={mascotRef} className="relative hidden lg:block">
            <div
              aria-hidden
              className="absolute -inset-3 rounded-full border-2 border-dashed border-primary-foreground/20 motion-safe:animate-[spin_40s_linear_infinite]"
            />
            <img
              src={MASCOT.siapGabung}
              alt="Maskot Kalana Akademik melambaikan tangan di atas planet"
              width={208}
              height={208}
              loading="lazy"
              decoding="async"
              className="relative size-52 rounded-full object-cover shadow-2xl ring-8 ring-primary-foreground/10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
