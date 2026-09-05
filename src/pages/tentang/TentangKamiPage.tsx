import { AnimateOnScroll } from "@/components/shared/AnimateOnScroll";
import { EmptyState } from "@/components/shared/EmptyState";
import { EventGrid } from "@/components/shared/EventGrid";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { GaleriGrid } from "@/components/shared/GaleriGrid";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TestimoniCard } from "@/components/shared/TestimoniCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEventList } from "@/hooks/useEvent";
import { useFaqList } from "@/hooks/useFaq";
import { useGaleriList } from "@/hooks/useGaleri";
import { useScrollToHash } from "@/hooks/use-scroll-to-hash";
import { useTestimoniList } from "@/hooks/useTestimoni";

export function TentangKamiPage() {
  useScrollToHash();

  const { data: faqs, loading: loadingFaqs } = useFaqList();
  const { data: testimonis, loading: loadingTestimonis } = useTestimoniList();
  const { data: events, loading: loadingEvents } = useEventList();
  const { data: galeri, loading: loadingGaleri } = useGaleriList();

  return (
    <div>
      {/* Profil */}
      <section
        id="profil"
        className="mx-auto max-w-3xl scroll-mt-20 px-4 py-12"
      >
        <AnimateOnScroll animation="fadeInUp">
          <SectionHeading title="Profil Kalana Akademik" />
          <div className="mt-6 space-y-4 leading-relaxed text-muted-foreground">
            <p>
              Kalana Akademik adalah lembaga bimbingan belajar yang berfokus
              pada pendampingan akademik siswa SD, SMP, dan SMA, termasuk
              persiapan UTBK dan pembinaan olimpiade sains.
            </p>
            <p>
              Kami percaya setiap siswa memiliki potensi yang berbeda, sehingga
              pendekatan belajar yang kami gunakan disesuaikan dengan kebutuhan
              masing-masing siswa, didampingi oleh tutor-tutor berpengalaman di
              bidangnya.
            </p>
          </div>
        </AnimateOnScroll>
      </section>

      {/* Visi & Misi */}
      <section
        id="visi-misi"
        className="scroll-mt-20 border-t border-border bg-muted/40 py-12"
      >
        <div className="mx-auto max-w-3xl px-4">
          <AnimateOnScroll animation="fadeInUp">
            <SectionHeading title="Visi & Misi" />
            <div className="mt-6 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Visi</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Menjadi lembaga bimbingan belajar terpercaya yang membantu
                  siswa meraih prestasi akademik dan mencapai cita-citanya.
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Misi</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc space-y-1.5 pl-4 text-muted-foreground">
                    <li>
                      Memberikan bimbingan belajar berkualitas dan personal.
                    </li>
                    <li>
                      Mempersiapkan siswa menghadapi ujian sekolah, UTBK, dan
                      olimpiade sains.
                    </li>
                    <li>
                      Menumbuhkan semangat belajar mandiri pada setiap siswa.
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 border-t border-border py-12">
        <div className="mx-auto max-w-3xl px-4">
          <AnimateOnScroll animation="fadeInUp">
            <SectionHeading
              title="Pertanyaan yang Sering Diajukan"
              align="center"
            />
            <div className="mt-8">
              {loadingFaqs ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </div>
              ) : !faqs || faqs.length === 0 ? (
                <EmptyState description="Belum ada pertanyaan yang tersedia." />
              ) : (
                <FaqAccordion faqs={faqs} />
              )}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Testimoni */}
      <section
        id="testimoni"
        className="scroll-mt-20 border-t border-border bg-muted/40 py-12"
      >
        <div className="mx-auto max-w-6xl px-4">
          <AnimateOnScroll animation="fadeInUp">
            <SectionHeading
              title="Testimoni Siswa & Orang Tua"
              align="center"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {loadingTestimonis ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-40 w-full" />
                ))
              ) : !testimonis || testimonis.length === 0 ? (
                <div className="sm:col-span-2 lg:col-span-3">
                  <EmptyState description="Belum ada testimoni yang tersedia." />
                </div>
              ) : (
                testimonis.map((testimoni) => (
                  <TestimoniCard key={testimoni.id} testimoni={testimoni} />
                ))
              )}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Galeri */}
      <section
        id="galeri"
        className="scroll-mt-20 border-t border-border bg-muted/40 py-12"
      >
        <div className="mx-auto max-w-6xl px-4">
          <AnimateOnScroll animation="fadeInUp">
            <SectionHeading title="Galeri Kegiatan" />
            <div className="mt-6">
              {loadingGaleri ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="aspect-square w-full" />
                  ))}
                </div>
              ) : !galeri || galeri.length === 0 ? (
                <EmptyState description="Belum ada foto galeri yang tersedia." />
              ) : (
                <GaleriGrid items={galeri} />
              )}
            </div>
          </AnimateOnScroll>
        </div>
      </section>

      {/* Event Kalana */}
      <section
        id="event-kalana"
        className="scroll-mt-20 border-t border-border py-12"
      >
        <div className="mx-auto max-w-6xl px-4">
          <AnimateOnScroll animation="fadeInUp">
            <SectionHeading title="Event Kalana" />
            <div className="mt-6">
              {loadingEvents ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="aspect-square w-full" />
                  ))}
                </div>
              ) : !events || events.length === 0 ? (
                <EmptyState description="Belum ada event yang tersedia." />
              ) : (
                <EventGrid items={events} />
              )}
            </div>
          </AnimateOnScroll>
        </div>
      </section>
    </div>
  );
}
