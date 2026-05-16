import { useState, useEffect } from 'react';
import type { SiteConfig } from '../types';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface FloatingWhatsAppButtonProps {
  config: SiteConfig;
}

export function FloatingWhatsAppButton({ config }: FloatingWhatsAppButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <a
      href={buildWhatsAppUrl(config.whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chamar no WhatsApp"
      className={`
        fixed bottom-6 right-6 z-40
        w-14 h-14 rounded-full bg-[#25D366] shadow-xl shadow-[#25D366]/30
        flex items-center justify-center
        hover:scale-110 hover:shadow-2xl hover:shadow-[#25D366]/40
        transition-all duration-300
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
      style={{ transition: 'opacity 0.5s ease, transform 0.5s ease, scale 0.2s ease, box-shadow 0.2s ease' }}
    >
      {/* Ping animation */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
      <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white relative z-10">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.12.554 4.11 1.523 5.834L.057 23.43a.5.5 0 00.601.582l5.77-1.513A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.518-5.16-1.42l-.368-.22-3.823 1.003 1.02-3.728-.24-.38A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
      </svg>
    </a>
  );
}
