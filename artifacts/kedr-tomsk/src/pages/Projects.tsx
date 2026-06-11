import { useState, useMemo, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Funnel, X, ArrowRight } from "@phosphor-icons/react";
import { projects } from "@/data/projects";
import PageHero from "@/components/PageHero";

const typeLabels: Record<string, string> = {
  brus: "Из бруса",
  brvno: "Из бревна",
  karkasny: "Каркасный",
  banya: "Баня/беседка",
};

export default function Projects() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [areaFilter, setAreaFilter] = useState("all");
  const [floorsFilter, setFloorsFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const handleTypeChange = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const resetFilters = () => {
    setSelectedTypes([]);
    setAreaFilter("all");
    setFloorsFilter("all");
    setPriceFilter("all");
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (selectedTypes.length > 0 && !selectedTypes.includes(p.type)) return false;
      if (areaFilter === "upTo100" && p.area > 100) return false;
      if (areaFilter === "100to200" && (p.area <= 100 || p.area > 200)) return false;
      if (areaFilter === "over200" && p.area <= 200) return false;
      if (floorsFilter === "1" && p.floors !== 1) return false;
      if (floorsFilter === "1.5" && p.floors !== 1.5) return false;
      if (floorsFilter === "2" && p.floors !== 2) return false;
      if (priceFilter === "upTo2m" && p.price > 2000000) return false;
      if (priceFilter === "2to5m" && (p.price <= 2000000 || p.price > 5000000)) return false;
      if (priceFilter === "over5m" && p.price <= 5000000) return false;
      return true;
    });
  }, [selectedTypes, areaFilter, floorsFilter, priceFilter]);

  const hasFilters = selectedTypes.length > 0 || areaFilter !== "all" || floorsFilter !== "all" || priceFilter !== "all";

  return (
    <div className="min-h-screen bg-background pt-20">
      <PageHero
        title="Каталог проектов"
        subtitle="Выберите идеальный дом для вашей семьи — из бруса, бревна или каркаса"
        breadcrumb="Каталог проектов"
        tag="Проекты"
        image="/images/projects/d134.jpg"
      />

      <div className="container mx-auto px-6 md:px-12 py-14">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
          <div>
            <span className="text-2xl font-bold text-foreground">{filteredProjects.length}</span>
            <span className="text-muted-foreground ml-2 text-sm">проектов</span>
          </div>
          <div className="flex items-center gap-3">
            {hasFilters && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                <X size={14} /> Сбросить
              </button>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 border text-sm font-medium transition-all ${
                showFilters || hasFilters
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-foreground border-border hover:border-primary"
              }`}
            >
              <Funnel size={16} weight="bold" /> Фильтры {hasFilters && `(${selectedTypes.length + (areaFilter !== "all" ? 1 : 0) + (floorsFilter !== "all" ? 1 : 0) + (priceFilter !== "all" ? 1 : 0)})`}
            </button>
          </div>
        </div>

        {/* Filter bar */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-10 p-6 bg-white border border-border overflow-hidden"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-xs uppercase tracking-[0.15em] font-semibold text-muted-foreground mb-3">Тип дома</div>
                <div className="space-y-2">
                  {[
                    { id: "brus", label: "Из профилированного бруса" },
                    { id: "brvno", label: "Из рубленого бревна" },
                    { id: "karkasny", label: "Каркасный" },
                    { id: "banya", label: "Баня / беседка" },
                  ].map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleTypeChange(type.id)}
                      className={`flex items-center gap-2 text-sm w-full text-left transition-colors ${
                        selectedTypes.includes(type.id) ? "text-accent font-semibold" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span className={`w-3 h-3 border flex-shrink-0 transition-colors ${
                        selectedTypes.includes(type.id) ? "bg-accent border-accent" : "border-border"
                      }`} />
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-[0.15em] font-semibold text-muted-foreground mb-3">Площадь</div>
                <div className="space-y-2">
                  {[
                    { id: "all", label: "Любая" },
                    { id: "upTo100", label: "до 100 м²" },
                    { id: "100to200", label: "100–200 м²" },
                    { id: "over200", label: "от 200 м²" },
                  ].map(opt => (
                    <button key={opt.id} onClick={() => setAreaFilter(opt.id)}
                      className={`text-sm w-full text-left transition-colors block ${areaFilter === opt.id ? "text-accent font-semibold" : "text-muted-foreground hover:text-foreground"}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-[0.15em] font-semibold text-muted-foreground mb-3">Этажность</div>
                <div className="space-y-2">
                  {[
                    { id: "all", label: "Любая" },
                    { id: "1", label: "1 этаж" },
                    { id: "1.5", label: "1,5 этажа" },
                    { id: "2", label: "2 этажа" },
                  ].map(opt => (
                    <button key={opt.id} onClick={() => setFloorsFilter(opt.id)}
                      className={`text-sm w-full text-left transition-colors block ${floorsFilter === opt.id ? "text-accent font-semibold" : "text-muted-foreground hover:text-foreground"}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-[0.15em] font-semibold text-muted-foreground mb-3">Стоимость</div>
                <div className="space-y-2">
                  {[
                    { id: "all", label: "Любая" },
                    { id: "upTo2m", label: "до 2 млн ₽" },
                    { id: "2to5m", label: "2–5 млн ₽" },
                    { id: "over5m", label: "от 5 млн ₽" },
                  ].map(opt => (
                    <button key={opt.id} onClick={() => setPriceFilter(opt.id)}
                      className={`text-sm w-full text-left transition-colors block ${priceFilter === opt.id ? "text-accent font-semibold" : "text-muted-foreground hover:text-foreground"}`}>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {filteredProjects.map((proj, idx) => (
              <motion.div
                key={proj.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (idx % 6) * 0.07 }}
                className="group bg-white overflow-hidden"
              >
                <Link href={`/projects/${proj.slug}`}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={proj.img}
                      alt={proj.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    {proj.badge && (
                      <div className="absolute top-4 left-4 bg-accent text-white text-xs font-semibold uppercase tracking-wide px-3 py-1">
                        {proj.badge}
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-white/60 text-xs mb-0.5">от</div>
                          <div className="text-white font-bold text-xl">{proj.price.toLocaleString()} ₽</div>
                        </div>
                        <div className="flex items-center gap-1.5 text-accent text-sm font-semibold">
                          Подробнее <ArrowRight size={14} weight="bold" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                      {proj.name}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{proj.area} м²</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span>{proj.floors} эт.</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span>{proj.beds} комн.</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="text-xs bg-muted px-2 py-0.5 text-foreground">{typeLabels[proj.type] ?? proj.type}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white border border-border">
            <p className="text-lg text-muted-foreground mb-4">По вашим критериям не найдено проектов.</p>
            <button onClick={resetFilters} className="text-sm text-accent hover:underline">
              Сбросить фильтры
            </button>
          </div>
        )}
      </div>

      {/* Dark CTA */}
      <section className="bg-[#0d1f12] text-white py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-accent" />
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Индивидуальный проект</span>
            </div>
            <h2 className="font-light text-4xl md:text-5xl text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Не нашли подходящий проект?
            </h2>
            <p className="text-white/60 text-lg font-light mb-10 leading-relaxed">
              Разработаем индивидуальный проект с учётом всех ваших пожеланий, особенностей участка и бюджета.
            </p>
            <Link
              href="/contacts"
              className="inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 transition-all duration-300 hover:gap-5"
            >
              Заказать индивидуальный проект <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
