import { Button, buttonVariants } from "@/components/ui/button";
import { DEFAULT_GOOGLE_FORM_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useSettings } from "@/hooks/useSettings";
import type { VariantProps } from "class-variance-authority";

interface DaftarSekarangButtonProps
  extends VariantProps<typeof buttonVariants> {
  googleFormUrl?: string;
  className?: string;
}

export function DaftarSekarangButton({
  googleFormUrl,
  variant,
  size,
  className,
}: DaftarSekarangButtonProps) {
  const { data: settings } = useSettings();

  const resolvedFormUrl =
    googleFormUrl ?? settings?.googleFormUrl ?? DEFAULT_GOOGLE_FORM_URL;

  return (
    <Button
      variant={variant}
      size={size}
      className={cn("rounded-full px-5", className)}
      nativeButton={false}
      render={<a href={resolvedFormUrl} target="_blank" rel="noreferrer" />}
    >
      Daftar Sekarang
    </Button>
  );
}
