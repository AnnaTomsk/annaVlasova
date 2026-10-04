import React, { useState, useRef, useCallback, useEffect } from 'react';
import { SlidersHorizontal, Maximize2 } from 'lucide-react';
import { resolveImageUrl } from '../utils/image';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  title: string;
  aspectRatio?: string;
  onOpenFullscreen?: () => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  title,
  aspectRatio = 'aspect-[4/5]',
  onOpenFullscreen,
}) => {
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updateSliderPosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const positionPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(positionPercent);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateSliderPosition(e.clientX);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }
  };

  // Keyboard navigation support for accessibility
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div className="relative group select-none">
      {/* Container */}
      <div
        ref={containerRef}
        id={`slider-${title.replace(/\s+/g, '-').toLowerCase()}`}
        tabIndex={0}
        role="slider"
        aria-label={`Слайдер до и после для ${title}`}
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative w-full ${aspectRatio} overflow-hidden rounded-2xl cursor-ew-resize bg-[#191715] border border-[#2f2b26] shadow-xl touch-none focus:outline-none focus:ring-2 focus:ring-[#c6a87d]/50`}
      >
        {/* AFTER Image (Base layer - right side / revealed as slider moves left) */}
        <img
          src={resolveImageUrl(afterImage)}
          alt={`Результат ПОСЛЕ: ${title}`}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          loading="lazy"
          referrerPolicy="no-referrer"
        />

        {/* BEFORE Image (Overlay layer - clipped by sliderPosition from the left) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
          }}
        >
          <img
            src={resolveImageUrl(beforeImage)}
            alt={`Исходное состояние ДО: ${title}`}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Slider Divider Line */}
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#f5f1eb]/80 via-[#c6a87d] to-[#f5f1eb]/80 shadow-[0_0_12px_rgba(198,168,125,0.8)] pointer-events-none z-20"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          {/* Circular Handle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#181614] border-2 border-[#c6a87d] shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex items-center justify-center text-[#f1dfbc] transition-transform duration-150 group-hover:scale-105 active:scale-95">
            <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M8.5 7l-5 5 5 5V7zm7 0v10l5-5-5-5z" />
            </svg>
          </div>
        </div>

        {/* ДО / ПОСЛЕ Badges */}
        <div className="absolute top-3 left-3 z-10 pointer-events-none">
          <span className="inline-block px-2.5 py-1 text-[11px] font-semibold tracking-wider text-[#e6e0d8] bg-black/60 backdrop-blur-md rounded-full border border-white/10 uppercase">
            ДО
          </span>
        </div>
        <div className="absolute top-3 right-3 z-10 pointer-events-none">
          <span className="inline-block px-2.5 py-1 text-[11px] font-semibold tracking-wider text-[#181614] bg-[#f1dfbc] backdrop-blur-md rounded-full shadow-md font-bold uppercase">
            ПОСЛЕ
          </span>
        </div>

        {/* Drag Hint (fades out on interaction) */}
        {!isDragging && (
          <div className="absolute bottom-3 inset-x-0 flex justify-center z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium text-[#c6a87d] bg-black/70 backdrop-blur-md rounded-full border border-[#c6a87d]/20 transition-opacity duration-300 group-hover:opacity-90 opacity-70">
              <SlidersHorizontal className="w-3 h-3" />
              Тяните влево / вправо
            </span>
          </div>
        )}

        {/* Fullscreen Button */}
        {onOpenFullscreen && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenFullscreen();
            }}
            className="absolute bottom-3 right-3 z-20 p-2 rounded-full bg-black/60 hover:bg-[#c6a87d] text-white hover:text-black transition-colors backdrop-blur-md border border-white/10"
            title="Открыть на весь экран"
            aria-label="Открыть на весь экран"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Quick ratio controls underneath */}
      <div className="flex items-center justify-between mt-2.5 px-1 text-xs text-[#a3988a]">
        <button
          type="button"
          onClick={() => setSliderPosition(100)}
          className={`px-2 py-1 rounded hover:text-white transition-colors ${
            sliderPosition === 100 ? 'text-[#c6a87d] font-semibold' : ''
          }`}
        >
          Только До
        </button>
        <button
          type="button"
          onClick={() => setSliderPosition(50)}
          className={`px-2 py-1 rounded hover:text-white transition-colors ${
            sliderPosition === 50 ? 'text-[#c6a87d] font-semibold' : ''
          }`}
        >
          50 / 50
        </button>
        <button
          type="button"
          onClick={() => setSliderPosition(0)}
          className={`px-2 py-1 rounded hover:text-white transition-colors ${
            sliderPosition === 0 ? 'text-[#c6a87d] font-semibold' : ''
          }`}
        >
          Только После
        </button>
      </div>
    </div>
  );
};
