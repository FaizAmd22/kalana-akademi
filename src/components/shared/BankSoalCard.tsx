import { DownloadIcon } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { BankSoal } from "@/types"

export function BankSoalCard({ bankSoal }: { bankSoal: BankSoal }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{bankSoal.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{bankSoal.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full"
          nativeButton={false}
          render={<a href={bankSoal.link} target="_blank" rel="noreferrer" />}
        >
          <DownloadIcon /> Unduh Soal
        </Button>
      </CardFooter>
    </Card>
  )
}
