import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  ChevronDown,
  Phone,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Heart,
  Award,
  ArrowRight,
  SlidersHorizontal,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';
import { siteConfig, PortfolioItem } from './config';
import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { BookingModal } from './components/BookingModal';
import { FullscreenModal } from './components/FullscreenModal';
import { MaxLogo } from './components/MaxLogo';

export default function App() {
  const [selectedFilter, setSelectedFilter] = useState<string>('все');
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [bookingTechnique, setBookingTechnique] = useState<string>('');
  const [fullscreenWork, setFullscreenWork] = useState<PortfolioItem | null>(null);

  // Filter categories with clean labels that wrap perfectly on mobile and PC
  const filterCategories = [
    { id: 'все', label: 'Все работы', key: '' },
    { id: 'эйртач', label: 'Эйртач', key: 'эйртач' },
    { id: 'шатуш', label: 'Шатуш', key: 'шатуш' },
    { id: 'бразильский блонд', label: 'Бразильский блонд', key: 'бразильск' },
    { id: 'контуринг', label: 'Контуринг у лица', key: 'контуринг' },
    { id: 'микромелирование', label: 'Микромелирование', key: 'мелирование' },
    { id: 'тонирование', label: 'Сложное тонирование', key: 'тонирование' },
  ];

  const filteredWorks = selectedFilter === 'все'
    ? siteConfig.works
    : siteConfig.works.filter((w) => {
        const cat = filterCategories.find((c) => c.id === selectedFilter);
        const search = (cat ? cat.key : selectedFilter).toLowerCase();
        return (
          w.technique.toLowerCase().includes(search) ||
          w.title.toLowerCase().includes(search) ||
          w.description.toLowerCase().includes(search)
        );
      });

  const handleOpenConsultation = (techniqueName?: string) => {
    setBookingTechnique(techniqueName || 'Консультация / Подбор техники');
    setIsBookingOpen(true);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#121110] text-[#f5f1eb] selection:bg-[#c6a87d]/30 selection:text-white relative overflow-x-hidden">
      {/* Decorative background glow accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-[#c6a87d]/10 via-[#9d7d4f]/5 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[800px] right-0 w-[500px] h-[500px] bg-[#aa8b60]/5 blur-[120px] pointer-events-none -z-10" />

      {/* Top Floating Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#141211]/85 backdrop-blur-md border-b border-[#29241e]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a
            href="#hero"
            className="flex items-center gap-2.5 text-left group"
          >
            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#c6a87d] to-[#876c47] flex items-center justify-center text-xs font-serif font-bold text-[#121110] group-hover:scale-105 transition-transform shadow-md">
              АВ
            </span>
            <div>
              <span className="block font-serif text-lg tracking-wide font-semibold text-[#fbf8f3] leading-none">
                Анна Власова
              </span>
              <span className="block text-[10px] text-[#a89d8d] uppercase tracking-widest mt-0.5">
                колорист
              </span>
            </div>
          </a>

          <nav className="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={() => scrollToSection('works')}
              className="text-xs sm:text-sm text-[#d4cbbe] hover:text-[#e5cb9b] px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
            >
              Мои работы
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="text-xs sm:text-sm text-[#d4cbbe] hover:text-[#e5cb9b] px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors"
            >
              Обо мне
            </button>
            <button
              type="button"
              onClick={() => handleOpenConsultation()}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full bg-[#c6a87d] text-[#121110] hover:bg-[#d4b37f] transition-all shadow-md shadow-[#c6a87d]/20 active:scale-95"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Консультация
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-16 sm:space-y-24">
        {/* =========================================================================
            1. HERO SECTION (Анна Власова, колорист, кнопка Мои работы, кнопка Консультация)
            ========================================================================= */}
        <section
          id="hero"
          className="pt-6 sm:pt-12 pb-8 text-center flex flex-col items-center justify-center relative"
        >
          {/* Subtle Master Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#201d19] border border-[#383229] text-[#d4b37f] text-xs font-medium mb-6 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c6a87d]" />
            <span>{siteConfig.about.badge}</span>
          </motion.div>

          {/* Main Title: Анна Власова */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif tracking-tight text-[#fdfbf7] mb-2 sm:mb-4"
          >
            {siteConfig.master.name}
          </motion.h1>

          {/* Subtitle: колорист */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl font-light text-[#c6a87d] uppercase tracking-[0.25em] mb-4 sm:mb-6"
          >
            {siteConfig.master.profession}
          </motion.div>

          {/* Tagline / Key Promise */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="max-w-2xl text-sm sm:text-base md:text-lg text-[#b8ad9e] leading-relaxed mb-8 px-4 font-light"
          >
            {siteConfig.about.intro}
          </motion.p>

          {/* Requested Buttons:
              1. "Мои работы"
              2. "Консультация" (ниже / рядом адаптивно)
          */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md px-2"
          >
            {/* Button 1: Мои работы */}
            <button
              type="button"
              id="btn-my-works"
              onClick={() => scrollToSection('works')}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#23201b] hover:bg-[#2c2822] border border-[#423a2f] hover:border-[#c6a87d]/50 text-[#f5f1eb] font-semibold text-base transition-all shadow-lg hover:shadow-[#c6a87d]/10 active:scale-95 group"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#c6a87d] group-hover:rotate-12 transition-transform" />
              <span>Мои работы</span>
              <ArrowRight className="w-4 h-4 text-[#a3988a] group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Button 2: Консультация */}
            <button
              type="button"
              id="btn-consult-hero"
              onClick={() => handleOpenConsultation()}
              className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#c6a87d] via-[#d4b37f] to-[#deb887] text-[#121110] font-bold text-base hover:brightness-110 transition-all shadow-xl shadow-[#c6a87d]/25 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-[#121110]" />
              <span>Консультация</span>
            </button>
          </motion.div>

          {/* MAX Messenger link bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 text-xs text-[#a89d8d]"
          >
            <a
              href={siteConfig.contacts.maxUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#1b253b]/90 hover:bg-[#23314d] border border-[#3b5482]/60 text-white transition-all shadow-md hover:shadow-[#3d56fb]/20 group"
            >
              <MaxLogo className="w-5 h-5 rounded-md shrink-0 group-hover:scale-105 transition-transform" />
              <span className="font-medium text-white group-hover:underline">Написать в мессенджер MAX</span>
            </a>
            <span className="text-[#3a342b] hidden sm:inline">•</span>
            <a
              href={`tel:${siteConfig.contacts.phoneClean}`}
              className="flex items-center gap-1.5 hover:text-[#f5f1eb] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#c6a87d]" />
              {siteConfig.contacts.phone}
            </a>
          </motion.div>
        </section>

        {/* =========================================================================
            2. ОБО МНЕ SECTION (Ниже кнопок, с точным текстом из запроса пользователя)
            ========================================================================= */}
        <section
          id="about"
          className="scroll-mt-24 pt-4"
        >
          <div className="bg-gradient-to-b from-[#181614] to-[#141211] border border-[#2d2822] rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Subtle glow edge */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#c6a87d]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto space-y-8">
              {/* Header: Обо мне: */}
              <div className="border-b border-[#2d2822] pb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c6a87d]/10 border border-[#c6a87d]/20 text-[#d4b37f] text-xs font-semibold uppercase tracking-wider mb-3">
                  <Sparkles className="w-3 h-3 text-[#c6a87d]" />
                  О мастере
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#fdfbf7] mb-2">
                  {siteConfig.about.headline}
                </h2>
                <p className="text-lg sm:text-xl font-medium text-[#c6a87d]">
                  {siteConfig.about.badge}
                </p>
                <p className="text-sm sm:text-base text-[#b0a595] mt-1.5">
                  {siteConfig.about.intro}
                </p>
              </div>

              {/* Exact user text in structured, readable, elegant cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {/* Left column: Философия & подход */}
                <div className="space-y-3.5 bg-[#1e1a16]/60 border border-[#342e26] rounded-2xl p-5 sm:p-6">
                  <h3 className="text-base font-semibold text-[#f1dfbc] flex items-center gap-2">
                    <Heart className="w-4 h-4 text-[#c6a87d]" />
                    Индивидуальный подход к каждому волосу
                  </h3>
                  <ul className="space-y-3 text-sm text-[#d6ccc0] leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#c6a87d] font-bold mt-0.5">•</span>
                      <span>Люблю и умею делать шикарно самые сложные техники окрашивания волос!</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#c6a87d] font-bold mt-0.5">•</span>
                      <span>Работаю в любых техниках осветления, блондирования и тонирования.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#c6a87d] font-bold mt-0.5">•</span>
                      <span>Превращу вас в блондинку легко, надёжно, красиво, долговременно.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#c6a87d] font-bold mt-0.5">•</span>
                      <span><strong>Работаю с любыми волосами. Даже после хны 😊</strong></span>
                    </li>
                  </ul>
                </div>

                {/* Right column: Качество & безопасность */}
                <div className="space-y-3.5 bg-[#1e1a16]/60 border border-[#342e26] rounded-2xl p-5 sm:p-6">
                  <h3 className="text-base font-semibold text-[#f1dfbc] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#c6a87d]" />
                    Бережные технологии & стойкость
                  </h3>
                  <ul className="space-y-3 text-sm text-[#d6ccc0] leading-relaxed">
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#c6a87d] font-bold mt-0.5">•</span>
                      <span>В работе использую только щадящую осветляющую пасту и ухаживающие тонирующие краски.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#c6a87d] font-bold mt-0.5">•</span>
                      <span>При желании делаем после процедуры дополнительное холодное восстановление.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#c6a87d] font-bold mt-0.5">•</span>
                      <span>Осветляю волосы на премиум блондоранах — даже после осветления волосы живые!</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#c6a87d] font-bold mt-0.5">•</span>
                      <span>Максимально сохраняю качество волос, в том числе во время блондирования.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-[#c6a87d] font-bold mt-0.5">•</span>
                      <span>Сделаю вам дорогое окрашивание в сложной технике так, что можно потом <strong>до 12 месяцев вообще не подкрашивать корни 🤗</strong></span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Exact list of techniques from the user request with red markers 🔴 */}
              <div className="bg-[#1c1814] border border-[#362f26] rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif text-[#fefdfb]">
                      {siteConfig.about.techniquesTitle}
                    </h3>
                    <p className="text-xs text-[#a89d8d] mt-1">
                      Каждая техника подбирается индивидуально под структуру и историю ваших волос
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleOpenConsultation()}
                    className="self-start sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#c6a87d]/15 hover:bg-[#c6a87d]/25 border border-[#c6a87d]/40 text-[#f1dfbc] text-xs font-semibold transition-colors"
                  >
                    Подобрать технику
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {siteConfig.about.techniquesList.map((techniqueName, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleOpenConsultation(techniqueName)}
                      className="flex items-center gap-3 p-3.5 rounded-xl bg-[#231f1a] hover:bg-[#2c2620] border border-[#342e26] hover:border-[#c6a87d]/40 transition-all cursor-pointer group"
                    >
                      <span className="text-red-500 text-sm shrink-0 drop-shadow-[0_0_6px_rgba(239,68,68,0.5)]">
                        🔴
                      </span>
                      <span className="text-sm text-[#ece4d8] font-medium group-hover:text-white transition-colors">
                        {techniqueName}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Three Key Guarantees */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                {siteConfig.about.guarantees.map((g, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-[#181512] border border-[#2d2822] text-center sm:text-left space-y-1.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#c6a87d]/15 text-[#e5cb9b] flex items-center justify-center mx-auto sm:mx-0">
                      {i === 0 ? <ShieldCheck className="w-4 h-4" /> : i === 1 ? <Sparkles className="w-4 h-4" /> : <Award className="w-4 h-4" />}
                    </div>
                    <h4 className="text-sm font-semibold text-[#f8f5ee]">
                      {g.title}
                    </h4>
                    <p className="text-xs text-[#a3988a] leading-relaxed">
                      {g.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3. МОИ РАБОТЫ (Интерактивные слайдеры До/После из config.ts)
            ========================================================================= */}
        <section
          id="works"
          className="scroll-mt-24 space-y-8"
        >
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c6a87d]/10 border border-[#c6a87d]/20 text-[#d4b37f] text-xs font-semibold uppercase tracking-wider">
              <SlidersHorizontal className="w-3 h-3 text-[#c6a87d]" />
              Портфолио
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#fdfbf7]">
              Мои работы
            </h2>
            <p className="text-sm sm:text-base text-[#a89d8d] leading-relaxed">
              Потяните слайдер на любой фотографии влево или вправо, чтобы увидеть исходное состояние волос <strong>ДО</strong> и преображение <strong>ПОСЛЕ</strong>.
            </p>
          </div>

          {/* Filter Chips: flex-wrap ensures all buttons are fully visible without horizontal clipping */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-3xl mx-auto px-2">
            {filterCategories.map((cat) => {
              const isActive = selectedFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedFilter(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-[#c6a87d] text-[#121110] font-semibold shadow-md shadow-[#c6a87d]/20 scale-105'
                      : 'bg-[#1e1b17] hover:bg-[#28241e] text-[#c4b9aa] hover:text-[#f2ede4] border border-[#332d25] hover:border-[#c6a87d]/40'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Works Grid with Before/After sliders */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <AnimatePresence>
              {filteredWorks.map((work, index) => (
                <motion.article
                  key={work.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-[#181614] border border-[#2e2923] rounded-3xl p-4 sm:p-5 flex flex-col justify-between shadow-xl hover:border-[#c6a87d]/40 transition-colors group"
                >
                  {/* Interactive Before-After Slider Component */}
                  <div className="mb-4">
                    <BeforeAfterSlider
                      beforeImage={work.beforeImage}
                      afterImage={work.afterImage}
                      title={work.title}
                      aspectRatio="aspect-[4/5]"
                      onOpenFullscreen={() => setFullscreenWork(work)}
                    />
                  </div>

                  {/* Work Description & Actions */}
                  <div className="space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[11px] font-semibold tracking-wider px-2.5 py-0.5 rounded-full bg-[#c6a87d]/15 text-[#e5cb9b] border border-[#c6a87d]/30">
                          {work.technique}
                        </span>
                        {work.duration && (
                          <span className="text-[11px] text-[#8c8172] flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#c6a87d]" />
                            {work.duration}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-serif font-semibold text-[#fefdfb] group-hover:text-[#f1dfbc] transition-colors leading-snug">
                        {work.title}
                      </h3>

                      <p className="text-xs text-[#a69b8c] mt-1.5 leading-relaxed line-clamp-3">
                        {work.description}
                      </p>
                    </div>

                    {/* Action button: Консультация */}
                    <div className="pt-3 border-t border-[#29241e] flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenConsultation(work.technique)}
                        className="flex-1 py-2.5 px-3.5 rounded-xl bg-[#231f1a] hover:bg-[#c6a87d] text-[#e3dad0] hover:text-[#121110] border border-[#383228] hover:border-[#c6a87d] font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Консультация
                      </button>
                      <button
                        type="button"
                        onClick={() => setFullscreenWork(work)}
                        className="p-2.5 rounded-xl bg-[#231f1a] hover:bg-white/10 text-[#a3988a] hover:text-white border border-[#383228] transition-colors"
                        title="Подробнее о работе"
                        aria-label="Подробнее о работе"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {/* Helper note for config.ts */}
          
        </section>

        {/* =========================================================================
            4. БЛОК КОНСУЛЬТАЦИИ И КОНТАКТОВ ВНИЗУ (только мессенджер MAX)
            ========================================================================= */}
        <section
          id="contacts"
          className="bg-gradient-to-br from-[#1c1915] via-[#171512] to-[#12100e] border border-[#332d25] rounded-3xl p-6 sm:p-12 text-center relative overflow-hidden shadow-2xl"
        >
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c6a87d]/15 text-[#e5cb9b] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#c6a87d]" />
              Бесплатная онлайн-консультация
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#fdfbf7]">
              Нужна консультация по цвету?
            </h2>

            <p className="text-sm sm:text-base text-[#b0a595] leading-relaxed">
              Напишите мне в мессенджер <strong>MAX</strong> — пришлите фото ваших волос при дневном свете и пожелания. Я сориентирую по подходящей технике, состоянию волос и длительности процедуры!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <a
                href={siteConfig.contacts.maxUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#2054d4] via-[#3d50ec] to-[#7335f6] hover:brightness-110 text-white font-semibold text-sm transition-all active:scale-95 shadow-xl shadow-[#3d50ec]/30 border border-[#5d6ef7]"
              >
                <MaxLogo className="w-6 h-6 rounded-lg shrink-0 shadow-md" />
                <span>Написать в мессенджер MAX</span>
                <ArrowRight className="w-4 h-4 text-white/90" />
              </a>

              <button
                type="button"
                onClick={() => handleOpenConsultation()}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#25211c] hover:bg-[#302a24] text-[#e8dfd3] border border-[#3e372e] font-semibold text-sm transition-all active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-[#c6a87d]" />
                Задать вопрос с сайта
              </button>
            </div>

            <div className="pt-6 border-t border-[#29241e] flex flex-wrap items-center justify-center gap-6 text-xs text-[#8c8172]">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#c6a87d]" />
                <a href={`tel:${siteConfig.contacts.phoneClean}`} className="hover:text-white transition-colors">
                  {siteConfig.contacts.phone}
                </a>
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#c6a87d]" />
                {siteConfig.contacts.address}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#c6a87d]" />
                {siteConfig.contacts.workingHours}
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#26221c] bg-[#0e0d0c] py-8 text-center text-xs text-[#706657]">
        <div className="max-w-6xl mx-auto px-4 space-y-2">
          <p className="font-serif text-[#a89d8d] text-sm">
            {siteConfig.master.name} — {siteConfig.master.profession}
          </p>
          <p>
            Авторские сложные техники окрашивания • Бережный блонд • Сохранение качества волос
          </p>
          <p className="text-[11px] text-[#554e42] pt-2">
            Связь через российский мессенджер MAX • © {new Date().getFullYear()} {siteConfig.master.name}
          </p>
        </div>
      </footer>

      {/* Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialTechnique={bookingTechnique}
      />

      <FullscreenModal
        work={fullscreenWork}
        onClose={() => setFullscreenWork(null)}
        onBook={(tech) => handleOpenConsultation(tech)}
      />
    </div>
  );
}
