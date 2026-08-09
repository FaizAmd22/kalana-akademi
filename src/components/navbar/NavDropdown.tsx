import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import type { NavMenuItem } from "@/lib/nav-links";

export function NavDropdown({ label, items = [] }: NavMenuItem) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{label}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-56 gap-1">
          {items.map((item) => (
            <li
              key={item.href}
              className={cn(
                item.isLihatSemua && "mt-1 border-t border-border pt-1"
              )}
            >
              <NavigationMenuLink render={<Link to={item.href} />}>
                <p className={cn(item.isLihatSemua && "text-blue-600 italic")}>
                  {item.label}
                </p>
              </NavigationMenuLink>
            </li>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
