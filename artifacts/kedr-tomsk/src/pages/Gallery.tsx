import { useEffect, useState, useCallback } from "react";
import { Link } from "wouter";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryItems, galleryCategories } from "@/data/gallery";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-in-section").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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

  // Keyboard navigation
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

  // Touch swipe
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
    acc[cat] =
      cat === "Все"
        ? galleryItems.length
        : galleryItems.filter((i) => i.category === cat).length;
    return acc;
  }, {});

  const currentItem = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-sm mb-4 text-white/70">
            <Link href="/" className="hover:text-accent transition-colors">
              Главная
            </Link>{" "}
            / Фотогалерея
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Фотогалерея проектов</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Реализованные объекты «Кедр-Томск» — дома из рубленного бревна, профилированного бруса,
            бани и беседки по всей России
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section className="border-b border-border bg-white sticky top-[64px] z-30 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {galleryCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setLightboxIdx(null); }}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-accent text-white shadow-md scale-105"
                  : "bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent"
              }`}
            >
              {cat}
              <span
                className={`text-xs px-1.5 py-0.5 rounded-full ${
                  activeCategory === cat ? "bg-white/20" : "bg-border"
                }`}
              >
                {counts[cat]}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Masonry-style gallery grid */}
      <section className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filtered.map((item, idx) => (
              <div
                key={idx}
                className="fade-in-section break-inside-avoid group cursor-pointer rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-xl transition-all duration-400 bg-white"
                style={{ transitionDelay: `${(idx % 8) * 50}ms` }}
                onClick={() => setLightboxIdx(idx)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="glass rounded-full p-3">
                      <ZoomIn className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  {/* Category badge */}
                  <div className="absolute bottom-3 left-3">
                    <span className="glass text-white text-xs px-3 py-1 rounded-full font-medium opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-foreground leading-snug group-hover:text-accent transition-colors duration-300">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              По выбранной категории объектов не найдено.
            </div>
          )}
        </div>
      </section>

      {/* Lightbox with slider */}
      {lightboxIdx !== null && currentItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center animate-scale-in"
          onClick={() => setLightboxIdx(null)}
        >
          {/* Main image container */}
          <div
            className="relative w-full max-w-5xl mx-4 flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl bg-black">
              <img
                key={lightboxIdx}
                src={currentItem.img}
                alt={currentItem.title}
                className="w-full max-h-[78vh] object-contain animate-scale-in"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = currentItem.img;
                }}
              />

              {/* Title + counter bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-5">
                <p className="text-white font-semibold text-lg leading-snug">{currentItem.title}</p>
                <p className="text-white/60 text-sm mt-0.5">{currentItem.category}</p>
              </div>

              {/* Close */}
              <button
                onClick={() => setLightboxIdx(null)}
                className="absolute top-4 right-4 w-9 h-9 glass rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Закрыть"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Navigation row */}
            <div className="flex items-center justify-between w-full mt-4 px-1">
              {/* Prev button */}
              <button
                onClick={prev}
                className="flex items-center gap-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium"
                aria-label="Предыдущее фото"
              >
                <ChevronLeft size={18} /> Предыдущее
              </button>

              {/* Counter + dots */}
              <div className="flex flex-col items-center gap-2">
                <span className="text-white/70 text-sm">
                  {lightboxIdx + 1} / {total}
                </span>
                <div className="flex gap-1.5">
                  {filtered.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setLightboxIdx(i)}
                      className={`rounded-full transition-all duration-300 ${
                        i === lightboxIdx
                          ? "w-5 h-2 bg-accent"
                          : "w-2 h-2 bg-white/30 hover:bg-white/60"
                      }`}
                      aria-label={`Фото ${i + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Next button */}
              <button
                onClick={next}
                className="flex items-center gap-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-xl transition-all duration-200 text-sm font-medium"
                aria-label="Следующее фото"
              >
                Следующее <ChevronRight size={18} />
              </button>
            </div>

            {/* Hint */}
            <p className="text-white/30 text-xs mt-3">
              ← → для навигации · Esc для закрытия · листайте пальцем
            </p>
          </div>

          {/* Side nav arrows (click zones on sides of screen) */}
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-all duration-200"
            aria-label="Предыдущее"
          >
            <ChevronLeft size={24} className="text-white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-all duration-200"
            aria-label="Следующее"
          >
            <ChevronRight size={24} className="text-white" />
          </button>
        </div>
      )}

      {/* CTA */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Хотите такой же дом?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Подберём проект под ваш бюджет и участок. Работаем по всей России.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className="inline-block bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 hover:scale-105"
            >
              Смотреть проекты
            </Link>
            <Link
              href="/contacts"
              className="inline-block glass text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 hover:bg-white/20"
            >
              Связаться с нами
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
