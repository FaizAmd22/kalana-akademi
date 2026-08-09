import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KategoriTable } from "./KategoriTable"

export function AdminKategoriListPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold">Kategori</h1>
        <p className="text-sm text-muted-foreground">
          Atur kategori/label yang tampil di navbar dan halaman Program, Bank
          Soal, dan Artikel.
        </p>
      </div>

      <Tabs defaultValue="program">
        <TabsList>
          <TabsTrigger value="program">Program</TabsTrigger>
          <TabsTrigger value="banksoal">Bank Soal</TabsTrigger>
          <TabsTrigger value="artikel">Artikel</TabsTrigger>
        </TabsList>
        <TabsContent value="program">
          <KategoriTable tipe="program" />
        </TabsContent>
        <TabsContent value="banksoal">
          <KategoriTable tipe="banksoal" />
        </TabsContent>
        <TabsContent value="artikel">
          <KategoriTable tipe="artikel" />
        </TabsContent>
      </Tabs>
    </div>
  )
}
