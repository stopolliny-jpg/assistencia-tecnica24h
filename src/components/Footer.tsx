import { MapPin, Clock, Instagram } from 'lucide-react';
import type { SiteConfig } from '../types';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface FooterProps {
  config: SiteConfig;
}

export function Footer({ config }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] border-t border-white/10 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-apple-blue to-apple-neon flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                </svg>
              </div>
              <span className="font-bold text-white">{config.businessName}</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              Especialistas em iPhones com atendimento 24h, diagnóstico transparente e 90 dias de
              garantia.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">
              Contato
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href={buildWhatsAppUrl(config.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-white/50 hover:text-[#25D366] transition-colors text-sm group"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0 group-hover:scale-110 transition-transform">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.12.554 4.11 1.523 5.834L.057 23.43a.5.5 0 00.601.582l5.77-1.513A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.518-5.16-1.42l-.368-.22-3.823 1.003 1.02-3.728-.24-.38A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
                </svg>
                WhatsApp: {config.displayWhatsapp}
              </a>
              <a
                href={`https://instagram.com/${config.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-white/50 hover:text-pink-400 transition-colors text-sm group"
              >
                <Instagram size={16} className="flex-shrink-0 group-hover:scale-110 transition-transform" />
                {config.instagram}
              </a>
            </div>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide uppercase">
              Informações
            </h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2.5 text-white/50 text-sm">
                <MapPin size={16} className="flex-shrink-0 text-apple-neon" />
                {config.location}
              </div>
              <div className="flex items-center gap-2.5 text-white/50 text-sm">
                <Clock size={16} className="flex-shrink-0 text-apple-blue" />
                {config.workingHours}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-sm">
            © {year} {config.businessName}. Todos os direitos reservados.
          </p>
          <p className="text-white/20 text-xs">
            Desenvolvido com tecnologia premium
          </p>
        </div>
      </div>
    </footer>
  );
}
