import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/Button';
import type { SiteConfig } from '../types';
import { buildWhatsAppUrl } from '../utils/whatsapp';

interface HeaderProps {
  config: SiteConfig;
}

const navLinks = [
  { label: 'Início', href: '#inicio' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Feedback', href: '#feedback' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Orçamento', href: '#orcamento' },
];

export function Header({ config }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-apple-blue to-apple-neon flex items-center justify-center shadow-lg shadow-apple-blue/30">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            </div>
            <div>
              <span className="font-bold text-white text-sm leading-tight block">
                {config.businessName}
              </span>
              <span className="text-apple-neon text-xs font-medium">{config.warranty}</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <Button
              variant="whatsapp"
              size="sm"
              onClick={() => window.open(buildWhatsAppUrl(config.whatsapp), '_blank')}
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.12.554 4.11 1.523 5.834L.057 23.43a.5.5 0 00.601.582l5.77-1.513A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.65-.518-5.16-1.42l-.368-.22-3.823 1.003 1.02-3.728-.24-.38A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
              </svg>
              Chamar no WhatsApp
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left px-4 py-3 text-base font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 pb-1">
              <Button
                variant="whatsapp"
                size="md"
                className="w-full"
                onClick={() => {
                  setMenuOpen(false);
                  window.open(buildWhatsAppUrl(config.whatsapp), '_blank');
                }}
              >
                Chamar no WhatsApp
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
