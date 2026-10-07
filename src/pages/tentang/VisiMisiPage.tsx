import { TentangKamiShell } from "@/components/shared/TentangKamiShell"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function VisiMisiPage() {
  return (
    <TentangKamiShell title="Visi & Misi" width="narrow">
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Visi</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Menjadi lembaga bimbingan belajar terpercaya yang membantu siswa
            meraih prestasi akademik dan mencapai cita-citanya.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Misi</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-1.5 pl-4 text-muted-foreground">
              <li>Memberikan bimbingan belajar berkualitas dan personal.</li>
              <li>
                Mempersiapkan siswa menghadapi ujian sekolah, UTBK, dan
                olimpiade sains.
              </li>
              <li>Menumbuhkan semangat belajar mandiri pada setiap siswa.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </TentangKamiShell>
  )
}
