import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Shield, Wrench, Factory, Clock, CheckCircle, Leaf
} from "lucide-react";
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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  phone: z.string().min(10, "Минимум 10 символов"),
});

export default function Home() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    toast({
      title: "Заявка принята!",
      description: "Перезвоним в течение 15 минут",
    });
    form.reset();
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll(".fade-in-section").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id.substring(1));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO */}
      <section
        id="home"
        className="relative min-h-[94vh] flex items-center overflow-hidden"
        data-testid="hero-section"
      >
        {/* Background with parallax-feel */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/gallery/gallery-4.jpg"
            alt="Деревянный дом"
            className="w-full h-full object-cover scale-105"
            style={{ transformOrigin: "center center" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/92 via-primary/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
        </div>

        {/* Floating glass badges — top right */}
        <div className="absolute top-28 right-8 z-20 hidden xl:flex flex-col gap-4">
          <div className="glass rounded-2xl px-5 py-4 text-white float-slow">
            <div className="text-2xl font-bold text-accent">25+</div>
            <div className="text-xs text-white/80">лет опыта</div>
          </div>
          <div className="glass rounded-2xl px-5 py-4 text-white float-mid">
            <div className="text-2xl font-bold text-accent">500 м³</div>
            <div className="text-xs text-white/80">бруса в месяц</div>
          </div>
          <div className="glass rounded-2xl px-5 py-4 text-white float-fast">
            <div className="text-2xl font-bold text-accent">вся РФ</div>
            <div className="text-xs text-white/80">география</div>
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 md:px-8 relative z-10 py-28">
          <div className="max-w-2xl text-white">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-medium mb-8 animate-slide-up">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              Томск • С 2001 года
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 animate-slide-up delay-100">
              Строим деревянные<br className="hidden md:block" /> дома под ключ
            </h1>
            <p className="text-lg md:text-xl text-white/75 mb-10 leading-relaxed animate-slide-up delay-200 max-w-lg">
              Собственное производство профилированного бруса. Полный цикл от проекта до отделки. Более 25 лет опыта.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-300">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white text-lg h-14 px-8 shadow-lg hover:shadow-accent/40 hover:scale-105 transition-all duration-300 shimmer"
                asChild
              >
                <Link href="/projects">Посмотреть проекты</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="glass border-white/30 text-white hover:bg-white/20 text-lg h-14 px-8 transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="/contacts">Рассчитать стоимость</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom glass bar */}
        <div className="absolute bottom-0 left-0 w-full glass-dark border-t border-white/10 z-10 hidden md:block">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex justify-between items-center py-4 text-white/90 font-medium text-sm lg:text-base">
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-accent" />
                <span>Собственное производство в Томске</span>
              </div>
              <div className="w-px h-5 bg-white/20"></div>
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-accent" />
                <span>Работаем с 2001 года</span>
              </div>
              <div className="w-px h-5 bg-white/20"></div>
              <div className="flex items-center gap-2">
                <CheckCircle size={18} className="text-accent" />
                <span>Профилированный брус 200×300 мм</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section id="advantages" className="py-24 bg-background" data-testid="advantages-section">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary fade-in-section">Почему выбирают Кедр-Томск</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: "Более 25 лет на рынке", desc: "Строим качественные дома с 2001 года. Сотни довольных клиентов по всей России" },
              { icon: Factory, title: "Собственное производство", desc: "Собственная площадка в промзоне Томска. До 500 м³ профилированного бруса в месяц" },
              { icon: Wrench, title: "Полный цикл под ключ", desc: "От проекта до ключей в руках: один подрядчик, ноль субподрядчиков" },
              { icon: Clock, title: "Строгие сроки, фиксированная цена", desc: "Фиксируем сроки и стоимость в договоре. Штраф за каждый день просрочки" },
              { icon: CheckCircle, title: "Гарантия на все работы", desc: "Гарантия 5 лет на конструктив и 2 года на отделочные работы" },
              { icon: Leaf, title: "Экологичные материалы", desc: "Строим из кедра, сосны и лиственницы — натуральное дерево без синтетики" },
            ].map((adv, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-2xl p-8 border border-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-400 overflow-hidden fade-in-section cursor-default"
              >
                {/* Glass shimmer overlay on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-accent/5 to-transparent rounded-2xl"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300 group-hover:scale-110">
                    <adv.icon size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-primary group-hover:text-accent transition-colors duration-300">{adv.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{adv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 bg-muted/50" data-testid="projects-section">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16 fade-in-section">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Популярные проекты</h2>
            <p className="text-lg text-muted-foreground">Подберите готовый проект или закажите индивидуальный</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {[
              { slug: "d89", name: "Проект Д89", img: "/images/projects/d89.jpg", badge: "Популярный", area: "89 м²", floors: "1 этаж", beds: "3 комнаты", price: "979 000 руб." },
              { slug: "d126", name: "Проект Д126", img: "/images/projects/d126.jpg", badge: "Хит", area: "126 м²", floors: "2 этажа", beds: "4 комнаты", price: "1 386 000 руб." },
              { slug: "d68", name: "Проект Д68", img: "/images/projects/d68.jpg", area: "68 м²", floors: "1 этаж", beds: "2 комнаты", price: "748 000 руб." },
              { slug: "d217", name: "Проект Д217", img: "/images/projects/d217.jpg", badge: "Хит", area: "217 м²", floors: "2 этажа", beds: "5 комнат", price: "2 387 000 руб." },
            ].map((proj, i) => (
              <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-border hover:-translate-y-1 fade-in-section">
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={proj.img}
                    alt={proj.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Glass overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400"></div>
                  {proj.badge && (
                    <Badge className="absolute top-4 left-4 glass text-white border-white/30 px-3 py-1 text-sm font-semibold">
                      {proj.badge}
                    </Badge>
                  )}
                  {/* Price badge on hover */}
                  <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                    <div className="glass rounded-xl px-4 py-2 flex items-center justify-between">
                      <span className="text-white/80 text-sm">от</span>
                      <span className="text-white font-bold text-lg">{proj.price}</span>
                      <Link href={`/projects/${proj.slug}`} className="text-accent font-semibold text-sm hover:text-white transition-colors">
                        Подробнее →
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-accent transition-colors duration-300">{proj.name}</h3>
                  <div className="grid grid-cols-3 gap-2 mb-5">
                    <div className="text-center p-2 bg-muted rounded-xl">
                      <span className="block text-xs text-muted-foreground mb-1">Площадь</span>
                      <span className="font-semibold text-foreground text-sm">{proj.area}</span>
                    </div>
                    <div className="text-center p-2 bg-muted rounded-xl">
                      <span className="block text-xs text-muted-foreground mb-1">Этажность</span>
                      <span className="font-semibold text-foreground text-sm">{proj.floors}</span>
                    </div>
                    <div className="text-center p-2 bg-muted rounded-xl">
                      <span className="block text-xs text-muted-foreground mb-1">Комнаты</span>
                      <span className="font-semibold text-foreground text-sm">{proj.beds}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="text-xs text-muted-foreground block">от</span>
                      <span className="text-lg font-bold text-primary">{proj.price}</span>
                    </div>
                    <Button className="bg-accent hover:bg-primary text-white hover:scale-105 transition-all duration-200" asChild>
                      <Link href={`/projects/${proj.slug}`}>Подробнее</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center fade-in-section">
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8" asChild>
              <Link href="/projects">Смотреть все проекты</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* STAGES */}
      <section id="stages" className="py-24 bg-background" data-testid="stages-section">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary fade-in-section">Этапы строительства</h2>
          
          <div className="relative fade-in-section">
            {/* Desktop timeline line */}
            <div className="hidden md:block absolute top-6 left-[5%] right-[5%] h-1 bg-muted -z-10"></div>
            
            <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-4 relative z-10">
              {[
                { title: "Консультация", desc: "бесплатно обсудим проект" },
                { title: "Проектирование", desc: "архитектурный проект" },
                { title: "Производство сруба", desc: "изготовление в цеху" },
                { title: "Доставка", desc: "транспортировка на участок" },
                { title: "Фундамент", desc: "заливка под ключ" },
                { title: "Сборка", desc: "возведение сруба и кровли" },
                { title: "Отделка и сдача", desc: "чистовая отделка" },
              ].map((step, i) => (
                <div key={i} className="flex md:flex-col items-center md:text-center gap-4 md:gap-2 flex-1 group">
                  {/* Mobile timeline line */}
                  {i !== 0 && <div className="md:hidden absolute left-6 -top-4 w-0.5 h-8 bg-muted -z-10"></div>}
                  
                  <div className="w-12 h-12 rounded-full bg-white border-4 border-accent text-accent font-bold text-xl flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:text-white transition-colors shadow-md">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1 md:mt-4">{step.title}</h4>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-16 fade-in-section">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" asChild>
              <Link href="/stages">Подробнее об этапах</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-primary text-white" data-testid="about-section">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2 fade-in-section">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">О компании Кедр-Томск</h2>
              <p className="text-lg text-white/80 mb-10 leading-relaxed">
                Направленность нашей компании — строительство деревянных домов, коттеджей и бань под ключ из профилированного бруса и рубленого бревна. Собственная производственная площадка в г. Томске — изготавливаем до 500 м³ профилированного бруса в месяц. Работаем с 2001 года.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="border-l-4 border-accent pl-4">
                  <div className="text-4xl font-bold text-accent mb-1">25+</div>
                  <div className="text-sm text-white/70">лет опыта</div>
                </div>
                <div className="border-l-4 border-accent pl-4">
                  <div className="text-4xl font-bold text-accent mb-1">150+</div>
                  <div className="text-sm text-white/70">построенных домов</div>
                </div>
                <div className="border-l-4 border-accent pl-4">
                  <div className="text-4xl font-bold text-accent mb-1">200+</div>
                  <div className="text-sm text-white/70">готовых проектов</div>
                </div>
                <div className="border-l-4 border-accent pl-4">
                  <div className="text-4xl font-bold text-accent mb-1">вся РФ</div>
                  <div className="text-sm text-white/70">география работ</div>
                </div>
              </div>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link href="/about">Подробнее о нас</Link>
              </Button>
            </div>
            <div className="lg:w-1/2 w-full fade-in-section">
              <img 
                src="/images/production/prod-1.jpg" 
                alt="Наше производство" 
                className="rounded-xl shadow-2xl w-full object-cover border-4 border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 bg-muted/30" data-testid="services-section">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary fade-in-section">Наши услуги</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Дома из профилированного бруса", img: "/images/projects/d126.jpg", desc: "Тёплый и надёжный дом из сухого профилированного бруса собственного производства" },
              { title: "Дома из рубленого бревна", img: "/images/gallery/gallery-6.jpg", desc: "Классическое ручное рубление — традиции сибирского зодчества в современном исполнении" },
              { title: "Бани и сауны", img: "/images/gallery/gallery-5.jpg", desc: "Бани из кедра и лиственницы — настоящий русский пар для здоровья и удовольствия" },
              { title: "Каркасные дома", img: "/images/gallery/gallery-7.jpg", desc: "Быстровозводимые каркасные дома — экономия времени и бюджета без потери качества" },
              { title: "Коттеджи и постройки", img: "/images/projects/d236.jpg", desc: "Строительство коттеджей любой этажности и сложности под ключ" },
              { title: "Проектирование", img: "/images/about/about-7.jpg", desc: "Разработка индивидуальных архитектурных проектов с нуля — бесплатная консультация" },
            ].map((service, i) => (
              <Link key={i} href="/services">
                <div className="group relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer fade-in-section">
                  <img 
                    src={service.img} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold text-white mb-2 transform group-hover:-translate-y-1 transition-transform duration-300">{service.title}</h3>
                    <div className="w-10 h-0.5 bg-accent mb-3"></div>
                    <p className="text-sm text-white/80 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">{service.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section id="stats" className="py-16 bg-primary" data-testid="stats-section">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center fade-in-section">
            <div>
              <div className="text-5xl md:text-6xl font-bold text-accent mb-2">25+</div>
              <div className="text-white font-medium">Лет на рынке</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold text-accent mb-2">500</div>
              <div className="text-white font-medium">М³ бруса в месяц</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold text-accent mb-2">2</div>
              <div className="text-white font-medium">Башенных крана</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-bold text-accent mb-2">вся РФ</div>
              <div className="text-white font-medium">География работ</div>
            </div>
          </div>
        </div>
      </section>

      {/* CALLBACK FORM */}
      <section id="callback" className="py-24 bg-background" data-testid="callback-section">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl fade-in-section">
          <div className="bg-muted p-8 md:p-12 rounded-2xl border border-border">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-primary mb-4">Остались вопросы?</h2>
              <p className="text-lg text-muted-foreground">Оставьте номер, и наш инженер свяжется с вами в течение 15 минут</p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input 
                          placeholder="+7 (999) 000-00-00" 
                          className="h-14 text-lg bg-white"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="h-14 px-8 text-lg bg-accent hover:bg-primary text-white">
                  Жду звонка
                </Button>
              </form>
            </Form>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-muted/30" data-testid="faq-section">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl fade-in-section">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">Частые вопросы</h2>
          
          <Accordion type="single" collapsible className="w-full bg-white rounded-xl p-2 border border-border shadow-sm">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-semibold text-lg px-4 hover:text-accent">В каком виде сдаются дома?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-4 text-base">
                Мы строим дома "под ключ" или "под усадку". Базовая комплектация "под усадку" включает фундамент, сруб, стропильную систему и кровлю. Комплектация "под ключ" дополняется окнами, дверями, инженерными сетями и чистовой отделкой.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-semibold text-lg px-4 hover:text-accent">Сколько времени занимает строительство?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-4 text-base">
                Сборка сруба на участке занимает от 2 до 4 недель в зависимости от площади дома. Изготовление домокомплекта на производстве — около 3-4 недель. Весь цикл от договора до сдачи базовой комплектации занимает в среднем 2 месяца.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-semibold text-lg px-4 hover:text-accent">Можно ли изменить проект из каталога?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-4 text-base">
                Да, любой проект из каталога можно изменить под ваши нужды: передвинуть стены, добавить окно, изменить тип фундамента или материал кровли. Эти изменения вносятся нашими архитекторами бесплатно при заключении договора на строительство.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left font-semibold text-lg px-4 hover:text-accent">Как происходит оплата?</AccordionTrigger>
              <AccordionContent className="text-muted-foreground px-4 text-base">
                Оплата разбивается на несколько этапов, привязанных к ходу строительства: предоплата на закупку материала, оплата по факту готовности домокомплекта, оплата после устройства фундамента и окончательный расчет после сдачи дома.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}
