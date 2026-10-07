import { useMemo, useState } from "react";
import { SearchIcon } from "lucide-react";

import { EmptyState } from "@/components/shared/EmptyState";
import { StickyFilterBar } from "@/components/shared/StickyFilterBar";
import { TentorCard } from "@/components/shared/TentorCard";
import { Input } from "@/components/ui/input";
import { useKategori } from "@/hooks/useKategori";
import { cn } from "@/lib/utils";
import type { Tentor } from "@/types";

export function TentorDirectory({ tentors }: { tentors: Tentor[] }) {
  const { getByTipe } = useKategori();
  const [role, setRole] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return tentors.filter((t) => {
      if (role && !t.roles?.includes(role)) return false;
      if (!q) return true;
      return (
        t.name.toLowerCase().includes(q) ||
        (t.jurusan ?? "").toLowerCase().includes(q) ||
        (t.universitas ?? "").toLowerCase().includes(q)
      );
    });
  }, [tentors, role, search]);

  const roleOptions: { value: string | null; label: string }[] = [
    { value: null, label: "Semua Peran" },
    ...getByTipe("tentor").sort((a, b) => a.order - b.order),
  ];

  return (
    <div>
      <StickyFilterBar
        className="flex flex-col-reverse gap-3 md:flex-row md:items-center md:justify-between"
        scrollKey={`${role ?? ""}|${search.trim()}`}
      >
        {/* single scrollable row on mobile keeps the sticky bar short */}
        <div className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0">
          {roleOptions.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() => setRole(option.value)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                role === option.value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:bg-muted"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="relative md:w-72">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama atau jurusan/kampus..."
            className="h-9 pl-8"
          />
        </div>
      </StickyFilterBar>

      {filtered.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            title="Tentor tidak ditemukan"
            description="Coba kata kunci atau filter peran yang lain."
          />
        </div>
      ) : (
        <div className="stagger mt-4 grid grid-cols-3 gap-2 sm:gap-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((tentor) => (
            <TentorCard key={tentor.id} tentor={tentor} />
          ))}
        </div>
      )}
    </div>
  );
}
