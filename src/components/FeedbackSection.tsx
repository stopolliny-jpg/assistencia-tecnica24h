import { useState } from 'react';
import { Play, Star, X } from 'lucide-react';
import { useFeedbacks } from '../hooks/useFeedbacks';
import { LoadingSpinner } from './ui/LoadingSpinner';
import type { Feedback } from '../types';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          className={i <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}
        />
      ))}
    </div>
  );
}

function PlaceholderCard({ index }: { index: number }) {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
      <div className="aspect-[3/4] bg-white/5 flex flex-col items-center justify-center gap-4 p-6">
        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
          <Play size={20} className="text-white/30" />
        </div>
        <div className="text-center">
          <p className="text-white/30 text-sm font-medium">Em breve,</p>
          <p className="text-white/20 text-sm">avaliação em vídeo.</p>
        </div>
        <div className="flex gap-0.5">
          {[1,2,3,4,5].map(i => (
            <Star key={i} size={12} className="text-white/10" />
          ))}
        </div>
      </div>
      <div className="p-4 border-t border-white/5">
        <div className="h-3 bg-white/10 rounded-full w-3/4 mb-2" />
        <div className="h-2 bg-white/5 rounded-full w-1/2" />
      </div>
      {/* Shimmer effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.02) 50%, transparent 60%)',
          backgroundSize: '200% 100%',
          animation: `shimmer ${2 + index * 0.4}s linear infinite`,
        }}
      />
    </div>
  );
}

function FeedbackCard({ feedback }: { feedback: Feedback }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden group hover:border-white/20 transition-all duration-300">
        {/* Thumbnail / video area */}
        <div className="aspect-[3/4] relative bg-[#0a0a0c] overflow-hidden">
          {feedback.thumbnailUrl ? (
            <img
              src={feedback.thumbnailUrl}
              alt={`Feedback de ${feedback.clientName}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-apple-blue/10 to-black">
              <Play size={32} className="text-apple-neon/50" />
            </div>
          )}

          {/* Play button overlay */}
          {feedback.videoUrl && (
            <button
              onClick={() => setModalOpen(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-all duration-300"
              aria-label={`Assistir depoimento de ${feedback.clientName}`}
            >
              <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-90 group-hover:scale-100">
                <Play size={20} className="text-white fill-white ml-1" />
              </div>
            </button>
          )}

          {/* Rating overlay */}
          {feedback.rating > 0 && (
            <div className="absolute top-3 right-3">
              <div className="bg-black/60 backdrop-blur-sm rounded-full px-2.5 py-1.5">
                <StarRating rating={feedback.rating} />
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-white font-semibold text-sm mb-1">{feedback.clientName}</p>
          {feedback.description && (
            <p className="text-white/50 text-xs leading-relaxed line-clamp-2">
              {feedback.description}
            </p>
          )}
        </div>
      </div>

      {/* Video modal */}
      {modalOpen && feedback.videoUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
              aria-label="Fechar vídeo"
            >
              <X size={24} />
            </button>
            <video
              src={feedback.videoUrl}
              controls
              autoPlay
              className="w-full rounded-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}

export function FeedbackSection() {
  const { feedbacks, loading } = useFeedbacks();

  return (
    <section id="feedback" className="py-24 lg:py-32 bg-black relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-apple-neon text-sm font-semibold tracking-widest uppercase mb-4">
            Clientes satisfeitos
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Feedback dos Clientes
          </h2>
          <p className="text-white/50 text-lg max-w-md mx-auto">
            Veja o que nossos clientes dizem após o atendimento.
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : feedbacks.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {feedbacks.map((feedback) => (
              <FeedbackCard key={feedback.id} feedback={feedback} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <PlaceholderCard key={i} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
