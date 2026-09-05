import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { useSettings } from "@/hooks/useSettings";
import { DEFAULT_WA_MESSAGE, DEFAULT_WHATSAPP_NUMBER } from "@/lib/constants";
import { buildWhatsappUrl } from "@/lib/whatsapp";

export function WhatsAppFloatButton() {
  const { data: settings } = useSettings();

  const number = settings?.whatsappNumber ?? DEFAULT_WHATSAPP_NUMBER;
  const message = settings?.defaultWaMessage ?? DEFAULT_WA_MESSAGE;
  const url = buildWhatsappUrl(number, message);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
    >
      <WhatsAppIcon className="size-7" />
      <span className="sr-only">Chat lewat WhatsApp</span>
    </a>
  );
}
