import React, { useState } from 'react';
import { X, Phone, Check, Sparkles, Clock, MapPin, ArrowRight } from 'lucide-react';
import { siteConfig } from '../config';
import { MaxLogo } from './MaxLogo';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTechnique?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialTechnique,
}) => {
  const [copiedPhone, setCopiedPhone] = useState(false);

  if (!isOpen) return null;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(siteConfig.contacts.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleOpenMax = () => {
    window.open(siteConfig.contacts.maxUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      id="consultation-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#181614] border border-[#38332c] rounded-3xl p-6 sm:p-8 shadow-2xl text-[#f5f1eb] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Кнопка закрытия */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#a3988a] hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Заголовок */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c6a87d]/10 border border-[#c6a87d]/30 text-[#e5cb9b] text-xs font-medium mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            Консультация колориста
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif text-[#fdfbf7]">
            Связаться с мастером
          </h3>
          <p className="text-sm text-[#a89f91] mt-2 leading-relaxed">
            Пришлите фото ваших волос при дневном свете и пожелания в мессенджер MAX или позвоните напрямую:
          </p>
          {initialTechnique && (
            <div className="inline-block mt-3 px-3 py-1 rounded-lg bg-[#24201b] border border-[#3c352a] text-xs text-[#c6a87d]">
              Выбранная техника: <span className="font-semibold text-white">{initialTechnique}</span>
            </div>
          )}
        </div>

        {/* Кнопки связи */}
        <div className="space-y-3.5">
          {/* Кнопка MAX */}
          <button
            type="button"
            onClick={handleOpenMax}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[#1c2c44] via-[#1a385c] to-[#1e293b] hover:from-[#233855] hover:to-[#223348] border border-[#38557a] text-white transition-all group shadow-lg shadow-[#1a385c]/30"
          >
            <span className="flex items-center gap-3.5">
              <MaxLogo className="w-11 h-11 rounded-2xl shadow-md group-hover:scale-105 transition-transform shrink-0" />
              <span className="text-left">
                <span className="block text-sm font-semibold text-white">
                  Написать в мессенджер MAX
                </span>
                <span className="block text-xs text-[#9cc0ee]">
                  Быстрый ответ • Онлайн-консультация по фото
                </span>
              </span>
            </span>
            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#9cc0ee] group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>

          {/* Звонок и копирование номера */}
          <div className="flex gap-2">
            <a
              href={`tel:${siteConfig.contacts.phoneClean}`}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-[#25211c] hover:bg-[#2f2a24] border border-[#3c352c] text-[#e8dfd3] text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4 text-[#c6a87d]" />
              <span>Позвонить {siteConfig.contacts.phone}</span>
            </a>
            <button
              type="button"
              onClick={handleCopyPhone}
              className="px-4 py-3.5 rounded-2xl bg-[#25211c] hover:bg-[#2f2a24] border border-[#3c352c] text-xs font-medium text-[#c6a87d] transition-colors flex items-center gap-1.5"
              title="Скопировать номер"
            >
              {copiedPhone ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Скопирован</span>
                </>
              ) : (
                'Скопировать'
              )}
            </button>
          </div>
        </div>

        {/* Адрес и часы работы */}
        <div className="mt-8 pt-4 border-t border-[#29241e] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#807667]">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#c6a87d]" />
            {siteConfig.contacts.workingHours}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#c6a87d]" />
            {siteConfig.contacts.address}
          </span>
        </div>
      </div>
    </div>
  );
};
