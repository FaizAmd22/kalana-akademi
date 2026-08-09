import { Link } from "react-router-dom";
import { MailIcon } from "lucide-react";

import { InstagramIcon } from "@/components/icons/InstagramIcon";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { useNavMenu } from "@/hooks/useNavMenu";
import { useSettings } from "@/hooks/useSettings";
import {
  DEFAULT_EMAIL,
  DEFAULT_WA_MESSAGE,
  DEFAULT_WHATSAPP_NUMBER,
} from "@/lib/constants";
import { buildWhatsappUrl } from "@/lib/whatsapp";

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

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 md:grid-cols-4">
        <div className="space-y-2">
          <p className="text-lg font-bold text-primary">Kalana Akademik</p>
          <p className="text-sm text-muted-foreground">
            Bimbingan belajar SD, SMP, SMA, persiapan UTBK, dan olimpiade sains.
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold">Navigasi</p>
          <ul className="space-y-1.5">
            {navMenu.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.href ?? item.items![0].href}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold">Tentang Kami</p>
          <ul className="space-y-1.5">
            <li>
              <Link
                to="/tentang-kami#profil"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Profil
              </Link>
            </li>
            <li>
              <Link
                to="/tentang-kami#faq"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                FAQ
              </Link>
            </li>
            <li>
              <Link
                to="/kontak"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Kontak
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold">Kontak</p>
          <ul className="space-y-1.5">
            <li>
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                <MailIcon className="size-4 shrink-0" />
                {email}
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
              >
                <WhatsAppIcon className="size-4 shrink-0" />
                {`+${whatsappNumber}`}
              </a>
            </li>
            {instagramUrl && (
              <li>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                >
                  <InstagramIcon className="size-4 shrink-0" />
                  bimbelkalana
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Kalana Akademik. Seluruh hak cipta
        dilindungi.
      </div>
    </footer>
  );
}
