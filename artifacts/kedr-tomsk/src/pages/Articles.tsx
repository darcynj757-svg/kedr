import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { articles } from "@/data/articles";

export default function Articles() {
  const [activeTag, setActiveTag] = useState("Все");

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

  const allTags = ["Все", ...Array.from(new Set(articles.flatMap((a) => a.tags)))];

  const filtered =
    activeTag === "Все" ? articles : articles.filter((a) => a.tags.includes(activeTag));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-sm mb-4 text-white/70">
            <Link href="/" className="hover:text-accent transition-colors">
              Главная
            </Link>{" "}
            / Полезные статьи
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Полезные статьи</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Публикации и полезная информация от специалистов «Кедр-Томск» для тех, кто строит или
            планирует строительство деревянного дома
          </p>
        </div>
      </section>

      {/* Tag filter */}
      <section className="border-b border-border bg-white sticky top-[64px] z-30 shadow-sm">
        <div className="container mx-auto px-4 md:px-8 py-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTag === tag
                  ? "bg-accent text-white shadow-md scale-105"
                  : "bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          {/* Featured article */}
          {activeTag === "Все" && (
            <div className="fade-in-section mb-10">
              <Link
                href={`/articles/${filtered[0].slug}`}
                className="group block rounded-3xl overflow-hidden shadow-lg border border-border hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 bg-white md:flex"
              >
                <div className="relative md:w-1/2 h-64 md:h-auto overflow-hidden">
                  <img
                    src={filtered[0].img}
                    alt={filtered[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary/20 group-hover:to-primary/40 transition-all duration-500" />
                  <Badge className="absolute top-4 left-4 bg-accent text-white border-0 px-3 py-1">
                    Рекомендуем
                  </Badge>
                </div>
                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {filtered[0].tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4 group-hover:text-accent transition-colors duration-300">
                    {filtered[0].title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{filtered[0].excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{filtered[0].date} · «Кедр-Томск»</span>
                    <span className="text-accent font-semibold group-hover:translate-x-1 transition-transform duration-200">
                      Читать →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {/* Rest of articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeTag === "Все" ? filtered.slice(1) : filtered).map((article, idx) => (
              <Link
                key={article.slug}
                href={`/articles/${article.slug}`}
                className="fade-in-section group block bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-400"
                style={{ transitionDelay: `${idx * 60}ms` }}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={article.img}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span className="glass text-white text-xs px-3 py-1.5 rounded-full font-medium">
                      {article.readTime} чтения
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {article.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300 leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border">
                    <span>{article.date}</span>
                    <span className="text-accent font-semibold group-hover:translate-x-1 transition-transform duration-200">
                      Читать →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              По выбранному тегу статей не найдено.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Готовы начать строительство?</h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Получите бесплатную консультацию и расчёт стоимости вашего будущего дома
          </p>
          <Link
            href="/contacts"
            className="inline-block bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 hover:scale-105"
          >
            Получить консультацию
          </Link>
        </div>
      </section>
    </div>
  );
}
