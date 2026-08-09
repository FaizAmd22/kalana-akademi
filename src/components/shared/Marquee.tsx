import type { ComponentType, ReactNode } from "react";
import * as FastMarqueeModule from "react-fast-marquee";
import type { MarqueeProps as FastMarqueeProps } from "react-fast-marquee";

import { cn } from "@/lib/utils";

// react-fast-marquee ships CJS-only and ends up double-wrapped
// (module.default.default) through Vite's esbuild interop — unwrap
// defensively so it works regardless of how many layers get added.
type FastMarqueeComponent = ComponentType<FastMarqueeProps>;
const rawExport = FastMarqueeModule as unknown as {
  default: FastMarqueeComponent | { default: FastMarqueeComponent };
};
const FastMarquee: FastMarqueeComponent =
  typeof rawExport.default === "function"
    ? rawExport.default
    : rawExport.default.default;

interface MarqueeProps<T> {
  items: T[];
  keyFor: (item: T) => string;
  renderItem: (item: T) => ReactNode;
  className?: string;
}

export function Marquee<T>({
  items,
  keyFor,
  renderItem,
  className,
}: MarqueeProps<T>) {
  return (
    <div
      className={cn(
        "mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <FastMarquee autoFill pauseOnHover speed={40}>
        {items.map((item) => (
          <div key={keyFor(item)} className="mx-2 py-5 shrink-0">
            {renderItem(item)}
          </div>
        ))}
      </FastMarquee>
    </div>
  );
}
