import { GraduationCapIcon, UserIcon } from "lucide-react"

import { useKategori } from "@/hooks/useKategori"
import { responsiveImage } from "@/lib/cloudinary"
import type { Tentor } from "@/types"

// more than this many role chips would cover the photo on narrow cards
const MAX_ROLE_CHIPS = 2

export function TentorCard({ tentor }: { tentor: Tentor }) {
  const { getByTipe } = useKategori()
  // follow the admin-defined role order; roles deleted in admin are dropped
  const roles = getByTipe("tentor")
    .sort((a, b) => a.order - b.order)
    .filter((r) => tentor.roles?.includes(r.value))
  const shownRoles = roles.slice(0, MAX_ROLE_CHIPS)
  const hiddenRoles = roles.slice(MAX_ROLE_CHIPS)
  const background = [tentor.jurusan, tentor.universitas]
    .filter(Boolean)
    .join(", ")

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-card text-card-foreground shadow-sm ring-1 ring-foreground/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/15 motion-reduce:hover:translate-y-0">
      {/* photo fills the frame (cover) so every card lines up regardless of
          the uploaded image's shape */}
      <div className="relative aspect-[4/5] overflow-hidden bg-linear-to-br from-accent via-sky-100 to-primary/15">
        {tentor.image ? (
          <img
            {...responsiveImage(
              tentor.image,
              [250, 500],
              "(min-width: 1024px) 210px, (min-width: 768px) 25vw, 42vw"
            )}
            alt={tentor.name}
            loading="lazy"
            className="size-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <UserIcon className="size-1/3 text-primary/25" />
          </div>
        )}

        {roles.length > 0 && (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/45 to-transparent"
            />
            <div
              className="absolute inset-x-1.5 bottom-1.5 flex flex-wrap gap-1 sm:inset-x-2.5 sm:bottom-2.5"
              title={roles.map((r) => r.label).join(", ")}
            >
              {shownRoles.map((role) => (
                <span
                  key={role.value}
                  className="rounded-full bg-background/90 px-1.5 py-0.5 text-[8px] font-bold tracking-wider text-primary uppercase shadow-sm backdrop-blur sm:px-2 sm:text-[10px]"
                >
                  {role.label}
                </span>
              ))}
              {hiddenRoles.length > 0 && (
                <span className="rounded-full bg-primary/90 px-1.5 py-0.5 text-[8px] font-bold text-primary-foreground shadow-sm backdrop-blur sm:px-2 sm:text-[10px]">
                  +{hiddenRoles.length}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-2.5 sm:p-3.5">
        <p className="line-clamp-1 text-xs font-semibold sm:text-sm" title={tentor.name}>
          {tentor.name}
        </p>
        {background && (
          // reserves two lines so names line up across a row
          <p
            className="flex min-h-[2lh] gap-1 text-[10px] leading-snug text-muted-foreground sm:text-xs"
            title={background}
          >
            <GraduationCapIcon className="mt-px size-3 shrink-0 text-sky-500 sm:size-3.5" />
            <span className="line-clamp-2">{background}</span>
          </p>
        )}
      </div>
    </div>
  )
}
