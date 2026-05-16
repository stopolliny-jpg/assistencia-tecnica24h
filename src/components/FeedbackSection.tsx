import { useEffect, useState } from 'react';
import { Play, Star } from 'lucide-react';
import { getFeedbacks } from '../services/feedbacks';
import type { Feedback } from '../types';

export function FeedbackSection() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getFeedbacks();
      setFeedbacks(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <section id="feedback" className="py-24 lg:py-32 bg-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 motion-reveal">
          <h2 className="section-title motion-title">Feedback dos Clientes</h2>
          <p className="section-subtitle">O que dizem sobre nossa agilidade e transparência.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 motion-card-group">
            {[1, 2, 3].map((i) => (
              <div key={i} className="glass-card h-[400px] animate-shimmer bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%] motion-card" />
            ))}
          </div>
        ) : feedbacks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 motion-card-group">
            {feedbacks.map((fb) => (
              <div key={fb._id} className="glass-card glass-card-hover overflow-hidden group motion-card">
                <div className="aspect-[9/16] relative bg-zinc-900 flex items-center justify-center">
                  {fb.thumbnailUrl ? (
                    <img 
                      src={fb.thumbnailUrl} 
                      alt={fb.clientName} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="text-white/10 italic">Em breve, avaliação em vídeo.</div>
                  )}
                  
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  
                  <a 
                    href={fb.videoUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-apple-blue rounded-full flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform"
                  >
                    <Play size={24} fill="currentColor" />
                  </a>

                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < fb.rating ? "#00d4ff" : "none"} stroke={i < fb.rating ? "#00d4ff" : "#444"} />
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-white">{fb.clientName}</h3>
                    <p className="text-white/60 text-sm line-clamp-2">{fb.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass-card motion-reveal">
            <p className="text-white/40 italic">Em breve, avaliação em vídeo.</p>
          </div>
        )}
      </div>
    </section>
  );
}
