import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppButtonProps {
  whatsapp: string;
}

export function FloatingWhatsAppButton({ whatsapp }: FloatingWhatsAppButtonProps) {
  return (
    <a
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-[90] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all animate-bounce"
      aria-label="Falar no WhatsApp"
      style={{ animationDuration: '3s' }}
    >
      <MessageCircle size={32} fill="currentColor" stroke="none" />
      <span className="absolute -top-1 -right-1 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
      </span>
    </a>
  );
}
