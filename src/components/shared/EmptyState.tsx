import { InboxIcon } from "lucide-react"

export function EmptyState({
  title = "Belum ada data",
  description,
}: {
  title?: string
  description?: string
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-border py-16 text-center">
      <InboxIcon className="size-8 text-muted-foreground" />
      <p className="font-medium">{title}</p>
      {description && (
        <p className="max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
}
