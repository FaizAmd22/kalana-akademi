import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpIcon, MailIcon } from "lucide-react";

import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { useNavMenu } from "@/hooks/useNavMenu";
import { useSettings } from "@/hooks/useSettings";
import {
  DEFAULT_EMAIL,
  DEFAULT_WA_MESSAGE,
  DEFAULT_WHATSAPP_NUMBER,
} from "@/lib/constants";
import { TENTANG_KAMI_PAGES, type NavMenuItem } from "@/lib/nav-links";
import { instagramHandle } from "@/lib/social";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import logoImage from "@/assets/logo/logo.png";

// Dropdown groups link to their "see all" page rather than the first category.
function topLevelHref(item: NavMenuItem) {
  if (item.href) return item.href;
  const seeAll = item.items?.find((sub) => sub.isLihatSemua);
  return (seeAll ?? item.items![0]).href.split(/[?#]/)[0];
}

function FooterHeading({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold tracking-wider text-primary-foreground uppercase">
      {children}
    </p>
  );
}

function FooterLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <li>
      <Link
        to={to}
        className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
      >
        {children}
      </Link>
    </li>
  );
}

export function Footer() {
  const navMenu = useNavMenu();
  const { data: settings } = useSettings();

  const email = settings?.email || DEFAULT_EMAIL;
  const whatsappNumber = settings?.whatsappNumber || DEFAULT_WHATSAPP_NUMBER;
  const whatsappUrl = buildWhatsappUrl(
    whatsappNumber,
    settings?.defaultWaMessage || DEFAULT_WA_MESSAGE
  );
  const instagramUrl = settings?.instagramUrl;

  // "Tentang Kami" has its own column, so leave it out of the general links
  const exploreLinks = navMenu.filter((item) => item.label !== "Tentang Kami");

  const contacts = [
    {
      href: whatsappUrl,
      label: "WhatsApp",
      value: `+${whatsappNumber}`,
      icon: WhatsAppIcon,
      external: true,
    },
    {
      href: `mailto:${email}`,
      label: "Email",
      value: email,
      icon: MailIcon,
      external: false,
    },
    ...(instagramUrl
      ? [
          {
            href: instagramUrl,
            label: "Instagram",
            value: instagramHandle(instagramUrl),
            icon: InstagramIcon,
            external: true,
          },
        ]
      : []),
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-12 md:grid-cols-3 lg:grid-cols-12 lg:gap-x-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-3 lg:col-span-4">
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white p-0.5">
              <img
                src={logoImage}
                alt=""
                className="size-full rounded-full object-cover"
              />
            </span>
            <span className="text-lg font-bold">Kalana Akademik</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
            Bimbingan belajar SD, SMP, SMA, persiapan UTBK, dan olimpiade sains
            dengan pendampingan yang personal.
          </p>
          <div className="mt-5 flex gap-2">
            {contacts.map(({ href, label, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(external && { target: "_blank", rel: "noreferrer" })}
                className="flex size-9 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground hover:text-primary"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="lg:col-span-2">
          <FooterHeading>Jelajahi</FooterHeading>
          <ul className="space-y-2.5">
            {exploreLinks.map((item) => (
              <FooterLink key={item.label} to={topLevelHref(item)}>
                {item.label}
              </FooterLink>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <FooterHeading>Tentang Kami</FooterHeading>
          <ul className="space-y-2.5">
            {TENTANG_KAMI_PAGES.map((page) => (
              <FooterLink key={page.slug} to={page.href}>
                {page.label}
              </FooterLink>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-2 md:col-span-1 lg:col-span-4">
          <FooterHeading>Hubungi Kami</FooterHeading>
          <ul className="space-y-3">
            {contacts.map(({ href, label, value, icon: Icon, external }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(external && { target: "_blank", rel: "noreferrer" })}
                  className="group flex items-center gap-3"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors group-hover:bg-primary-foreground group-hover:text-primary">
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-primary-foreground/60">
                      {label}
                    </span>
                    <span className="block truncate text-sm font-medium">
                      {value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        {/* extra bottom/right padding keeps this row clear of the floating
            WhatsApp button (fixed, bottom-right) */}
        <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-3 px-4 pt-5 pb-24 text-center text-xs text-primary-foreground/60 sm:flex-row sm:justify-between sm:pr-24 sm:pb-5 sm:text-left">
          <p>
            © {new Date().getFullYear()} Kalana Akademik. Seluruh hak cipta
            dilindungi.
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors hover:bg-primary-foreground/10 hover:text-primary-foreground"
          >
            Kembali ke atas <ArrowUpIcon className="size-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
