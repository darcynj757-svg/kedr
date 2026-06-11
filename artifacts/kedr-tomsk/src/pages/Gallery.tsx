import { useEffect, useState, useCallback } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { X, MagnifyingGlassPlus, CaretLeft, CaretRight, ArrowRight } from "@phosphor-icons/react";
import { galleryItems, galleryCategories } from "@/data/gallery";
import PageHero from "@/components/PageHero";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const filtered =
    activeCategory === "Все"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const total = filtered.length;

  const prev = useCallback(() => {
    setLightboxIdx((i) => (i === null ? null : (i - 1 + total) % total));
  }, [total]);

  const next = useCallback(() => {
    setLightboxIdx((i) => (i === null ? null : (i + 1) % total));
  }, [total]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIdx === null) return;
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIdx, prev, next]);

  useEffect(() => {
    if (lightboxIdx === null) return;
    let startX = 0;
    const onTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
    };
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchend", onTouchEnd);
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [lightboxIdx, prev, next]);

  const counts = galleryCategories.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] = cat === "Все" ? galleryItems.length : galleryItems.filter((i) => i.category === cat).length;
    return acc;
  }, {});

  const currentItem = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <div className="min-h-screen bg-background pt-20">
      <PageHero
        title="Фотогалерея проектов"
        subtitle="Реализованные объекты «Кедр-Томск» — дома из рубленого бревна, профилированного бруса, бани и беседки"
        breadcrumb="Фотогалерея"
        tag="Галерея"
        image="/images/gallery/gallery-2.jpg"
      />

      {/* Filter bar */}
      <div className="sticky top-[64px] z-30 bg-white border-b border-border shadow-sm">
        <div className="container mx-auto px-6 md:px-12 py-0">
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {galleryCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setLightboxIdx(null); }}
                className={`shrink-0 relative flex items-center gap-2 px-5 py-4 text-sm font-medium transition-all duration-200 border-b-2 ${
                  activeCategory === cat
                    ? "border-accent text-accent"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
                <span className={`text-xs px-1.5 py-0.5 font-medium ${
                  activeCategory === cat ? "text-accent" : "text-muted-foreground/60"
                }`}>
                  {counts[cat]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry grid */}
      <section className="py-12">
        <div className="container mx-auto px-6 md:px-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-px space-y-px"
            >
              {filtered.map((item, idx) => (
                <div
                  key={`${activeCategory}-${idx}`}
                  className="break-inside-avoid group cursor-pointer overflow-hidden relative"
                  onClick={() => setLightboxIdx(idx)}
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                      <MagnifyingGlassPlus size={28} weight="bold" className="text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-white text-xs font-medium">{item.title}</p>
                    <p className="text-white/60 text-xs">{item.category}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-24 text-muted-foreground">
              По выбранной категории объектов не найдено.
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && currentItem && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightboxIdx(null)}
          >
            <div
              className="relative w-full max-w-5xl mx-4 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full overflow-hidden bg-black">
                <img
                  key={lightboxIdx}
                  src={currentItem.img}
                  alt={currentItem.title}
                  className="w-full max-h-[80vh] object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-5">
                  <p className="text-white font-semibold leading-snug">{currentItem.title}</p>
                  <p className="text-white/50 text-sm mt-0.5">{currentItem.category}</p>
                </div>
                <button
                  onClick={() => setLightboxIdx(null)}
                  className="absolute top-4 right-4 w-9 h-9 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Закрыть"
                >
                  <X size={18} weight="bold" className="text-white" />
                </button>
              </div>

              <div className="flex items-center justify-between w-full mt-3 px-1">
                <button onClick={prev} className="flex items-center gap-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 text-sm transition-all">
                  <CaretLeft size={16} weight="bold" /> Назад
                </button>
                <span className="text-white/50 text-sm">{lightboxIdx + 1} / {total}</span>
                <button onClick={next} className="flex items-center gap-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 text-sm transition-all">
                  Далее <CaretRight size={16} weight="bold" />
                </button>
              </div>
              <p className="text-white/20 text-xs mt-2">← → навигация · Esc закрыть · листайте пальцем</p>
            </div>

            <button onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
              <CaretLeft size={22} weight="bold" className="text-white" />
            </button>
            <button onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all">
              <CaretRight size={22} weight="bold" className="text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="bg-[#0d1f12] text-white py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-accent" />
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Ваш проект</span>
            </div>
            <h2 className="font-light text-4xl md:text-5xl text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Хотите такой же дом?
            </h2>
            <p className="text-white/60 text-lg font-light mb-10 leading-relaxed">
              Подберём проект под ваш бюджет и участок. Работаем по всей России.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/projects" className="inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 transition-all duration-300 hover:gap-5">
                Смотреть проекты <ArrowRight size={18} weight="bold" />
              </Link>
              <Link href="/contacts" className="inline-flex items-center gap-3 border border-white/20 hover:border-white/40 text-white font-medium px-8 py-4 transition-all duration-300">
                Связаться с нами
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
