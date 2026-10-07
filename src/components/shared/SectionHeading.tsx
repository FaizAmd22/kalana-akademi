import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  align?: "left" | "center"
  /** light text for dark backgrounds */
  inverted?: boolean
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = "left",
  inverted = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-2",
        align === "center" && "mx-auto max-w-2xl text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase",
            inverted ? "text-sky-200" : "text-sky-700 dark:text-sky-400"
          )}
        >
          <span aria-hidden className="h-0.5 w-6 rounded-full bg-current" />
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-2xl font-bold tracking-tight sm:text-3xl",
          // soft shadow keeps text legible over busy photo backgrounds
          inverted &&
            "text-primary-foreground [text-shadow:0_2px_16px_rgb(0_0_0/0.35)]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={
            inverted
              ? "text-primary-foreground/90 [text-shadow:0_1px_8px_rgb(0_0_0/0.35)]"
              : "text-muted-foreground"
          }
        >
          {description}
        </p>
      )}
    </div>
  )
}
