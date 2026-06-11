import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  House, Tree, Pencil, Bathtub, Armchair, Package, ShieldCheck, HardHat, Key, ArrowRight, CheckCircle
} from "@phosphor-icons/react";
import PageHero from "@/components/PageHero";

const mainServices = [
  {
    num: "01",
    title: "Дома из профилированного бруса",
    img: "/images/projects/d134.jpg",
    items: [
      "Профилированный брус собственного производства",
      "Максимальное сечение стены 300 мм",
      "Мощность — до 500 м³ в месяц",
      "Строительство в Томске и по всей России",
      "от 11 000 до 16 000 руб./м² (без фундамента и кровли)",
    ],
    Icon: House,
  },
  {
    num: "02",
    title: "Рубленые дома из бревна",
    img: "/images/projects/d89.jpg",
    items: [
      "Дома из рубленого бревна ручной рубки",
      "Сибирский кедр, сосна, лиственница",
      "Индивидуальное проектирование",
      "Рубка в чашу и в лапу",
      "Строительство в Томске, области и по всей России",
    ],
    Icon: Tree,
  },
  {
    num: "03",
    title: "Проектирование",
    img: "/images/about/about-7.jpg",
    items: [
      "Разработка индивидуального проекта",
      "Консультация с инженером",
      "Архитектурные и конструктивные решения",
      "Подбор проекта из каталога",
      "Адаптация проекта под ваш участок",
    ],
    Icon: Pencil,
  },
  {
    num: "04",
    title: "Строительство бань и беседок",
    img: "/images/projects/d68.jpg",
    items: [
      "Бани из профилированного бруса",
      "Бани из рубленого бревна",
      "Беседки и террасы",
      "Хозяйственные постройки",
      "Отделка и коммуникации под ключ",
    ],
    Icon: Bathtub,
  },
  {
    num: "05",
    title: "Столярные изделия",
    img: "/images/production/prod-3.jpg",
    items: [
      "Деревянные окна",
      "Деревянные двери",
      "Лестницы из массива",
      "Деревянные полы",
      "Мебель на заказ",
    ],
    Icon: Armchair,
  },
  {
    num: "06",
    title: "Пиломатериалы и брус оптом",
    img: "/images/production/prod-4.jpg",
    items: [
      "Профилированный брус в розницу и оптом",
      "Обрезной и необрезной пиломатериал",
      "Отгрузка в железнодорожные вагоны",
      "Доставка по Томску и Томской области",
      "Доставка в любой регион России",
    ],
    Icon: Package,
  },
];

const highlights = [
  {
    Icon: ShieldCheck,
    title: "Собственное производство",
    desc: "Производим брус сами — контролируем качество на каждом этапе от сырья до готового сруба.",
  },
  {
    Icon: HardHat,
    title: "Строим с 2001 года",
    desc: "Более 25 лет опыта в деревянном строительстве в условиях сибирского климата.",
  },
  {
    Icon: Key,
    title: "Строительство под ключ",
    desc: "От проекта до передачи ключей. Работаем в Томске, области и любом регионе России.",
  },
];

export default function Services() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background pt-20">
      <PageHero
        title="Наши услуги"
        subtitle="Строительство деревянных домов под ключ в Томске и по всей России. Собственное производство бруса с 2001 года."
        breadcrumb="Услуги"
        tag="Услуги"
        image="/images/projects/d217.jpg"
      />

      {/* Price ticker */}
      <div className="bg-accent text-white py-4 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 flex items-center gap-6 flex-wrap">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold opacity-70">Стоимость</span>
          <span className="text-lg font-bold">от 11 000 до 16 000 руб./м²</span>
          <span className="text-white/60 text-sm">без стоимости фундамента и кровельного материала</span>
        </div>
      </div>

      {/* Services list */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 gap-px bg-border">
            {mainServices.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white"
              >
                <div className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                  {/* Image */}
                  <div className="lg:w-2/5 overflow-hidden">
                    <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full group">
                      <img
                        src={service.img}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 min-h-[280px]"
                      />
                      <div className="absolute top-6 left-6 text-6xl font-bold text-white/20 leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {service.num}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-8 h-px bg-accent" />
                      <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                        {service.num}
                      </span>
                    </div>
                    <div className="w-12 h-12 bg-primary/5 flex items-center justify-center mb-5">
                      <service.Icon size={26} weight="duotone" className="text-primary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-light text-foreground mb-7 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {service.title}
                    </h2>
                    <ul className="space-y-3">
                      {service.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <CheckCircle size={16} weight="bold" className="text-accent shrink-0 mt-1" />
                          <span className="text-muted-foreground text-sm leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights — dark bento tiles */}
      <section className="bg-[#0d1f12] py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-px bg-accent" />
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Почему мы</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#0d1f12] p-10"
              >
                <h.Icon size={36} weight="duotone" className="text-accent mb-6" />
                <h3 className="text-xl font-bold text-white mb-3">{h.title}</h3>
                <p className="text-white/60 font-light leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background border-t border-border">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-accent" />
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Консультация</span>
            </div>
            <h2 className="font-light text-4xl text-foreground mb-5 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Получить консультацию бесплатно
            </h2>
            <p className="text-muted-foreground mb-8 text-lg font-light leading-relaxed">
              Оставьте свои контакты — перезвоним для обсуждения вашего будущего дома.
            </p>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                placeholder="Ваше имя"
                className="flex-1 border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors bg-white"
              />
              <input
                placeholder="+7 (___) ___-__-__"
                className="flex-1 border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors bg-white"
              />
              <button
                type="button"
                className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-3 text-sm transition-all whitespace-nowrap"
              >
                Отправить <ArrowRight size={16} weight="bold" />
              </button>
            </form>
            <p className="text-xs text-muted-foreground mt-3">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
