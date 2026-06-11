import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Tree, Wrench, Package, Truck, ArrowRight, CheckCircle } from "@phosphor-icons/react";
import PageHero from "@/components/PageHero";

const stats = [
  { val: "500 м³", label: "бруса в месяц" },
  { val: "200×300", label: "макс. сечение (мм)" },
  { val: "2", label: "башенных крана" },
  { val: "с 2001", label: "года работаем" },
];

const products = [
  {
    title: "Профилированный брус",
    desc: "Производим профилированный брус максимальным сечением 200×300 мм на финском 4-х стороннем станке. Идеальная геометрия и точный профиль шип-паз. Мощность до 500 м³ в месяц.",
    img: "/images/production/prod-1.jpg",
    Icon: Tree,
  },
  {
    title: "Столярные изделия",
    desc: "Собственное столярное производство: деревянные окна, двери, лестницы, полы и мебель. Всё необходимое для деревянного дома прямо на нашей площадке в Томске.",
    img: "/images/production/prod-3.jpg",
    Icon: Wrench,
  },
  {
    title: "Пиломатериал",
    desc: "Обрезной и необрезной пиломатериал на ленточной пилораме. Сырьё — отборная сибирская древесина (кедр, сосна, лиственница) зимней заготовки из Томской области.",
    img: "/images/production/prod-4.jpg",
    Icon: Package,
  },
  {
    title: "Отгрузка и доставка",
    desc: "Погрузка и отправка пиломатериала в железнодорожные вагоны. Грузовой автотранспорт с манипуляторами обеспечивает доставку по Томску, области и любому региону России.",
    img: "/images/production/prod-5.jpg",
    Icon: Truck,
  },
];

const equipment = [
  {
    title: "Финский 4-х сторонний станок",
    desc: "Профилирование бруса с идеальной геометрией и точным пазом шип-паз",
  },
  {
    title: "Ленточная пилорама",
    desc: "Распиловка кругляка в обрезной и необрезной пиломатериал",
  },
  {
    title: "Два башенных крана",
    desc: "Подъём и монтаж тяжёлых элементов конструкции на производстве",
  },
];

const materials = [
  { name: "Кедр сибирский", desc: "Природный антисептик с уникальным целебным ароматом. Долговечный и тёплый материал." },
  { name: "Сосна ангарская", desc: "Оптимальное соотношение цены и качества. Высокая плотность годовых колец." },
  { name: "Лиственница", desc: "Максимальная прочность и стойкость к влаге для фундаментных венцов и бань." },
];

const infrastructure = [
  "Подъездные пути к производству",
  "Два башенных крана",
  "Грузовой автотранспорт с манипуляторами",
  "Отгрузка в железнодорожные вагоны",
  "Собственный склад древесины",
  "Цех столярных изделий",
];

export default function Production() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background pt-20">
      <PageHero
        title="Собственное производство"
        subtitle="Производственная площадка в Томске с полным циклом обработки древесины. Профилированный брус, столярные изделия, пиломатериал."
        breadcrumb="Производство"
        tag="Производство"
        image="/images/production/prod-1.jpg"
      />

      {/* Stats */}
      <section className="bg-white border-b border-border">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="py-10 px-8 text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {s.val}
                </div>
                <div className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products — alternating editorial layout */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-14">
            <div className="w-8 h-px bg-accent" />
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Что мы производим</span>
          </div>
          <div className="grid grid-cols-1 gap-px bg-border">
            {products.map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white"
              >
                <div className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                  <div className="lg:w-2/5 overflow-hidden">
                    <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full group min-h-[280px]">
                      <img
                        src={product.img}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                  <div className="lg:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                    <div className="w-12 h-12 bg-primary/5 flex items-center justify-center mb-6">
                      <product.Icon size={26} weight="duotone" className="text-primary" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-light text-foreground mb-5 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {product.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed font-light text-lg">{product.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="bg-[#0d1f12] py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-px bg-accent" />
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Оборудование</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
            {equipment.map((eq, i) => (
              <div key={i} className="bg-[#0d1f12] p-10">
                <div className="text-3xl font-bold text-accent/20 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  0{i + 1}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{eq.title}</h3>
                <p className="text-white/50 text-sm font-light leading-relaxed">{eq.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-px bg-accent" />
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Материалы</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border">
            {materials.map((mat, i) => (
              <div key={i} className="bg-white p-8 border-b-2 border-transparent hover:border-accent transition-colors group">
                <div className="text-5xl font-bold text-muted/30 mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">{mat.name}</h3>
                <p className="text-muted-foreground text-sm font-light leading-relaxed">{mat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production photos */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-px bg-accent" />
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Наше производство</span>
          </div>
          <div className="grid grid-cols-2 gap-px bg-border">
            {["/images/production/prod-1.jpg", "/images/production/prod-3.jpg", "/images/production/prod-4.jpg", "/images/production/prod-5.jpg"].map((src, i) => (
              <div key={i} className="overflow-hidden aspect-[4/3] group">
                <img src={src} alt={`Производство ${i + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-16 bg-white border-t border-border">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-px bg-accent" />
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Инфраструктура</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl">
            {infrastructure.map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-3 border-b border-border">
                <CheckCircle size={16} weight="bold" className="text-accent shrink-0" />
                <span className="text-sm font-medium text-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0d1f12] text-white py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-accent" />
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Экскурсия</span>
            </div>
            <h2 className="font-light text-4xl md:text-5xl text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Хотите увидеть всё своими глазами?
            </h2>
            <p className="text-white/60 text-lg font-light mb-10 leading-relaxed">
              Запишитесь на экскурсию. Мы проведём вас по производству, покажем качество бруса и ответим на все технические вопросы.
            </p>
            <Link
              href="/contacts"
              className="inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 transition-all duration-300 hover:gap-5"
            >
              Записаться на экскурсию <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
