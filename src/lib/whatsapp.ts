export function buildWhatsappUrl(phoneNumber: string, message: string) {
  const digits = phoneNumber.replace(/\D/g, "")
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`
}
