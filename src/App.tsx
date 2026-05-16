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
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { useScrollReveal } from './hooks/useScrollReveal';

function App() {
  const { config, loading } = useSiteConfig();
  useScrollReveal();

  if (loading) {
    return (
      <div className="h-screen w-full bg-black flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <main className="bg-black min-h-screen text-white selection:bg-apple-blue/30">
      <Header config={config} />
      
      <Hero config={config} />
      
      <PhoneDisassemblyScroll />
      
      <ServicesSection />
      
      <HowItWorks />
      
      <FeedbackSection />
      
      <AboutSection config={config} />
      
      <QuoteForm config={config} />
      
      <Footer config={config} />
      
      <FloatingWhatsAppButton whatsapp={config.whatsapp} />
    </main>
  );
}

export default App;
