import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function AdminDashboardPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Selamat datang di admin dashboard Kalana Akademik. Gunakan menu di
          samping untuk mengelola konten situs.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Konten yang dikelola
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            Program, Artikel, Bank Soal, FAQ, Testimoni, Event Kalana, dan
            Galeri dapat dikelola lewat menu di samping.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Daftar Sekarang
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm">
            Atur link Google Form dan nomor WhatsApp lewat menu Pengaturan.
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
