export function buildWhatsAppUrl(phone: string, message?: string): string {
  const encodedMessage = message ? encodeURIComponent(message) : '';
  return `https://wa.me/${phone}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
}

export function formatWhatsApp(raw: string): string {
  return raw.replace(/\D/g, '');
}
