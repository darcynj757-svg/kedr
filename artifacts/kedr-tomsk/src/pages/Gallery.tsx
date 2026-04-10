import { useEffect, useState } from "react";
import { Link } from "wouter";
import { X, ZoomIn } from "lucide-react";
import { galleryItems, galleryCategories } from "@/data/gallery";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [lightbox, setLightbox] = useState<{ img: string; title: string } | null>(null);

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

  // Close lightbox on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const filtered =
    activeCategory === "Все"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  const counts = galleryCategories.reduce<Record<string, number>>((acc, cat) => {
    acc[cat] =
      cat === "Все"
        ? galleryItems.length
        : galleryItems.filter((i) => i.category === cat).length;
    return acc;
  }, {});

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
              onClick={() => setActiveCategory(cat)}
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
                onClick={() => setLightbox({ img: item.img, title: item.title })}
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

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-scale-in"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.img.replace("504x376-", "1600x-").replace(".4e1.jpg", ".16c.jpg")}
              alt={lightbox.title}
              className="w-full h-auto max-h-[80vh] object-contain bg-black"
              onError={(e) => {
                (e.target as HTMLImageElement).src = lightbox.img;
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-4">
              <p className="text-white font-semibold text-lg">{lightbox.title}</p>
            </div>
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 glass rounded-full p-2 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
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
