import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowRightIcon,
  BookOpenIcon,
  CircleIcon,
  ClipboardListIcon,
  HouseIcon,
  InfoIcon,
  MenuIcon,
  NewspaperIcon,
  PhoneIcon,
  type LucideIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DaftarSekarangButton } from "@/components/shared/DaftarSekarangButton";
import { useNavMenu } from "@/hooks/useNavMenu";
import type { NavMenuItem } from "@/lib/nav-links";
import { cn } from "@/lib/utils";
import logoImage from "@/assets/logo/logo.png";

const MENU_ICONS: Record<string, LucideIcon> = {
  Home: HouseIcon,
  Program: BookOpenIcon,
  Artikel: NewspaperIcon,
  "Bank Soal": ClipboardListIcon,
  "Tentang Kami": InfoIcon,
  Kontak: PhoneIcon,
};

const pathOf = (href: string) => href.split(/[?#]/)[0];

function NavIcon({ label, active }: { label: string; active: boolean }) {
  const Icon = MENU_ICONS[label] ?? CircleIcon;
  return (
    <span
      className={cn(
        "flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors",
        active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
      )}
    >
      <Icon className="size-4" />
    </span>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const navMenu = useNavMenu();
  const { pathname, search } = useLocation();

  // a sub-link is active only on an exact match, so "/program?label=sd" and
  // "Lihat Semua Program" (/program) don't light up at the same time
  const isLinkActive = (href: string) => href === pathname + search;

  const isGroupActive = (item: NavMenuItem) =>
    (item.items ?? []).some((sub) => {
      const path = pathOf(sub.href);
      return pathname === path || pathname.startsWith(`${path}/`);
    });

  const isTopActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<Button variant="ghost" size="icon" className="md:hidden" />}
      >
        <MenuIcon />
        <span className="sr-only">Buka menu</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-[85%] max-w-xs gap-0 p-0">
        <SheetHeader className="flex-row items-center gap-3 border-b border-border py-3 pr-12">
          <img
            src={logoImage}
            alt=""
            className="size-10 shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0">
            <SheetTitle className="truncate text-base font-bold text-primary">
              Kalana Akademik
            </SheetTitle>
            <p className="text-xs leading-snug text-muted-foreground">
              Bimbingan Belajar SD · SMP · SMA
            </p>
          </div>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto px-3 py-3">
          {/* one Accordion so opening a group collapses the others; the group
              containing the current page starts expanded */}
          <Accordion
            multiple={false}
            defaultValue={navMenu
              .filter((item) => item.items && isGroupActive(item))
              .map((item) => item.label)}
            className="gap-1"
          >
            {navMenu.map((item) => {
              if (!item.items) {
                const active = isTopActive(item.href!);
                return (
                  <Link
                    key={item.href}
                    to={item.href!}
                    onClick={close}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-2 py-1.5 text-sm font-medium transition-colors",
                      active ? "bg-primary/10 text-primary" : "hover:bg-muted"
                    )}
                  >
                    <NavIcon label={item.label} active={active} />
                    {item.label}
                  </Link>
                );
              }

              const groupActive = isGroupActive(item);
              return (
                <AccordionItem
                  key={item.label}
                  value={item.label}
                  className="border-none"
                >
                  <AccordionTrigger
                    className={cn(
                      "items-center gap-3 px-2 py-1.5 hover:bg-muted hover:no-underline",
                      groupActive && "text-primary"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <NavIcon label={item.label} active={groupActive} />
                      {item.label}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pt-1 pb-2 [&_a]:no-underline">
                    {/* left rail lines up with the centre of the group icon */}
                    <div className="ml-6 flex flex-col border-l border-border pl-3">
                      {item.items.map((sub) => {
                        const active = isLinkActive(sub.href);
                        return (
                          <Link
                            key={sub.href}
                            to={sub.href}
                            onClick={close}
                            className={cn(
                              "relative rounded-md px-2 py-2 text-sm transition-colors",
                              sub.isLihatSemua
                                ? "flex items-center gap-1 font-medium text-primary"
                                : active
                                  ? "bg-primary/10 font-medium text-primary"
                                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
                              active &&
                                "before:absolute before:top-1/2 before:-left-3.25 before:h-5 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-primary"
                            )}
                          >
                            {sub.label}
                            {sub.isLihatSemua && (
                              <ArrowRightIcon className="size-3.5" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </nav>

        {/* safe-area padding keeps the button clear of the iOS home bar */}
        <div className="border-t border-border p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <DaftarSekarangButton size="lg" className="h-11 w-full" />
        </div>
      </SheetContent>
    </Sheet>
  );
}
