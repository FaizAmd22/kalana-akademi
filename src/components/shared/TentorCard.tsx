import { UserIcon } from "lucide-react"

import { useKategori } from "@/hooks/useKategori"
import type { Tentor } from "@/types"

export function TentorCard({ tentor }: { tentor: Tentor }) {
  const { getByTipe } = useKategori()
  // follow the admin-defined role order; roles deleted in admin are dropped
  const roles = getByTipe("tentor")
    .sort((a, b) => a.order - b.order)
    .filter((r) => tentor.roles?.includes(r.value))
  const background = [tentor.jurusan, tentor.universitas]
    .filter(Boolean)
    .join(", ")

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-lg bg-card ring-1 ring-foreground/10 shadow-sm">
      <div className="flex aspect-square items-end justify-center overflow-hidden bg-primary/5">
        {tentor.image ? (
          <img
            src={tentor.image}
            alt={tentor.name}
            loading="lazy"
            className="h-full w-full origin-bottom object-contain object-bottom transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <UserIcon className="mb-[20%] size-1/3 text-primary/20" />
        )}
      </div>
      <div className="flex flex-1 flex-col items-center gap-0.5 px-1.5 py-2.5 text-center sm:gap-1 sm:px-2.5 sm:py-3">
        <p className="text-xs leading-snug font-semibold sm:text-sm">
          {tentor.name}
        </p>
        {background && (
          <p className="text-[10px] leading-snug text-muted-foreground sm:text-xs">
            {background}
          </p>
        )}
        {roles.length > 0 && (
          <div className="mt-1.5 flex flex-wrap justify-center gap-1">
            {roles.map((role) => (
              <span
                key={role.value}
                className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[8px] font-bold tracking-wider text-primary uppercase sm:px-2 sm:text-[10px]"
              >
                {role.label}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
