import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PhoneDisassemblyScroll } from './components/PhoneDisassemblyScroll';
import { ServicesSection } from './components/ServicesSection';
import { HowItWorks } from './components/HowItWorks';
import { FeedbackSection } from './components/FeedbackSection';
import { AboutSection } from './components/AboutSection';
import { QuoteForm } from './components/QuoteForm';
import { Footer } from './components/Footer';
import { FloatingWhatsAppButton } from './components/FloatingWhatsAppButton';
import { useSiteConfig } from './hooks/useSiteConfig';

export default function App() {
  const { config } = useSiteConfig();

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Header config={config} />

      <main>
        <Hero config={config} />
        <PhoneDisassemblyScroll />
        <ServicesSection />
        <HowItWorks />
        <FeedbackSection />
        <AboutSection config={config} />
        <QuoteForm config={config} />
      </main>

      <Footer config={config} />
      <FloatingWhatsAppButton config={config} />
    </div>
  );
}
