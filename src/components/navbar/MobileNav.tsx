import { useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon } from "lucide-react";

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
import { cn } from "@/lib/utils";
import logoImage from "@/assets/logo/logo.png";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const navMenu = useNavMenu();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={<Button variant="ghost" size="icon" className="md:hidden" />}
      >
        <MenuIcon />
        <span className="sr-only">Buka menu</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-4/5 max-w-xs">
        <SheetHeader>
          <img
            src={logoImage}
            alt="Kalana Akademik"
            className="w-10 h-10 rounded-full object-cover"
          />
          <SheetTitle>Kalana Akademik</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 overflow-y-auto px-4 pb-4">
          {navMenu.map((item) =>
            item.items ? (
              <Accordion key={item.label}>
                <AccordionItem value={item.label} className="border-none">
                  <AccordionTrigger className="pl-2 py-2 text-sm font-medium hover:no-underline">
                    {item.label}
                  </AccordionTrigger>
                  <AccordionContent className="pb-0">
                    <div className="flex flex-col gap-1 pl-3">
                      {item.items.map((sub) => (
                        <Link
                          key={sub.href}
                          to={sub.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground",
                            sub.isLihatSemua &&
                              "mt-1 border-t border-border pt-2.5"
                          )}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <Link
                key={item.href}
                to={item.href!}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm font-medium hover:bg-muted"
              >
                {item.label}
              </Link>
            )
          )}
          <DaftarSekarangButton className="mt-4 w-full" />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
