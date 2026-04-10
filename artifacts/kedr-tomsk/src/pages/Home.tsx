import React, { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  TreePine, Menu, X, Phone, Shield, Wrench, Factory, 
  Clock, TrendingDown, CheckCircle 
} from "lucide-react";
import { FaVk, FaTelegram, FaYoutube } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const navLinks = [
    { label: "Главная", href: "#home" },
    { label: "Проекты", href: "#projects" },
    { label: "Услуги", href: "#services" },
    { label: "О компании", href: "#about" },
    { label: "Этапы", href: "#stages" },
    { label: "Контакты", href: "#footer" },
  ];

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id.substring(1));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* HEADER */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-3" : "bg-white/95 py-5"
        }`}
        data-testid="header-nav"
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <a href="#home" onClick={(e) => scrollTo(e, "#home")} className="flex items-center gap-2 text-primary">
            <TreePine size={28} className="text-primary" />
            <span className="text-xl font-bold tracking-tight">Кедр-Томск</span>
          </a>
          
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href} 
                onClick={(e) => scrollTo(e, link.href)}
                className="text-sm font-medium text-foreground hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+73822000000" className="text-sm font-bold text-foreground hover:text-accent">+7 (3822) 000-000</a>
            <Button variant="outline" className="border-border hover:bg-muted" asChild>
              <a href="#callback" onClick={(e) => scrollTo(e, "#callback")}>Заказать звонок</a>
            </Button>
            <Button className="bg-accent hover:bg-primary text-white" asChild>
              <a href="#projects" onClick={(e) => scrollTo(e, "#projects")}>Рассчитать стоимость</a>
            </Button>
          </div>
          
          <button 
            className="lg:hidden text-foreground p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t py-4 flex flex-col px-4 gap-4">
            {navLinks.map((link) => (
              <a 
                key={link.label} 
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="text-lg font-medium text-foreground py-2 border-b border-border/50"
              >
                {link.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 mt-2">
              <a href="tel:+73822000000" className="text-lg font-bold text-center py-2">+7 (3822) 000-000</a>
              <Button variant="outline" className="w-full" asChild>
                <a href="#callback" onClick={(e) => scrollTo(e, "#callback")}>Заказать звонок</a>
              </Button>
              <Button className="bg-accent hover:bg-primary text-white w-full" asChild>
                <a href="#projects" onClick={(e) => scrollTo(e, "#projects")}>Рассчитать стоимость</a>
              </Button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow pt-20">
        {/* HERO */}
        <section 
          id="home" 
          className="relative min-h-[90vh] flex items-center"
          data-testid="hero-section"
        >
          <div className="absolute inset-0 z-0">
            <img 
              src="https://picsum.photos/seed/woodhouse1/1920/1080" 
              alt="Деревянный дом" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/30"></div>
          </div>
          
          <div className="container mx-auto px-4 md:px-8 relative z-10 py-20 fade-in-section visible">
            <div className="max-w-2xl text-white">
              <div className="inline-block px-4 py-1.5 border border-accent rounded-full text-sm font-medium mb-6">
                Томск • С 2014 года
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Строительство деревянных домов
              </h1>
              <p className="text-lg md:text-xl text-white/70 mb-10 leading-relaxed">
                Мы предлагаем решения от профессионалов в постройке деревянных домов под ключ по конкурентным ценам.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-accent hover:bg-primary text-white text-lg h-14 px-8" asChild>
                  <a href="#projects" onClick={(e) => scrollTo(e, "#projects")}>Посмотреть проекты</a>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary text-lg h-14 px-8 bg-transparent" asChild>
                  <a href="#callback" onClick={(e) => scrollTo(e, "#callback")}>Рассчитать стоимость</a>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full bg-primary/80 backdrop-blur-md border-t border-white/10 z-10 hidden md:block">
            <div className="container mx-auto px-4 md:px-8">
              <div className="flex justify-between items-center py-4 text-white/90 font-medium text-sm lg:text-base">
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-accent" />
                  <span>Собственное производство в Томске</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-accent" />
                  <span>Более 10 лет опыта</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-accent" />
                  <span>Гарантия 100%</span>
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
                { icon: Shield, title: "Более 10 лет опыта", desc: "Строим качественные дома с 2014 года. Сотни довольных клиентов по всей Сибири" },
                { icon: Wrench, title: "Полный цикл под ключ", desc: "От проекта до ключей в руках: один подрядчик, ноль субподрядчиков" },
                { icon: Factory, title: "Собственное производство", desc: "Собственная площадка в промзоне Томска. Профилированный брус изготавливается у нас" },
                { icon: Clock, title: "Строгое соблюдение сроков", desc: "Фиксируем сроки в договоре. Штраф за каждый день просрочки" },
                { icon: TrendingDown, title: "Цены ниже рыночных", desc: "Прямое производство исключает наценку посредников. Экономия 15–20%" },
                { icon: CheckCircle, title: "100% гарантия на работы", desc: "Гарантия 5 лет на конструктив и 2 года на отделочные работы" },
              ].map((adv, i) => (
                <Card key={i} className="border-border hover:-translate-y-2 transition-transform duration-300 shadow-md hover:shadow-xl fade-in-section">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6 text-accent">
                      <adv.icon size={32} />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-primary">{adv.title}</h3>
                    <p className="text-muted-foreground">{adv.desc}</p>
                  </CardContent>
                </Card>
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
                { name: "Кедровый 8x10", seed: "woodhouse2", badge: "Хит", area: "120m²", floors: "1.5 этажа", beds: "4 спальни", price: "2 450 000 руб" },
                { name: "Таёжный 10x12", seed: "woodhouse3", badge: "Новинка", area: "180m²", floors: "2 этажа", beds: "5 спален", price: "3 800 000 руб" },
                { name: "Сибирский 6x8", seed: "woodhouse4", area: "90m²", floors: "1 этаж", beds: "3 спальни", price: "1 650 000 руб" },
                { name: "Томский 12x14", seed: "woodhouse5", badge: "Хит", area: "280m²", floors: "2 этажа", beds: "6 спален", price: "5 200 000 руб" },
              ].map((proj, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-border group fade-in-section">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={`https://picsum.photos/seed/${proj.seed}/800/600`} 
                      alt={proj.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {proj.badge && (
                      <Badge className="absolute top-4 left-4 bg-accent text-white px-3 py-1 text-sm">{proj.badge}</Badge>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-primary mb-4">{proj.name}</h3>
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      <div className="text-center p-2 bg-muted rounded-lg">
                        <span className="block text-xs text-muted-foreground mb-1">Площадь</span>
                        <span className="font-semibold text-foreground">{proj.area}</span>
                      </div>
                      <div className="text-center p-2 bg-muted rounded-lg">
                        <span className="block text-xs text-muted-foreground mb-1">Этажность</span>
                        <span className="font-semibold text-foreground">{proj.floors}</span>
                      </div>
                      <div className="text-center p-2 bg-muted rounded-lg">
                        <span className="block text-xs text-muted-foreground mb-1">Комнаты</span>
                        <span className="font-semibold text-foreground">{proj.beds}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
                      <div>
                        <span className="text-sm text-muted-foreground block">Стоимость:</span>
                        <span className="text-xl font-bold text-primary">от {proj.price}</span>
                      </div>
                      <Button className="bg-accent hover:bg-primary text-white">Подробнее</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center fade-in-section">
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white px-8">
                Смотреть все проекты
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
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-24 bg-primary text-white" data-testid="about-section">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2 fade-in-section">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">О компании Кедр-Томск</h2>
                <p className="text-lg text-white/80 mb-10 leading-relaxed">
                  Направленность нашей компании – строительство малоэтажных домов из натурального дерева. Наша собственная производственная площадка расположена в промзоне г. Томска, где мы изготавливаем профилированный и оцилиндрованный брус. Работаем по всей России с 2014 года.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="border-l-4 border-accent pl-4">
                    <div className="text-4xl font-bold text-accent mb-1">10+</div>
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
              </div>
              <div className="lg:w-1/2 w-full fade-in-section">
                <img 
                  src="https://picsum.photos/seed/workshop1/800/600" 
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: "Дома из профилированного бруса", img: "timber1" },
                { title: "Дома из рубленного бревна", img: "log1" },
                { title: "Бани и беседки", img: "sauna1" },
                { title: "Коттеджи и постройки", img: "cottage1" },
              ].map((service, i) => (
                <div key={i} className="group relative overflow-hidden rounded-xl aspect-[4/3] cursor-pointer fade-in-section">
                  <img 
                    src={`https://picsum.photos/seed/${service.img}/800/600`} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent flex flex-col justify-end p-8">
                    <h3 className="text-2xl font-bold text-white mb-2 transform group-hover:-translate-y-2 transition-transform duration-300">{service.title}</h3>
                    <div className="w-12 h-1 bg-accent mb-4 transform group-hover:-translate-y-2 transition-transform duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STATS BAR */}
        <section id="stats" className="py-16 bg-primary" data-testid="stats-section">
          <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center fade-in-section">
              <div>
                <div className="text-5xl md:text-6xl font-bold text-accent mb-2">10+</div>
                <div className="text-white/80 font-medium uppercase tracking-wider text-sm">лет на рынке</div>
              </div>
              <div>
                <div className="text-5xl md:text-6xl font-bold text-accent mb-2">150+</div>
                <div className="text-white/80 font-medium uppercase tracking-wider text-sm">построенных домов</div>
              </div>
              <div>
                <div className="text-5xl md:text-6xl font-bold text-accent mb-2">1</div>
                <div className="text-white/80 font-medium uppercase tracking-wider text-sm">собственное производство</div>
              </div>
              <div>
                <div className="text-5xl md:text-6xl font-bold text-accent mb-2 text-3xl sm:text-5xl md:text-6xl">Вся РФ</div>
                <div className="text-white/80 font-medium uppercase tracking-wider text-sm">география работ</div>
              </div>
            </div>
          </div>
        </section>

        {/* CALLBACK */}
        <section id="callback" className="py-24 bg-accent text-white" data-testid="callback-section">
          <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center fade-in-section">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Мы сами вам позвоним</h2>
            <p className="text-lg text-white/90 mb-10">Оставьте номер и мы перезвоним вам в течение 15 минут</p>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto items-start">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="w-full flex-grow text-left">
                      <FormControl>
                        <Input 
                          placeholder="+7 (___) ___-__-__" 
                          className="h-14 text-lg bg-white text-foreground border-transparent focus-visible:ring-primary" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage className="text-white bg-destructive/80 px-2 py-1 rounded inline-block mt-1" />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" className="h-14 px-8 bg-primary hover:bg-primary/90 text-white w-full sm:w-auto text-lg font-medium whitespace-nowrap">
                  Заказать звонок
                </Button>
              </form>
            </Form>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-24 bg-background" data-testid="faq-section">
          <div className="container mx-auto px-4 md:px-8 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-primary fade-in-section">Часто задаваемые вопросы</h2>
            
            <div className="fade-in-section">
              <Accordion type="single" collapsible className="w-full">
                {[
                  { q: "Сколько стоит строительство дома из бруса?", a: "Стоимость зависит от площади, этажности и материала. Дом 100 м² обойдётся от 1,5 млн рублей. Точную цену рассчитаем на консультации." },
                  { q: "Как долго строится дом?", a: "Дом 100–150 м² строится 4–6 месяцев в зависимости от проекта и сезона." },
                  { q: "Вы работаете только в Томске?", a: "Нет, работаем по всей России. Производство в Томске, доставка и строительство — в любом регионе." },
                  { q: "Какая гарантия на постройку?", a: "5 лет на конструктив, 2 года на отделку. Все условия в договоре." },
                  { q: "Можно ли заказать индивидуальный проект?", a: "Да, архитекторы разработают проект под ваши пожелания. Первичная консультация — бесплатно." },
                  { q: "Что входит в стоимость под ключ?", a: "Фундамент, сруб, кровля, окна, двери, чистовая отделка, инженерные сети — до состояния готового к проживанию дома." },
                ].map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-border">
                    <AccordionTrigger className="text-left text-lg font-medium text-foreground hover:text-accent py-4">{faq.q}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base pb-4">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer id="footer" className="bg-primary text-white pt-16 pb-8" data-testid="footer-section">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 border-b border-white/10 pb-12">
            <div>
              <div className="flex items-center gap-2 text-white mb-4">
                <TreePine size={28} className="text-accent" />
                <span className="text-2xl font-bold tracking-tight">Кедр-Томск</span>
              </div>
              <p className="text-white/60 max-w-sm">Строим деревянные дома с душой. Ваш надежный партнер в создании уютного и долговечного жилья.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Навигация</h4>
              <ul className="grid grid-cols-2 gap-3">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} onClick={(e) => scrollTo(e, link.href)} className="text-white/70 hover:text-accent transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-wider">Контакты</h4>
              <ul className="flex flex-col gap-4 text-white/70">
                <li>ул. Профсоюзная, 2/67 стр.3, г. Томск</li>
                <li><a href="tel:+73822000000" className="hover:text-accent transition-colors text-lg font-semibold text-white">+7 (3822) 000-000</a></li>
                <li><a href="mailto:info@kedr-tomsk.ru" className="hover:text-accent transition-colors">info@kedr-tomsk.ru</a></li>
              </ul>
              
              <div className="flex gap-4 mt-6">
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors text-white">
                  <FaVk size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors text-white">
                  <FaTelegram size={20} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors text-white">
                  <FaYoutube size={20} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center text-white/40 text-sm">
            © 2026 Кедр-Томск. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}
