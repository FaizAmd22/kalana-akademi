import { DownloadIcon, FileTextIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useKategori } from "@/hooks/useKategori"
import type { BankSoal } from "@/types"

export function BankSoalCard({ bankSoal }: { bankSoal: BankSoal }) {
  const { getLabel } = useKategori()
  const labelText = getLabel("banksoal", bankSoal.label)

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-card p-6 text-card-foreground ring-1 ring-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:ring-primary/20">
      <FileTextIcon
        aria-hidden
        className="absolute -right-6 -bottom-6 size-32 text-primary/5 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
      />

      <div className="relative flex items-start justify-between gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-sky-600 text-primary-foreground shadow-md shadow-primary/20 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6">
          <FileTextIcon className="size-6" />
        </span>
        {labelText && (
          <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
            {labelText}
          </span>
        )}
      </div>

      <p className="relative mt-5 font-semibold leading-snug transition-colors group-hover:text-primary">
        {bankSoal.title}
      </p>
      <p className="relative mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {bankSoal.description}
      </p>

      <Button
        className="relative mt-5 w-full rounded-full"
        nativeButton={false}
        render={<a href={bankSoal.link} target="_blank" rel="noreferrer" />}
      >
        <DownloadIcon /> Unduh Soal
      </Button>
    </div>
  )
}
