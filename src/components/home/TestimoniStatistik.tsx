import { Marquee } from "@/components/shared/Marquee";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TestimoniCard } from "@/components/shared/TestimoniCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useTestimoniList } from "@/hooks/useTestimoni";
import { STATISTIK } from "@/lib/constants";

const STATS = [
  { label: "Siswa Aktif", value: STATISTIK.jumlahSiswa },
  { label: "Alumni Diterima PTN", value: STATISTIK.alumniPTN },
  { label: "Tahun Pengalaman", value: STATISTIK.tahunPengalaman },
  { label: "Program Aktif", value: STATISTIK.programAktif },
];

export function TestimoniStatistik() {
  const { data: testimonis, loading } = useTestimoniList();
  const hasTestimoni = loading || (testimonis && testimonis.length > 0);

  return (
    <section className="bg-muted/40 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-6 rounded-2xl bg-card p-6 ring-1 ring-foreground/10 sm:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-primary">{stat.value}+</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {hasTestimoni && (
          <div className="mt-12">
            <SectionHeading
              eyebrow="Testimoni"
              title="Kata Mereka Tentang Kalana Akademik"
              align="center"
            />
          </div>
        )}
      </div>

      {hasTestimoni && (
        <div className="mt-6">
          {loading ? (
            <div className="mx-auto flex max-w-6xl gap-4 px-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-40 w-72 shrink-0" />
              ))}
            </div>
          ) : (
            <Marquee
              items={testimonis!}
              keyFor={(t) => t.id}
              renderItem={(t) => (
                <div className="w-72 sm:w-80">
                  <TestimoniCard testimoni={t} />
                </div>
              )}
            />
          )}
        </div>
      )}
    </section>
  );
}
