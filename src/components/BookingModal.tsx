import React, { useState } from 'react';
import { X, Phone, Check, Sparkles, Clock, AlertCircle, ArrowRight } from 'lucide-react';
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
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [technique, setTechnique] = useState(initialTechnique || 'Консультация / Подбор техники');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(siteConfig.contacts.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleOpenMax = () => {
    window.open(siteConfig.contacts.maxUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
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
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#a3988a] hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c6a87d]/10 border border-[#c6a87d]/30 text-[#e5cb9b] text-xs font-medium mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            Консультация колориста
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif text-[#fdfbf7]">
            Консультация у Анны Власовой
          </h3>
          <p className="text-sm text-[#a89f91] mt-1.5 leading-relaxed">
            Отправьте фото ваших волос при дневном свете и задайте любой вопрос по технике окрашивания
          </p>
        </div>

        {/* MAX Messenger Main Button */}
        <div className="space-y-3 mb-6">
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
                  Российский мессенджер • Быстрый ответ
                </span>
              </span>
            </span>
            <span className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#9cc0ee] group-hover:translate-x-0.5 transition-transform">
              <ArrowRight className="w-4 h-4" />
            </span>
          </button>

          <div className="flex gap-2">
            <a
              href={`tel:${siteConfig.contacts.phoneClean}`}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-[#25211c] hover:bg-[#2f2a24] border border-[#3c352c] text-[#e8dfd3] text-xs sm:text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4 text-[#c6a87d]" />
              Позвонить для консультации
            </a>
            <button
              type="button"
              onClick={handleCopyPhone}
              className="px-4 py-3 rounded-2xl bg-[#25211c] hover:bg-[#2f2a24] border border-[#3c352c] text-xs font-medium text-[#c6a87d] transition-colors flex items-center gap-1.5"
            >
              {copiedPhone ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  Скопирован
                </>
              ) : (
                'Скопировать'
              )}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-5">
          <div className="border-t border-[#312c26] w-full" />
          <span className="bg-[#181614] px-3 text-xs text-[#8c8273] uppercase tracking-wider">
            или отправьте вопрос с сайта
          </span>
        </div>

        {/* Consultation Form */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmitForm} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#b3a899] mb-1.5">
                Ваше имя
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Как к вам обращаться"
                className="w-full px-4 py-2.5 rounded-xl bg-[#211e1a] border border-[#3a342c] text-[#f5f1eb] placeholder-[#736a5e] text-sm focus:outline-none focus:border-[#c6a87d]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#b3a899] mb-1.5">
                Номер телефона или контакт в MAX
              </label>
              <input
                type="text"
                required
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="+7 (___) ___-__-__ или контакт"
                className="w-full px-4 py-2.5 rounded-xl bg-[#211e1a] border border-[#3a342c] text-[#f5f1eb] placeholder-[#736a5e] text-sm focus:outline-none focus:border-[#c6a87d]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#b3a899] mb-1.5">
                Интересующая техника / Тема консультации
              </label>
              <select
                value={technique}
                onChange={(e) => setTechnique(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#211e1a] border border-[#3a342c] text-[#f5f1eb] text-sm focus:outline-none focus:border-[#c6a87d]"
              >
                <option value="Консультация / Подбор техники">Консультация / Подбор техники</option>
                {siteConfig.about.techniquesList.map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
                <option value="Исправление неудачного окрашивания">Исправление неудачного окрашивания</option>
                <option value="Выход в блонд / Блондирование">Выход в блонд / Блондирование</option>
                <option value="Окрашивание после хны">Окрашивание после хны</option>
                <option value="Холодное восстановление волос">Холодное восстановление волос</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#b3a899] mb-1.5">
                Опишите ваши волосы и пожелания
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Текущее состояние волос, красились ли хной или бытовыми красителями..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#211e1a] border border-[#3a342c] text-[#f5f1eb] placeholder-[#736a5e] text-sm focus:outline-none focus:border-[#c6a87d] resize-none"
              />
            </div>

            <div className="bg-[#24201b] border border-[#3e372e] rounded-xl p-3 flex gap-2.5 text-xs text-[#b8ad9e]">
              <AlertCircle className="w-4 h-4 text-[#c6a87d] shrink-0 mt-0.5" />
              <span>
                <strong>Бесплатная консультация:</strong> Анна ответит на ваши вопросы, подскажет подходящую технику и сориентирует по времени и результату.
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#c6a87d] to-[#deb887] text-[#121110] font-semibold text-sm hover:brightness-110 active:scale-[0.99] transition-all shadow-lg shadow-[#c6a87d]/20"
            >
              Отправить запрос на консультацию
            </button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h4 className="text-xl font-serif text-[#fdfbf7]">
              Спасибо за обращение, {name || 'запрос принят'}!
            </h4>
            <p className="text-sm text-[#b3a899] leading-relaxed">
              Анна свяжется с вами по указанному контакту <strong className="text-white">{contactInfo}</strong> для проведения консультации.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleOpenMax}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#203c66] hover:bg-[#284d82] text-white text-xs font-semibold transition-colors"
              >
                <MaxLogo className="w-4 h-4 rounded shrink-0" />
                Написать напрямую в мессенджер MAX
              </button>
            </div>
          </div>
        )}

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-[#29241e] flex items-center justify-between text-xs text-[#807667]">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[#c6a87d]" />
            {siteConfig.contacts.workingHours}
          </span>
          <span>{siteConfig.contacts.address}</span>
        </div>
      </div>
    </div>
  );
};
