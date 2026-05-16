export function buildWhatsAppUrl(phone: string, text?: string): string {
  const baseUrl = `https://wa.me/${phone.replace(/\D/g, '')}`;
  if (!text) return baseUrl;
  return `${baseUrl}?text=${encodeURIComponent(text)}`;
}
