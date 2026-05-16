import React from 'react';
import { Apple, Instagram, MessageCircle, MapPin, Clock } from 'lucide-react';
import type { SiteConfig } from '../types';

interface FooterProps {
  config: SiteConfig;
}

export function Footer({ config }: FooterProps) {
  return (
    <footer className="bg-black pt-20 pb-10 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-white text-black rounded-lg flex items-center justify-center">
                <Apple size={20} />
              </div>
              <span className="text-lg font-bold text-white">{config.businessName}</span>
            </div>
            <p className="text-white/40 leading-relaxed mb-6">
              Assistência técnica premium especializada em iPhones no Capão Redondo. Seu aparelho em mãos de especialistas.
            </p>
            <div className="flex gap-4">
              <a href={`https://instagram.com/${config.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-apple-blue transition-all">
                <Instagram size={20} />
              </a>
              <a href={`https://wa.me/${config.whatsapp}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:bg-apple-blue transition-all">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Serviços</h4>
            <ul className="space-y-4">
              <li><a href="#servicos" className="text-white/40 hover:text-white transition-colors">Troca de Tela</a></li>
              <li><a href="#servicos" className="text-white/40 hover:text-white transition-colors">Troca de Bateria</a></li>
              <li><a href="#servicos" className="text-white/40 hover:text-white transition-colors">Reparo de Placa</a></li>
              <li><a href="#servicos" className="text-white/40 hover:text-white transition-colors">Limpeza Interna</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Contato</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-white/40">
                <MapPin size={18} className="text-apple-neon shrink-0 mt-1" />
                <span>{config.location}</span>
              </li>
              <li className="flex items-center gap-3 text-white/40">
                <MessageCircle size={18} className="text-apple-neon shrink-0" />
                <span>{config.displayWhatsapp}</span>
              </li>
              <li className="flex items-start gap-3 text-white/40">
                <Clock size={18} className="text-apple-neon shrink-0 mt-1" />
                <span>{config.workingHours}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Navegação</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-white/40 hover:text-white transition-colors">Início</a></li>
              <li><a href="#como-funciona" className="text-white/40 hover:text-white transition-colors">Como funciona</a></li>
              <li><a href="#feedback" className="text-white/40 hover:text-white transition-colors">Avaliações</a></li>
              <li><a href="#orcamento" className="text-white/40 hover:text-white transition-colors">Pedir Orçamento</a></li>
            </ul>
          </div>

        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/20 text-sm">
            © {new Date().getFullYear()} {config.businessName}. Todos os direitos reservados.
          </p>
          <div className="flex gap-8">
            <span className="text-white/20 text-xs tracking-widest uppercase">Premium Service</span>
            <span className="text-white/20 text-xs tracking-widest uppercase">São Paulo, SP</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
