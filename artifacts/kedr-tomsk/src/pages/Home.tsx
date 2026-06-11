import { useState } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ShieldCheck, Factory, Wrench, Timer, SealCheck, Leaf,
  CaretLeft, CaretRight, Star, ArrowRight, House, TreeEvergreen,
  Flame, FrameCorners, Buildings, Compass,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import CountUp from "@/components/CountUp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { FadeUp, FadeLeft, FadeRight, StaggerChildren, staggerItem, ScaleIn, ParallaxSection, SlideReveal } from "@/components/Motion";

const ease = [0.22, 1, 0.36, 1] as const;

const formSchema = z.object({
  phone: z.string().min(10, "Минимум 10 символов"),
});

const testimonials = [
  { name: "Андрей Васильев", city: "Томск", year: "2023", type: "Дом из бруса, 180 м²", text: "Строили дом под ключ. Всё от проекта до финишной отделки. Очень доволен: сделали точно в срок, без скрытых доплат. Сруб сухой, геометрия отличная. Уже третья зима — никаких проблем с теплом.", rating: 5 },
  { name: "Светлана Морозова", city: "Новосибирск", year: "2022", type: "Рубленый дом, 220 м²", text: "Выбирали между несколькими компаниями, остановились на Кедр-Томск из-за их собственного производства. Бревно привезли своё, не перекупное. Дом получился красивый, натуральный. Рекомендую всем, кто хочет настоящий сруб.", rating: 5 },
  { name: "Дмитрий Коновалов", city: "Кемерово", year: "2023", type: "Баня из бревна", text: "Заказали баню 6×8 из рубленого бревна. Работают профессионально — смету дали подробную, в процессе строительства всё согласовывали. Результат — лучше, чем ожидали. Пар мягкий, держится долго.", rating: 5 },
  { name: "Ирина Лебедева", city: "Барнаул", year: "2024", type: "Дом из бруса, 140 м²", text: "Прошли все этапы: от выбора проекта до подписания акта. Менеджер был на связи постоянно. Особенно понравилась экскурсия на производство — видно, что компания серьёзная. В доме уже живём, очень комфортно.", rating: 5 },
  { name: "Игорь Петренко", city: "Томск", year: "2021", type: "Рубленый дом, 260 м²", text: "Строили большой загородный дом. Ребята справились отлично — сроки выдержали, качество на уровне. Сейчас советую Кедр-Томск всем своим знакомым. Уже двое соседей заказали у них строительство.", rating: 5 },
  { name: "Наталья Овчинникова", city: "Томск", year: "2022", type: "Дом из бруса, 110 м²", text: "Искала недорогой, но качественный дом. В Кедр-Томск предложили вариант из профилированного бруса — тёплый, практичный, не требует больших вложений в отделку. Очень довольна выбором и работой команды.", rating: 5 },
];

const advantages = [
  { icon: ShieldCheck, title: "Более 25 лет на рынке", desc: "Строим качественные дома с 2001 года. Сотни довольных клиентов по всей России", img: "/images/about/about-1.jpg" },
  { icon: Factory, title: "Собственное производство", desc: "Собственная площадка в промзоне Томска. До 500 м³ профилированного бруса в месяц", img: "/images/production/prod-1.jpg" },
  { icon: Wrench, title: "Полный цикл под ключ", desc: "От проекта до ключей в руках: один подрядчик, ноль субподрядчиков", img: "/images/about/about-3.jpg" },
  { icon: Timer, title: "Фиксированная цена", desc: "Фиксируем сроки и стоимость в договоре. Штраф за каждый день просрочки", img: "/images/production/prod-3.jpg" },
  { icon: SealCheck, title: "Гарантия на все работы", desc: "Гарантия 5 лет на конструктив и 2 года на отделочные работы", img: "/images/gallery/gallery-2.jpg" },
  { icon: Leaf, title: "Экологичные материалы", desc: "Строим из кедра, сосны и лиственницы — натуральное дерево без синтетики", img: "/images/gallery/gallery-5.jpg" },
];

export default function Home() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { phone: "" },
  });
  const [reviewIdx, setReviewIdx] = useState(0);

  function onSubmit() {
    toast({ title: "Заявка принята!", description: "Перезвоним в течение 15 минут" });
    form.reset();
  }

  const SectionLabel = ({ text, dark = false }: { text: string; dark?: boolean }) => (
    <FadeUp>
      <div className="flex items-center gap-3 mb-5">
        <motion.span
          className="block h-px bg-accent"
          initial={{ width: 0 }}
          whileInView={{ width: 32 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        />
        <span className={`text-accent text-[11px] uppercase tracking-[0.25em] font-medium`}>{text}</span>
      </div>
    </FadeUp>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* ══════════════ HERO ══════════════ */}
      <section id="home" className="relative h-screen min-h-[640px] flex items-end overflow-hidden">
        <ParallaxSection className="absolute inset-0 z-0">
          <img src="/images/hero/hero-main.jpg" alt="Деревянный дом" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
        </ParallaxSection>

        {/* Floating stat cards top-right */}
        <div className="absolute top-28 right-8 z-20 hidden xl:flex flex-col gap-2">
          {[{ val: "25+", label: "лет опыта" }, { val: "320+", label: "домов сдано" }, { val: "вся РФ", label: "география" }].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + i * 0.12, duration: 0.6, ease }}
              className="border border-white/12 bg-black/45 backdrop-blur-md px-5 py-3 min-w-[130px]"
            >
              <div className="text-2xl font-bold text-accent tracking-tight">{s.val}</div>
              <div className="text-[9px] text-white/40 uppercase tracking-[0.22em] mt-0.5">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-6 md:px-10 relative z-10 pb-24 pt-40">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease }}
            className="flex items-center gap-3 mb-7"
          >
            <motion.span className="block h-px bg-accent" initial={{ width: 0 }} animate={{ width: 32 }} transition={{ delay: 0.4, duration: 0.7, ease }} />
            <span className="text-accent text-[11px] font-medium uppercase tracking-[0.25em]">Томск · С 2001 года</span>
          </motion.div>

          <div className="overflow-hidden mb-3">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.25, duration: 0.75, ease }}
              className="text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.0] tracking-tight"
            >
              Строим деревянные
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.35, duration: 0.75, ease }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.0] tracking-tight"
            >
              дома под ключ
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.65, ease }}
            className="text-base text-white/50 mb-10 font-light max-w-md leading-relaxed"
          >
            Собственное производство профилированного бруса. Полный цикл от проекта до отделки.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.62, duration: 0.6, ease }}
            className="flex flex-wrap gap-4"
          >
            <Button size="lg" className="btn-accent-gradient text-black font-semibold h-14 px-10 rounded-none tracking-wide text-sm group" asChild>
              <Link href="/projects">
                Посмотреть проекты
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white/65 hover:bg-white/8 hover:text-white h-14 px-10 rounded-none tracking-wide text-sm bg-transparent transition-all duration-300" asChild>
              <Link href="/calculator">Рассчитать стоимость</Link>
            </Button>
          </motion.div>
        </div>

        {/* Bottom strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="absolute bottom-0 left-0 w-full z-10 bg-black/40 backdrop-blur-sm border-t border-white/8"
        >
          <div className="container mx-auto px-6 md:px-10 py-3 hidden md:flex justify-between items-center text-[10px] text-white/30 uppercase tracking-[0.22em]">
            {["Собственное производство", "Работаем с 2001 года", "Профилированный брус 200×300 мм", "Гарантия 5 лет"].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-3 h-px bg-accent/50" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ══════════════ STATS BAR ══════════════ */}
      <section className="bg-[#0d1f12] py-14">
        <div className="container mx-auto px-6 md:px-10">
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0" stagger={0.08}>
            {[
              { val: <CountUp to={25} suffix="+" duration={1600} />, label: "Лет на рынке" },
              { val: <CountUp to={500} duration={1800} />, label: "М³ бруса в месяц" },
              { val: <CountUp to={320} suffix="+" duration={2000} />, label: "Построенных домов" },
              { val: "вся РФ", label: "География работ" },
            ].map((s, i) => (
              <motion.div key={i} variants={staggerItem} className="text-center md:border-r border-white/8 last:border-0 px-4">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2 tracking-tight">{s.val}</div>
                <div className="text-[10px] text-white/35 uppercase tracking-[0.22em]">{s.label}</div>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ══════════════ ADVANTAGES ══════════════ */}
      <section id="advantages" className="py-28 bg-background">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <SectionLabel text="Преимущества" />
              <FadeUp delay={0.1}>
                <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight leading-tight">
                  Почему выбирают<br /><span className="font-bold">Кедр-Томск</span>
                </h2>
              </FadeUp>
            </div>
            <FadeRight>
              <p className="text-muted-foreground max-w-xs text-sm leading-relaxed font-light">25 лет строим дома — знаем каждый этап изнутри</p>
            </FadeRight>
          </div>

          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3" stagger={0.07}>
            {advantages.map((adv, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="group relative overflow-hidden cursor-default"
                style={{ height: "340px" }}
              >
                {/* Background image */}
                <motion.img
                  src={adv.img}
                  alt={adv.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  whileHover={{ scale: 1.07 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
                {/* Gradient overlay — stronger at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 group-hover:from-black/90 group-hover:via-black/45 transition-all duration-500" />

                {/* Giant frosted glass block filling 90% of tile */}
                <div className="absolute inset-[5%] flex items-center justify-center backdrop-blur-xl bg-white/10 border border-white/15 group-hover:bg-white/15 transition-all duration-500">
                  <adv.icon size={100} weight="duotone" className="text-white/80 group-hover:text-white transition-colors duration-400" />
                </div>

                {/* Text bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <motion.div
                    className="h-px bg-accent mb-4"
                    style={{ width: "1.5rem" }}
                    whileHover={{ width: "3rem" }}
                    transition={{ duration: 0.35 }}
                  />
                  <h3 className="text-base font-bold text-white mb-2 tracking-tight leading-snug">{adv.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed font-light translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400">{adv.desc}</p>
                </div>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ══════════════ PROJECTS — BENTO GRID ══════════════ */}
      <section id="projects" className="py-28 bg-[#f7f5f1]">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <SectionLabel text="Каталог проектов" />
              <FadeUp delay={0.1}>
                <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight leading-tight">
                  Популярные<br /><span className="font-bold">проекты</span>
                </h2>
              </FadeUp>
            </div>
            <FadeRight>
              <Button variant="outline" className="border-border text-foreground/60 hover:border-foreground/40 hover:text-foreground rounded-none px-8 tracking-wide text-xs uppercase transition-all group" asChild>
                <Link href="/projects">
                  Все проекты
                  <ArrowRight size={13} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </FadeRight>
          </div>

          {/* Bento grid — zorge9 style */}
          <div className="grid grid-cols-12 gap-3">
            {/* Tile 1 — large, spans 7 cols, tall */}
            <FadeUp delay={0} className="col-span-12 md:col-span-7 row-span-2">
              <Link href="/projects/d217">
                <motion.div className="group relative overflow-hidden cursor-pointer" style={{ height: "580px" }}>
                  <motion.img
                    src="/images/projects/d217.jpg"
                    alt="Проект Д217"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.8, ease }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                  <Badge className="absolute top-5 left-5 bg-accent text-black border-0 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-none">Хит</Badge>
                  <div className="absolute bottom-0 left-0 right-0 p-7">
                    <div className="text-[10px] text-white/45 uppercase tracking-[0.22em] mb-2">217 м² · 2 этажа · 5 комнат</div>
                    <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Проект Д217</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-accent font-bold text-lg">от 2 387 000 ₽</span>
                      <motion.div
                        className="w-10 h-10 border border-white/25 flex items-center justify-center text-white group-hover:bg-accent group-hover:border-accent group-hover:text-black transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                      >
                        <ArrowRight size={16} />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </FadeUp>

            {/* Tile 2 — top-right, spans 5 cols */}
            <FadeUp delay={0.08} className="col-span-12 md:col-span-5">
              <Link href="/projects/d126">
                <motion.div className="group relative overflow-hidden cursor-pointer" style={{ height: "280px" }}>
                  <motion.img
                    src="/images/projects/d126.jpg"
                    alt="Проект Д126"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.8, ease }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <Badge className="absolute top-4 left-4 bg-accent text-black border-0 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-none">Популярный</Badge>
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="text-[10px] text-white/40 uppercase tracking-[0.22em] mb-1.5">126 м² · 2 этажа</div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white">Проект Д126</h3>
                      <span className="text-accent font-semibold text-sm">от 1 386 000 ₽</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </FadeUp>

            {/* Tile 3 — bottom-right, spans 5 cols */}
            <FadeUp delay={0.14} className="col-span-12 md:col-span-5">
              <Link href="/projects/d89">
                <motion.div className="group relative overflow-hidden cursor-pointer" style={{ height: "280px" }}>
                  <motion.img
                    src="/images/projects/d89.jpg"
                    alt="Проект Д89"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.8, ease }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="text-[10px] text-white/40 uppercase tracking-[0.22em] mb-1.5">89 м² · 1 этаж</div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-white">Проект Д89</h3>
                      <span className="text-accent font-semibold text-sm">от 979 000 ₽</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </FadeUp>

            {/* Tile 4 — wide bottom, spans 6 cols */}
            <FadeUp delay={0.18} className="col-span-12 md:col-span-6">
              <Link href="/projects/d236">
                <motion.div className="group relative overflow-hidden cursor-pointer" style={{ height: "320px" }}>
                  <motion.img
                    src="/images/projects/d236.jpg"
                    alt="Проект Д236"
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.04 }}
                    transition={{ duration: 0.8, ease }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="text-[10px] text-white/40 uppercase tracking-[0.22em] mb-1.5">236 м² · 2 этажа · 5 комнат</div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">Проект Д236</h3>
                      <span className="text-accent font-bold text-base">от 2 596 000 ₽</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </FadeUp>

            {/* Tile 5 — CTA tile */}
            <FadeUp delay={0.22} className="col-span-12 md:col-span-6">
              <div className="bg-[#0d1f12] flex flex-col justify-between p-10" style={{ height: "320px" }}>
                <div>
                  <div className="text-[10px] text-white/30 uppercase tracking-[0.22em] mb-4">Не нашли подходящий?</div>
                  <h3 className="text-2xl font-bold text-white leading-snug mb-4">Разработаем<br />индивидуальный<br />проект</h3>
                  <p className="text-white/40 text-sm font-light leading-relaxed">Архитекторы создадут дом по вашим размерам и пожеланиям</p>
                </div>
                <Button className="btn-accent-gradient text-black rounded-none w-fit px-8 tracking-wide text-xs uppercase font-semibold group" asChild>
                  <Link href="/calculator">
                    Рассчитать стоимость
                    <ArrowRight size={13} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ══════════════ SERVICES — BENTO TILES ══════════════ */}
      <section id="services" className="py-28 bg-background">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <SectionLabel text="Услуги" />
              <FadeUp delay={0.1}>
                <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight leading-tight">
                  Что мы<br /><span className="font-bold">строим</span>
                </h2>
              </FadeUp>
            </div>
          </div>

          {/* First row: 1 big + 2 small */}
          <div className="grid grid-cols-12 gap-3 mb-3">
            <FadeUp delay={0} className="col-span-12 md:col-span-6">
              <ServiceTile
                icon={House}
                title="Дома из профилированного бруса"
                img="/images/projects/d126.jpg"
                height={440}
              />
            </FadeUp>
            <div className="col-span-12 md:col-span-6 flex flex-col gap-3">
              <FadeUp delay={0.08} className="flex-1">
                <ServiceTile
                  icon={TreeEvergreen}
                  title="Дома из рубленого бревна"
                  img="/images/gallery/gallery-6.jpg"
                  height={210}
                />
              </FadeUp>
              <FadeUp delay={0.14} className="flex-1">
                <ServiceTile
                  icon={Flame}
                  title="Бани и сауны"
                  img="/images/gallery/gallery-5.jpg"
                  height={210}
                />
              </FadeUp>
            </div>
          </div>

          {/* Second row: 3 equal tiles */}
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-3" stagger={0.07}>
            {[
              { icon: FrameCorners, title: "Каркасные дома", img: "/images/gallery/gallery-7.jpg" },
              { icon: Buildings, title: "Коттеджи под ключ", img: "/images/projects/d236.jpg" },
              { icon: Compass, title: "Проектирование", img: "/images/about/about-7.jpg" },
            ].map((s, i) => (
              <motion.div key={i} variants={staggerItem}>
                <ServiceTile icon={s.icon} title={s.title} img={s.img} height={280} />
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ══════════════ ABOUT — SPLIT ══════════════ */}
      <section id="about" className="py-28 bg-[#f7f5f1]">
        <div className="container mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeLeft>
              <SectionLabel text="О компании" />
              <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight leading-tight mb-8">
                Кедр-Томск —<br /><span className="font-bold">25 лет традиций</span>
              </h2>
              <p className="text-muted-foreground leading-relaxed font-light text-base mb-10">
                Строительство деревянных домов, коттеджей и бань под ключ из профилированного бруса и рубленого бревна. Собственная производственная площадка в г. Томске.
              </p>

              <StaggerChildren className="grid grid-cols-2 gap-6 mb-10" stagger={0.08}>
                {[
                  { val: "25+", label: "лет опыта" },
                  { val: "150+", label: "домов сдано" },
                  { val: "200+", label: "проектов" },
                  { val: "вся РФ", label: "география" },
                ].map((s, i) => (
                  <motion.div key={i} variants={staggerItem} className="border-l-2 border-accent/40 pl-5">
                    <div className="text-3xl font-bold text-foreground mb-1">{s.val}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em]">{s.label}</div>
                  </motion.div>
                ))}
              </StaggerChildren>

              <Button variant="outline" className="border-border text-foreground/60 hover:border-foreground/40 hover:text-foreground rounded-none px-8 tracking-wide text-xs uppercase transition-all group" asChild>
                <Link href="/about">
                  Подробнее о компании
                  <ArrowRight size={13} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </FadeLeft>

            <FadeRight>
              <div className="relative">
                {/* Main large image */}
                <motion.div
                  className="overflow-hidden"
                  initial={{ opacity: 0, scale: 0.97 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease }}
                >
                  <img
                    src="/images/production/prod-1.jpg"
                    alt="Производство Кедр-Томск"
                    className="w-full object-cover"
                    style={{ aspectRatio: "4/3" }}
                  />
                </motion.div>
                {/* Small overlay badge */}
                <motion.div
                  className="absolute -bottom-5 -left-5 w-28 h-28 bg-accent flex flex-col items-center justify-center shadow-lg"
                  initial={{ opacity: 0, scale: 0.75 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35, duration: 0.5, ease }}
                >
                  <div className="text-3xl font-bold text-black">25+</div>
                  <div className="text-[9px] text-black/60 uppercase tracking-wider text-center mt-0.5">лет<br />опыта</div>
                </motion.div>
              </div>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* ══════════════ STAGES ══════════════ */}
      <section id="stages" className="py-28 bg-background border-y border-border">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <SectionLabel text="Процесс" />
              <FadeUp delay={0.1}>
                <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight leading-tight">
                  Этапы<br /><span className="font-bold">строительства</span>
                </h2>
              </FadeUp>
            </div>
          </div>

          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4" stagger={0.07} delay={0.1}>
            {[
              { n: "01", title: "Консультация", desc: "бесплатно" },
              { n: "02", title: "Проект", desc: "архитектура" },
              { n: "03", title: "Производство", desc: "изготовление" },
              { n: "04", title: "Доставка", desc: "транспортировка" },
              { n: "05", title: "Фундамент", desc: "заливка" },
              { n: "06", title: "Сборка", desc: "возведение" },
              { n: "07", title: "Отделка", desc: "сдача" },
            ].map((step, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="group flex flex-col gap-3 cursor-default"
              >
                <motion.div
                  className="text-4xl font-bold text-border group-hover:text-accent transition-colors duration-400"
                  whileHover={{ scale: 1.05 }}
                >
                  {step.n}
                </motion.div>
                <div className="h-px bg-border group-hover:bg-accent/40 transition-colors duration-400" />
                <h4 className="font-semibold text-foreground text-sm tracking-tight">{step.title}</h4>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ══════════════ TESTIMONIALS ══════════════ */}
      <section id="testimonials" className="py-28 bg-[#f7f5f1]">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
            <div>
              <SectionLabel text="Отзывы клиентов" />
              <FadeUp delay={0.1}>
                <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight leading-tight">
                  Что говорят<br /><span className="font-bold">клиенты</span>
                </h2>
              </FadeUp>
            </div>
          </div>

          <ScaleIn>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
              {/* Main review */}
              <div className="lg:col-span-3 bg-white border border-border p-10 md:p-14 relative overflow-hidden">
                <div className="absolute top-6 right-8 text-9xl text-foreground/4 font-serif leading-none select-none">"</div>
                <div className="flex items-center gap-1 mb-7">
                  {Array.from({ length: testimonials[reviewIdx].rating }).map((_, i) => (
                    <Star key={i} size={14} weight="fill" color="#C4922A" />
                  ))}
                </div>
                <motion.p
                  key={reviewIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="text-xl text-foreground/70 leading-relaxed mb-10 font-light relative z-10"
                >
                  {testimonials[reviewIdx].text}
                </motion.p>
                <div className="flex items-center justify-between flex-wrap gap-4 pt-8 border-t border-border">
                  <motion.div key={`m-${reviewIdx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
                    <div className="font-semibold text-foreground tracking-tight">{testimonials[reviewIdx].name}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mt-1">
                      {testimonials[reviewIdx].city} · {testimonials[reviewIdx].year} · {testimonials[reviewIdx].type}
                    </div>
                  </motion.div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setReviewIdx((i) => (i - 1 + testimonials.length) % testimonials.length)} className="w-9 h-9 border border-border flex items-center justify-center text-muted-foreground hover:border-foreground/40 hover:text-foreground transition-all duration-200">
                      <CaretLeft size={15} />
                    </button>
                    <span className="text-xs text-muted-foreground tracking-widest tabular-nums">
                      {String(reviewIdx + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
                    </span>
                    <button onClick={() => setReviewIdx((i) => (i + 1) % testimonials.length)} className="w-9 h-9 border border-border flex items-center justify-center text-muted-foreground hover:border-foreground/40 hover:text-foreground transition-all duration-200">
                      <CaretRight size={15} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Side reviews */}
              <div className="lg:col-span-2 flex flex-col gap-3">
                {testimonials.filter((_, i) => i !== reviewIdx).slice(0, 3).map((t, idx) => (
                  <motion.button
                    key={`${t.name}-${idx}`}
                    onClick={() => setReviewIdx(testimonials.indexOf(t))}
                    className="text-left bg-white border border-border p-6 hover:border-foreground/20 transition-all duration-200 group flex-1"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={10} weight="fill" color="#C4922A" />)}
                    </div>
                    <p className="text-foreground/60 line-clamp-2 text-xs leading-snug mb-3">{t.text}</p>
                    <div className="font-semibold text-foreground text-xs">{t.name}</div>
                    <div className="text-muted-foreground text-[10px] uppercase tracking-wider mt-0.5">{t.city} · {t.year}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="flex gap-2 mt-5">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => setReviewIdx(i)}
                  className={`rounded-full transition-all duration-300 ${i === reviewIdx ? "bg-accent" : "bg-border hover:bg-foreground/20"}`}
                  animate={{ width: i === reviewIdx ? 24 : 8, height: 6 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* ══════════════ CALLBACK ══════════════ */}
      <section id="callback" className="py-28 bg-[#0d1f12]">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">
          <SectionLabel text="Связаться" />
          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight mb-4 leading-tight">
              Остались<br /><span className="font-bold">вопросы?</span>
            </h2>
            <p className="text-white/40 mb-10 font-light">Оставьте номер — наш инженер перезвонит в течение 15 минут</p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-3">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input placeholder="+7 (999) 000-00-00" className="h-14 text-base bg-white/8 border-white/12 text-white placeholder:text-white/30 focus:border-accent rounded-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="h-14 px-10 text-sm btn-accent-gradient text-black rounded-none tracking-wide font-semibold uppercase">
                  Жду звонка
                </Button>
              </form>
            </Form>
            <p className="text-[10px] text-white/20 mt-4 uppercase tracking-widest">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section id="faq" className="py-28 bg-background">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">
          <SectionLabel text="FAQ" />
          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-16 leading-tight">
              Частые<br /><span className="font-bold">вопросы</span>
            </h2>
          </FadeUp>

          <StaggerChildren className="space-y-px" stagger={0.07}>
            {[
              { q: "В каком виде сдаются дома?", a: 'Мы строим дома "под ключ" или "под усадку". Базовая комплектация "под усадку" включает фундамент, сруб, стропильную систему и кровлю. Комплектация "под ключ" дополняется окнами, дверями, инженерными сетями и чистовой отделкой.' },
              { q: "Сколько времени занимает строительство?", a: "Сборка сруба на участке занимает от 2 до 4 недель в зависимости от площади дома. Изготовление домокомплекта на производстве — около 3-4 недель. Весь цикл от договора до сдачи базовой комплектации занимает в среднем 2 месяца." },
              { q: "Можно ли изменить проект из каталога?", a: "Да, любой проект из каталога можно изменить под ваши нужды: передвинуть стены, добавить окно, изменить тип фундамента или материал кровли. Эти изменения вносятся нашими архитекторами бесплатно при заключении договора на строительство." },
              { q: "Как происходит оплата?", a: "Оплата разбивается на несколько этапов, привязанных к ходу строительства: предоплата на закупку материала, оплата по факту готовности домокомплекта, оплата после устройства фундамента и окончательный расчет после сдачи дома." },
            ].map((item, i) => (
              <motion.div key={i} variants={staggerItem}>
                <Accordion type="single" collapsible>
                  <AccordionItem value={`item-${i}`} className="bg-card border border-border px-6">
                    <AccordionTrigger className="text-left font-medium text-base text-foreground hover:text-primary tracking-tight py-6 hover:no-underline">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm pb-6 font-light leading-relaxed">{item.a}</AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </div>
  );
}

function ServiceTile({ icon: Icon, title, img, height }: { icon: any; title: string; img: string; height: number }) {
  return (
    <Link href="/services">
      <motion.div
        className="group relative overflow-hidden cursor-pointer w-full"
        style={{ height }}
        whileHover="hover"
      >
        <motion.img
          src={img}
          alt={title}
          className="w-full h-full object-cover"
          variants={{ hover: { scale: 1.05 } }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
          <div>
            <div className="w-7 h-7 bg-accent/15 border border-accent/25 flex items-center justify-center text-accent mb-3 group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-all duration-300">
              <Icon size={14} weight="duotone" />
            </div>
            <h3 className="text-sm font-semibold text-white tracking-tight leading-snug max-w-[200px]">{title}</h3>
          </div>
          <motion.div
            className="w-9 h-9 border border-white/20 flex items-center justify-center text-white/60 group-hover:bg-accent group-hover:border-accent group-hover:text-black transition-all duration-300 shrink-0"
            variants={{ hover: { scale: 1.1 } }}
            transition={{ duration: 0.25 }}
          >
            <ArrowRight size={14} />
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}
