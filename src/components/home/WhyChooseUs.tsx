import {
  ClipboardCheckIcon,
  ClockIcon,
  GraduationCapIcon,
  UsersIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";

const REASONS = [
  {
    icon: GraduationCapIcon,
    title: "Tutor Berpengalaman",
    description:
      "Diajar oleh tutor yang kompeten di bidangnya, termasuk alumni peraih prestasi olimpiade dan PTN favorit.",
  },
  {
    icon: UsersIcon,
    title: "Kelas Kecil & Personal",
    description:
      "Maksimal 8 siswa per kelas agar setiap siswa mendapat perhatian dan bimbingan yang optimal.",
  },
  {
    icon: ClipboardCheckIcon,
    title: "Kurikulum Terupdate",
    description:
      "Materi selalu disesuaikan dengan kurikulum terbaru dan pola soal ujian terkini.",
  },
  {
    icon: ClockIcon,
    title: "Jadwal Fleksibel",
    description:
      "Pilihan jadwal belajar yang menyesuaikan kesibukan siswa, tanpa mengorbankan kualitas belajar.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <SectionHeading
        eyebrow="Kenapa Kalana Akademik"
        title="Alasan Memilih Kami"
        description="Komitmen kami untuk mendampingi setiap siswa meraih prestasi terbaiknya."
        align="center"
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
        {REASONS.map(({ icon: Icon, title, description }) => (
          <Card key={title}>
            <CardContent className="space-y-2">
              <div className="flex size-10 items-center justify-center rounded-lg bg-accent">
                <Icon className="size-5 text-primary" />
              </div>
              <p className="font-medium">{title}</p>
              <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
