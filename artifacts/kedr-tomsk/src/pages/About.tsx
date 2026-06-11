import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ShieldCheck, Target, Users, ArrowRight, Phone } from "@phosphor-icons/react";
import PageHero from "@/components/PageHero";

const stats = [
  { val: "2001", label: "год основания" },
  { val: "25+", label: "лет опыта" },
  { val: "500 м³", label: "бруса в месяц" },
  { val: "100%", label: "своё производство" },
];

const values = [
  {
    Icon: ShieldCheck,
    title: "Качество",
    desc: "Используем только отборный лес зимней заготовки. Профилированный брус производим на собственной площадке с финским 4-сторонним станком.",
  },
  {
    Icon: Target,
    title: "Прозрачность",
    desc: "Честная смета без скрытых платежей. Фиксируем стоимость и сроки в договоре до начала работ. Строительство под ключ от 11 000 руб./м².",
  },
  {
    Icon: Users,
    title: "Ответственность",
    desc: "Несём гарантийные обязательства на все несущие конструкции. Мы всегда на связи с нашими клиентами — с 2001 года.",
  },
];

const aboutImages = [2, 3, 4, 5, 6, 7, 8];

export default function About() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background pt-20">
      <PageHero
        title="О компании Кедр-Томск"
        subtitle="С 2001 года строим деревянные дома в Томске, Томской области и по всей России"
        breadcrumb="О компании"
        tag="О нас"
        image="/images/about/about-7.jpg"
      />

      {/* Stats row */}
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

      {/* Story — editorial layout */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-px bg-accent" />
                <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">История</span>
              </div>
              <h2 className="font-light text-4xl md:text-5xl text-foreground mb-8 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                История и подход
              </h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed font-light text-lg">
                <p>
                  ООО «Кедр-Томск» ведёт деятельность с 2001 года. Наш профиль — строительство деревянных домов, коттеджей и бань под ключ из профилированного бруса и рубленого бревна.
                </p>
                <p>
                  Мы — полноциклная компания: собственное производство в Томске позволяет нам изготавливать профилированный брус и столярные изделия любой сложности. Производственная мощность — до 500 м³ бруса в месяц.
                </p>
                <p>
                  За 25 лет работы мы накопили богатый опыт строительства в условиях сибирского климата. Строим в Томске, области, а также по всей России — от заготовки бруса до передачи ключей.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src="/images/about/about-7.jpg"
                  alt="Кедр-Томск производство"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-8 bg-white p-6 border-t-4 border-accent">
                <div className="text-2xl font-bold text-accent mb-1">25+ лет</div>
                <div className="text-sm text-muted-foreground">опыта деревянного строительства в Сибири</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values — bento tiles */}
      <section className="bg-[#0d1f12] py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-px bg-accent" />
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Ценности</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-[#0d1f12] p-10 group"
              >
                <v.Icon size={36} weight="duotone" className="text-accent mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold text-white mb-4">{v.title}</h3>
                <p className="text-white/60 font-light leading-relaxed text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Director */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-px bg-accent" />
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Руководство</span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-4xl">
            <div className="overflow-hidden aspect-square max-w-sm">
              <img
                src="/images/about/about-1.jpg"
                alt="Серебряков Павел Михайлович"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-3xl font-light text-foreground mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                Серебряков Павел Михайлович
              </h3>
              <div className="text-accent font-semibold text-sm uppercase tracking-wide mb-6">
                Директор ООО «Кедр-Томск»
              </div>
              <p className="text-muted-foreground leading-relaxed mb-8 font-light">
                Основатель компании с 2001 года. Под руководством Павла Михайловича «Кедр-Томск» вырос из небольшой бригады в полноциклное производственно-строительное предприятие с собственным производством бруса.
              </p>
              <a
                href="tel:+79528800973"
                className="inline-flex items-center gap-3 text-foreground hover:text-accent transition-colors font-medium"
              >
                <Phone size={18} weight="bold" />
                +7 (952) 88-00-973
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Photo grid */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-8 h-px bg-accent" />
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Наша компания</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
            {aboutImages.slice(0, 4).map((n) => (
              <div key={n} className="overflow-hidden aspect-square group">
                <img
                  src={`/images/about/about-${n}.jpg`}
                  alt={`Кедр-Томск фото ${n}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rekvizity */}
      <section className="py-16 bg-white border-t border-border">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-px bg-accent" />
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Реквизиты</span>
          </div>
          <dl className="divide-y divide-border">
            {[
              { dt: "Полное наименование", dd: "Общество с ограниченной ответственностью «Кедр-Томск»" },
              { dt: "Юридический адрес", dd: "634024, г. Томск, ул. Профсоюзная, 2/67 стр. 3" },
              { dt: "Телефон", dd: "+7 (3822) 33-44-39", href: "tel:+73822334439" },
              { dt: "Email", dd: "mail@kedr-tomsk.ru", href: "mailto:mail@kedr-tomsk.ru" },
              { dt: "Директор", dd: "Серебряков Павел Михайлович" },
            ].map((item, i) => (
              <div key={i} className="py-4 grid grid-cols-2 gap-4">
                <dt className="text-sm font-semibold text-foreground">{item.dt}</dt>
                <dd className="text-sm text-muted-foreground">
                  {item.href ? (
                    <a href={item.href} className="hover:text-accent transition-colors">{item.dd}</a>
                  ) : item.dd}
                </dd>
              </div>
            ))}
          </dl>
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
              Приходите на экскурсию на производство
            </h2>
            <p className="text-white/60 text-lg font-light mb-10 leading-relaxed">
              Убедитесь лично в качестве нашего бруса. Мы покажем все этапы обработки древесины и расскажем, как строится надёжный дом.
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
