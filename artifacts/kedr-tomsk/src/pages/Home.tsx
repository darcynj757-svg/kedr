import { useState } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  ShieldCheck,
  Factory,
  Wrench,
  Timer,
  SealCheck,
  Leaf,
  CaretLeft,
  CaretRight,
  Star,
  ArrowRight,
  House,
  TreeEvergreen,
  Flame,
  FrameCorners,
  Buildings,
  Compass,
} from "@phosphor-icons/react";
import { motion } from "framer-motion";
import CountUp from "@/components/CountUp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  FadeUp,
  FadeLeft,
  FadeRight,
  StaggerChildren,
  staggerItem,
  ScaleIn,
  LineReveal,
  ParallaxSection,
} from "@/components/Motion";

const ease = [0.25, 1, 0.5, 1] as const;

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
  { icon: ShieldCheck, title: "Более 25 лет на рынке", desc: "Строим качественные дома с 2001 года. Сотни довольных клиентов по всей России" },
  { icon: Factory, title: "Собственное производство", desc: "Собственная площадка в промзоне Томска. До 500 м³ профилированного бруса в месяц" },
  { icon: Wrench, title: "Полный цикл под ключ", desc: "От проекта до ключей в руках: один подрядчик, ноль субподрядчиков" },
  { icon: Timer, title: "Фиксированная цена", desc: "Фиксируем сроки и стоимость в договоре. Штраф за каждый день просрочки" },
  { icon: SealCheck, title: "Гарантия на все работы", desc: "Гарантия 5 лет на конструктив и 2 года на отделочные работы" },
  { icon: Leaf, title: "Экологичные материалы", desc: "Строим из кедра, сосны и лиственницы — натуральное дерево без синтетики" },
];

const services = [
  { icon: House, title: "Дома из профилированного бруса", img: "/images/projects/d126.jpg", desc: "Тёплый и надёжный дом из сухого профилированного бруса собственного производства" },
  { icon: TreeEvergreen, title: "Дома из рубленого бревна", img: "/images/gallery/gallery-6.jpg", desc: "Классическое ручное рубление — традиции сибирского зодчества в современном исполнении" },
  { icon: Flame, title: "Бани и сауны", img: "/images/gallery/gallery-5.jpg", desc: "Бани из кедра и лиственницы — настоящий русский пар для здоровья и удовольствия" },
  { icon: FrameCorners, title: "Каркасные дома", img: "/images/gallery/gallery-7.jpg", desc: "Быстровозводимые каркасные дома — экономия времени и бюджета без потери качества" },
  { icon: Buildings, title: "Коттеджи и постройки", img: "/images/projects/d236.jpg", desc: "Строительство коттеджей любой этажности и сложности под ключ" },
  { icon: Compass, title: "Проектирование", img: "/images/about/about-7.jpg", desc: "Разработка индивидуальных архитектурных проектов с нуля — бесплатная консультация" },
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

  const SectionLabel = ({ text }: { text: string }) => (
    <FadeUp>
      <div className="flex items-center gap-3 mb-4">
        <motion.span
          className="block h-px bg-accent"
          initial={{ width: 0 }}
          whileInView={{ width: 32 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
        />
        <span className="text-accent text-xs uppercase tracking-[0.22em] font-medium">{text}</span>
      </div>
    </FadeUp>
  );

  return (
    <div className="flex flex-col min-h-screen bg-background">

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section id="home" className="relative min-h-[100vh] flex items-end overflow-hidden" data-testid="hero-section">
        <ParallaxSection className="absolute inset-0 z-0">
          <img src="/images/hero/hero-main.jpg" alt="Деревянный дом" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/55 to-transparent" />
        </ParallaxSection>

        {/* Floating stat cards */}
        <div className="absolute top-28 right-8 z-20 hidden xl:flex flex-col gap-3">
          {[{ val: "25+", label: "лет опыта" }, { val: "500 м³", label: "бруса в месяц" }, { val: "вся РФ", label: "география" }].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.15, duration: 0.7, ease }}
              className="border border-white/10 bg-black/50 backdrop-blur-md px-5 py-3"
            >
              <div className="text-xl font-bold text-accent tracking-wide">{s.val}</div>
              <div className="text-[10px] text-white/45 uppercase tracking-[0.2em] mt-0.5">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 pb-28 pt-40">
          <div className="max-w-3xl text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease }}
              className="flex items-center gap-3 mb-8"
            >
              <motion.span className="block h-px bg-accent" initial={{ width: 0 }} animate={{ width: 32 }} transition={{ delay: 0.4, duration: 0.7, ease }} />
              <span className="text-accent text-xs font-medium uppercase tracking-[0.22em]">Томск · С 2001 года</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.85, ease }}
              className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] mb-8 tracking-tight"
            >
              Строим деревянные<br />
              <span className="font-bold">дома под ключ</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8, ease }}
              className="text-lg text-white/50 mb-12 leading-relaxed max-w-xl font-light"
            >
              Собственное производство профилированного бруса. Полный цикл от проекта до отделки. Более 25 лет опыта.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7, ease }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="btn-accent-gradient text-black font-semibold text-base h-14 px-10 rounded-none tracking-wide hover:opacity-90 transition-opacity duration-300 group" asChild>
                <Link href="/projects">
                  Посмотреть проекты
                  <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white/70 hover:bg-white/6 hover:text-white text-base h-14 px-10 rounded-none tracking-wide transition-all duration-300 bg-transparent" asChild>
                <Link href="/calculator">Рассчитать стоимость</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="absolute bottom-0 left-0 w-full border-t border-white/8 bg-black/50 backdrop-blur-sm z-10"
        >
          <div className="container mx-auto px-4 md:px-8">
            <div className="hidden md:flex justify-between items-center py-4 text-white/40 text-[10px] uppercase tracking-[0.2em]">
              {["Собственное производство", "Работаем с 2001 года", "Профилированный брус 200×300 мм"].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-4 h-px bg-accent/60" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════ ADVANTAGES ═══════════════════ */}
      <section id="advantages" className="py-32 bg-background border-b border-border" data-testid="advantages-section">
        <div className="container mx-auto px-4 md:px-8">
          <SectionLabel text="Наши преимущества" />
          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-16">
              Почему выбирают <span className="font-bold">Кедр-Томск</span>
            </h2>
          </FadeUp>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border" stagger={0.08}>
            {advantages.map((adv, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="group bg-card hover:bg-[#0e0e0e] p-10 transition-colors duration-500 cursor-default"
              >
                <motion.div
                  className="w-12 h-12 flex items-center justify-center mb-8 text-accent border border-accent/20 bg-accent/5 group-hover:bg-accent group-hover:text-black group-hover:border-accent transition-all duration-400"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <adv.icon size={24} weight="duotone" />
                </motion.div>
                <h3 className="text-base font-semibold mb-3 text-foreground tracking-tight">{adv.title}</h3>
                <motion.div
                  className="h-px bg-accent/30 mb-4"
                  initial={{ width: "1.5rem" }}
                  whileInView={{ width: "1.5rem" }}
                  whileHover={{ width: "3rem" }}
                  transition={{ duration: 0.4 }}
                />
                <p className="text-muted-foreground text-sm leading-relaxed">{adv.desc}</p>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ═══════════════════ PROJECTS ═══════════════════ */}
      <section id="projects" className="py-32 bg-background" data-testid="projects-section">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <SectionLabel text="Каталог" />
              <FadeUp delay={0.1}>
                <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight">
                  Популярные <span className="font-bold">проекты</span>
                </h2>
              </FadeUp>
            </div>
            <FadeRight>
              <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">Подберите готовый проект или закажите индивидуальный</p>
            </FadeRight>
          </div>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12" stagger={0.1}>
            {[
              { slug: "d89", name: "Проект Д89", img: "/images/projects/d89.jpg", badge: "Популярный", area: "89 м²", floors: "1 этаж", beds: "3 комнаты", price: "979 000 руб." },
              { slug: "d126", name: "Проект Д126", img: "/images/projects/d126.jpg", badge: "Хит", area: "126 м²", floors: "2 этажа", beds: "4 комнаты", price: "1 386 000 руб." },
              { slug: "d68", name: "Проект Д68", img: "/images/projects/d68.jpg", area: "68 м²", floors: "1 этаж", beds: "2 комнаты", price: "748 000 руб." },
              { slug: "d217", name: "Проект Д217", img: "/images/projects/d217.jpg", badge: "Хит", area: "217 м²", floors: "2 этажа", beds: "5 комнат", price: "2 387 000 руб." },
            ].map((proj, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="group bg-card border border-border overflow-hidden hover:border-accent/25 transition-colors duration-500"
              >
                <div className="relative h-72 overflow-hidden">
                  <motion.img
                    src={proj.img}
                    alt={proj.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7, ease }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                  {proj.badge && (
                    <Badge className="absolute top-4 left-4 bg-accent/90 text-black border-0 px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-none">
                      {proj.badge}
                    </Badge>
                  )}
                  <motion.div
                    className="absolute bottom-4 left-4 right-4"
                    initial={{ y: 12, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.35, ease }}
                  >
                    <div className="bg-black/80 backdrop-blur-sm border border-white/10 px-4 py-3 flex items-center justify-between">
                      <span className="text-white font-bold text-sm">{proj.price}</span>
                      <Link href={`/projects/${proj.slug}`} className="text-accent text-xs font-medium hover:text-white transition-colors tracking-wide flex items-center gap-1">
                        Подробнее <ArrowRight size={12} />
                      </Link>
                    </div>
                  </motion.div>
                </div>
                <div className="p-6 border-t border-border">
                  <h3 className="text-base font-semibold text-foreground mb-4 group-hover:text-accent transition-colors duration-300 tracking-tight">{proj.name}</h3>
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    {[{ label: "Площадь", val: proj.area }, { label: "Этажность", val: proj.floors }, { label: "Комнаты", val: proj.beds }].map((item) => (
                      <div key={item.label} className="text-center p-2 bg-muted border border-border">
                        <span className="block text-[10px] text-muted-foreground mb-1 uppercase tracking-wider">{item.label}</span>
                        <span className="font-semibold text-foreground text-sm">{item.val}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="text-[10px] text-muted-foreground block uppercase tracking-wider">от</span>
                      <span className="text-base font-bold text-accent">{proj.price}</span>
                    </div>
                    <Button className="bg-accent hover:bg-accent/80 text-black text-xs rounded-none px-5 tracking-wide font-semibold h-9" asChild>
                      <Link href={`/projects/${proj.slug}`}>Подробнее</Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggerChildren>

          <FadeUp>
            <div className="text-center">
              <Button size="lg" variant="outline" className="border-border text-foreground hover:border-accent hover:text-accent px-10 rounded-none tracking-wide transition-all duration-300 group" asChild>
                <Link href="/projects">
                  Смотреть все проекты
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════ STAGES ═══════════════════ */}
      <section id="stages" className="py-32 bg-card border-y border-border" data-testid="stages-section">
        <div className="container mx-auto px-4 md:px-8">
          <SectionLabel text="Процесс" />
          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-16">
              Этапы <span className="font-bold">строительства</span>
            </h2>
          </FadeUp>

          <StaggerChildren className="flex flex-col md:flex-row justify-between gap-8 md:gap-2 relative z-10" stagger={0.08} delay={0.1}>
            {[
              { title: "Консультация", desc: "бесплатно обсудим проект" },
              { title: "Проектирование", desc: "архитектурный проект" },
              { title: "Производство сруба", desc: "изготовление в цеху" },
              { title: "Доставка", desc: "транспортировка на участок" },
              { title: "Фундамент", desc: "заливка под ключ" },
              { title: "Сборка", desc: "возведение сруба и кровли" },
              { title: "Отделка и сдача", desc: "чистовая отделка" },
            ].map((step, i) => (
              <motion.div
                key={i}
                variants={staggerItem}
                className="flex md:flex-col items-center md:text-center gap-4 md:gap-2 flex-1 group"
              >
                <motion.div
                  className="w-10 h-10 border border-border bg-background text-muted-foreground font-bold text-sm flex items-center justify-center shrink-0 group-hover:border-accent group-hover:text-accent group-hover:bg-accent/5 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm mb-1 md:mt-3 tracking-tight">{step.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </StaggerChildren>

          <FadeUp delay={0.2}>
            <div className="mt-16">
              <Button variant="outline" className="border-border text-foreground hover:border-accent hover:text-accent rounded-none tracking-wide transition-all duration-300 group" asChild>
                <Link href="/stages">
                  Подробнее об этапах
                  <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════ ABOUT ═══════════════════ */}
      <section id="about" className="py-32 bg-[#080b09]" data-testid="about-section">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-20 items-center">
            <FadeLeft className="lg:w-1/2">
              <div className="flex items-center gap-3 mb-6">
                <motion.span className="block h-px bg-accent" initial={{ width: 0 }} whileInView={{ width: 32 }} viewport={{ once: true }} transition={{ duration: 0.7, ease }} />
                <span className="text-accent text-xs uppercase tracking-[0.22em] font-medium">О компании</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-light text-white mb-8 tracking-tight leading-tight">
                Кедр-Томск —<br /><span className="font-bold">25 лет традиций</span>
              </h2>
              <p className="text-white/45 mb-12 leading-relaxed font-light text-lg">
                Строительство деревянных домов, коттеджей и бань под ключ из профилированного бруса и рубленого бревна. Собственная производственная площадка в г. Томске.
              </p>
              <StaggerChildren className="grid grid-cols-2 gap-8 mb-12" stagger={0.08}>
                {[{ val: "25+", label: "лет опыта" }, { val: "150+", label: "построенных домов" }, { val: "200+", label: "готовых проектов" }, { val: "вся РФ", label: "география работ" }].map((stat, i) => (
                  <motion.div key={i} variants={staggerItem} className="border-l-2 border-accent/30 pl-5">
                    <div className="text-3xl font-bold text-accent mb-1">{stat.val}</div>
                    <div className="text-[10px] text-white/35 uppercase tracking-[0.2em]">{stat.label}</div>
                  </motion.div>
                ))}
              </StaggerChildren>
              <Button variant="outline" className="border-white/15 text-white/60 hover:border-accent hover:text-accent rounded-none tracking-wide transition-all duration-300 bg-transparent group" asChild>
                <Link href="/about">
                  Подробнее о нас
                  <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </FadeLeft>

            <FadeRight className="lg:w-1/2 w-full">
              <ScaleIn>
                <div className="relative">
                  <img src="/images/production/prod-1.jpg" alt="Наше производство" className="w-full object-cover" style={{ aspectRatio: "4/3" }} />
                  <div className="absolute inset-0 border border-white/5 pointer-events-none" />
                  <motion.div
                    className="absolute -bottom-4 -right-4 w-24 h-24 border border-accent/20 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5, ease }}
                  >
                    <div className="text-2xl font-bold text-accent">25+</div>
                    <div className="text-[9px] text-white/40 uppercase tracking-wider text-center mt-0.5">лет<br />опыта</div>
                  </motion.div>
                </div>
              </ScaleIn>
            </FadeRight>
          </div>
        </div>
      </section>

      {/* ═══════════════════ SERVICES ═══════════════════ */}
      <section id="services" className="py-32 bg-background" data-testid="services-section">
        <div className="container mx-auto px-4 md:px-8">
          <SectionLabel text="Услуги" />
          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-16">
              Что мы <span className="font-bold">строим</span>
            </h2>
          </FadeUp>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" stagger={0.07}>
            {services.map((service, i) => (
              <motion.div key={i} variants={staggerItem}>
                <Link href="/services">
                  <div className="group relative overflow-hidden aspect-[4/3] cursor-pointer border border-border hover:border-accent/30 transition-colors duration-500">
                    <motion.img
                      src={service.img}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.7, ease }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-black transition-all duration-300">
                          <service.icon size={16} weight="duotone" />
                        </div>
                        <motion.div className="h-px bg-accent/50" initial={{ width: "1rem" }} whileHover={{ width: "2.5rem" }} transition={{ duration: 0.4 }} />
                      </div>
                      <h3 className="text-sm font-semibold text-white tracking-tight mb-2">{service.title}</h3>
                      <p className="text-xs text-white/50 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-400 line-clamp-2">{service.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ═══════════════════ STATS ═══════════════════ */}
      <section id="stats" className="py-24 bg-black border-y border-border" data-testid="stats-section">
        <div className="container mx-auto px-4 md:px-8">
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4" stagger={0.1}>
            {[
              { val: <CountUp to={25} suffix="+" duration={1600} />, label: "Лет на рынке" },
              { val: <CountUp to={500} duration={1800} />, label: "М³ бруса в месяц" },
              { val: <CountUp to={320} suffix="+" duration={2000} />, label: "Построенных домов" },
              { val: "вся РФ", label: "География работ" },
            ].map((stat, i) => (
              <motion.div key={i} variants={staggerItem} className="text-center py-4 border-r border-border last:border-0">
                <motion.div
                  className="text-5xl md:text-6xl font-bold text-accent mb-3 tracking-tight"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                >
                  {stat.val}
                </motion.div>
                <div className="text-white/35 text-[10px] uppercase tracking-[0.2em]">{stat.label}</div>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
      <section id="testimonials" className="py-32 bg-background" data-testid="testimonials-section">
        <div className="container mx-auto px-4 md:px-8">
          <SectionLabel text="Отзывы" />
          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-16">
              Что говорят <span className="font-bold">клиенты</span>
            </h2>
          </FadeUp>

          <ScaleIn>
            <div className="max-w-4xl">
              <div className="relative bg-card border border-border p-10 md:p-14 overflow-hidden">
                <div className="absolute top-6 right-8 text-8xl text-accent/6 font-serif leading-none select-none">"</div>
                <div className="flex items-center gap-1 mb-6">
                  {Array.from({ length: testimonials[reviewIdx].rating }).map((_, i) => (
                    <Star key={i} size={14} weight="fill" color="#C4922A" />
                  ))}
                </div>
                <motion.p
                  key={reviewIdx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="text-xl text-foreground/75 leading-relaxed mb-10 relative z-10 font-light"
                >
                  {testimonials[reviewIdx].text}
                </motion.p>
                <div className="flex items-center justify-between flex-wrap gap-4 pt-8 border-t border-border">
                  <motion.div key={`meta-${reviewIdx}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
                    <div className="font-semibold text-foreground tracking-tight">{testimonials[reviewIdx].name}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] mt-1">
                      {testimonials[reviewIdx].city} · {testimonials[reviewIdx].year} · {testimonials[reviewIdx].type}
                    </div>
                  </motion.div>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setReviewIdx((i) => (i - 1 + testimonials.length) % testimonials.length)} className="w-9 h-9 border border-border flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent transition-all duration-200">
                      <CaretLeft size={16} />
                    </button>
                    <span className="text-xs text-muted-foreground tracking-widest">
                      {String(reviewIdx + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
                    </span>
                    <button onClick={() => setReviewIdx((i) => (i + 1) % testimonials.length)} className="w-9 h-9 border border-border flex items-center justify-center text-muted-foreground hover:border-accent hover:text-accent transition-all duration-200">
                      <CaretRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-start gap-2 mt-5 pl-2">
                {testimonials.map((_, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setReviewIdx(i)}
                    className={`rounded-full transition-all duration-300 ${i === reviewIdx ? "bg-accent" : "bg-border hover:bg-accent/40"}`}
                    animate={{ width: i === reviewIdx ? 24 : 8, height: 6 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>

              <StaggerChildren className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8" stagger={0.06}>
                {testimonials.filter((_, i) => i !== reviewIdx).slice(0, 3).map((t, idx) => (
                  <motion.button
                    key={idx}
                    variants={staggerItem}
                    onClick={() => setReviewIdx(testimonials.indexOf(t))}
                    className="text-left bg-card border border-border p-5 hover:border-accent/30 transition-all duration-200 text-sm"
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={10} weight="fill" color="#C4922A" />)}
                    </div>
                    <div className="text-foreground/65 line-clamp-2 leading-snug mb-3 text-xs">{t.text}</div>
                    <div className="font-semibold text-foreground text-xs">{t.name}</div>
                    <div className="text-muted-foreground text-[10px] uppercase tracking-wider mt-0.5">{t.city} · {t.year}</div>
                  </motion.button>
                ))}
              </StaggerChildren>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* ═══════════════════ CALLBACK ═══════════════════ */}
      <section id="callback" className="py-32 bg-card border-y border-border" data-testid="callback-section">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <SectionLabel text="Связаться" />
          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-4">
              Остались <span className="font-bold">вопросы?</span>
            </h2>
            <p className="text-muted-foreground mb-10 font-light">Оставьте номер — наш инженер перезвонит в течение 15 минут</p>
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
                        <Input placeholder="+7 (999) 000-00-00" className="h-14 text-base bg-background border-border focus:border-accent rounded-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="h-14 px-10 text-base bg-accent hover:bg-accent/85 text-black rounded-none tracking-wide font-semibold">
                  Жду звонка
                </Button>
              </form>
            </Form>
            <p className="text-[10px] text-muted-foreground mt-4 uppercase tracking-widest">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section id="faq" className="py-32 bg-background" data-testid="faq-section">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <SectionLabel text="FAQ" />
          <FadeUp delay={0.1}>
            <h2 className="text-4xl md:text-5xl font-light text-foreground tracking-tight mb-16">
              Частые <span className="font-bold">вопросы</span>
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
                    <AccordionTrigger className="text-left font-medium text-base text-foreground hover:text-accent tracking-tight py-6 hover:no-underline">{item.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base pb-6 font-light leading-relaxed">{item.a}</AccordionContent>
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
