import { Link } from "react-router-dom"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { DaftarSekarangButton } from "@/components/shared/DaftarSekarangButton"
import { useNavMenu } from "@/hooks/useNavMenu"
import { cn } from "@/lib/utils"
import { NavDropdown } from "./NavDropdown"
import { MobileNav } from "./MobileNav"

export function Navbar() {
  const navMenu = useNavMenu()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <Link to="/" className="text-lg font-bold text-primary">
          Kalana Akademik
        </Link>

        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {navMenu.map((item) =>
              item.items ? (
                <NavDropdown key={item.label} {...item} />
              ) : (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    render={<Link to={item.href!} />}
                    className={cn(navigationMenuTriggerStyle())}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <DaftarSekarangButton className="hidden sm:inline-flex" />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}
