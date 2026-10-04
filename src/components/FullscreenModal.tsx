import React from 'react';
import { X, Sparkles, MessageCircle } from 'lucide-react';
import { PortfolioItem } from '../config';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface FullscreenModalProps {
  work: PortfolioItem | null;
  onClose: () => void;
  onBook: (technique: string) => void;
}

export const FullscreenModal: React.FC<FullscreenModalProps> = ({
  work,
  onClose,
  onBook,
}) => {
  if (!work) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#181614] border border-[#38332c] rounded-3xl p-5 sm:p-8 shadow-2xl text-[#f5f1eb] max-h-[95vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-white/20 text-[#d6ccc2] hover:text-white transition-colors"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Slider */}
          <div className="lg:col-span-7">
            <BeforeAfterSlider
              beforeImage={work.beforeImage}
              afterImage={work.afterImage}
              title={work.title}
              aspectRatio="aspect-[4/5] sm:aspect-[3/4]"
            />
          </div>

          {/* Details */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c6a87d]/15 border border-[#c6a87d]/30 text-[#e5cb9b] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#c6a87d]" />
              {work.technique}
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif text-[#fefdfb] leading-tight">
              {work.title}
            </h3>

            <p className="text-sm text-[#b8ad9e] leading-relaxed">
              {work.description}
            </p>

            {work.duration && (
              <div className="flex items-center gap-2 text-xs text-[#9c9080]">
                <span className="text-[#c6a87d] font-medium">Время работы:</span>
                <span>{work.duration}</span>
              </div>
            )}

            {work.notes && (
              <div className="p-3.5 rounded-xl bg-[#221f1a] border border-[#383229] text-xs text-[#d1c6b6]">
                <span className="text-[#c6a87d] font-semibold block mb-1">Детали процедуры:</span>
                {work.notes}
              </div>
            )}

            {work.tags && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-[#26221c] text-[#a89e8e] border border-[#383228]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="pt-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBook(work.technique);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-[#c6a87d] to-[#dfba88] text-[#121110] font-semibold text-sm hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-[#c6a87d]/15"
              >
                <MessageCircle className="w-4 h-4" />
                Консультация по этой технике
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
