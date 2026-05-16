import React, { useState, useEffect } from 'react';
import { Menu, X, Apple } from 'lucide-react';
import { Button } from './ui/Button';
import type { SiteConfig } from '../types';

interface HeaderProps {
  config: SiteConfig;
}

export function Header({ config }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Início', href: '#' },
    { name: 'Serviços', href: '#servicos' },
    { name: 'Como funciona', href: '#como-funciona' },
    { name: 'Feedback', href: '#feedback' },
    { name: 'Sobre', href: '#sobre' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled ? 'py-4 bg-black/80 backdrop-blur-xl border-b border-white/5' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
            <Apple size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white hidden sm:block">
            {config.businessName}
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden lg:block">
          <a href={`https://wa.me/${config.whatsapp}`} target="_blank" rel="noreferrer">
            <Button size="sm" variant="secondary">
              WhatsApp
            </Button>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-black z-[-1] flex flex-col items-center justify-center gap-8 transition-all duration-500 ${
        mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none translate-y-full'
      }`}>
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href}
            onClick={() => setMobileMenuOpen(false)}
            className="text-3xl font-bold text-white/80 hover:text-white"
          >
            {link.name}
          </a>
        ))}
        <div className="mt-8">
          <a href="#orcamento" onClick={() => setMobileMenuOpen(false)}>
            <Button>Solicitar Orçamento</Button>
          </a>
        </div>
      </div>
    </header>
  );
}
