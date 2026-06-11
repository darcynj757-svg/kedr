import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageHero from "@/components/PageHero";

const stages = [
  {
    num: "01",
    title: "Знакомство",
    duration: "1 неделя",
    desc: "Обсуждаем проект, показываем портфолио, выезжаем на участок. Никаких обязательств — только знакомство и честная оценка возможностей.",
    image: "/images/about/about-8.jpg",
    points: ["Бесплатная консультация", "Выезд инженера на участок", "Предварительный расчёт стоимости"],
  },
  {
    num: "02",
    title: "Договор",
    duration: "1–2 недели",
    desc: "Фиксируем все условия, стоимость и сроки в договоре. Назначаем персонального менеджера, согласуем план работ.",
    image: "/images/about/about-7.jpg",
    points: ["Фиксация цены", "График платежей", "Гарантии сроков"],
  },
  {
    num: "03",
    title: "Проектирование",
    duration: "4–8 недель",
    desc: "Архитектор разрабатывает индивидуальный проект с учётом особенностей вашего участка. Согласуем каждую деталь.",
    image: "/images/about/about-3.jpg",
    points: ["Эскизный проект", "Архитектурные решения", "Инженерные сети"],
  },
  {
    num: "04",
    title: "Производство сруба",
    duration: "3–4 недели",
    desc: "Изготавливаем брус на собственном производстве в Томске. Строгий контроль качества на каждом этапе.",
    image: "/images/production/prod-1.jpg",
    points: ["Отбор древесины", "Камерная сушка", "Нарезка чашек"],
  },
  {
    num: "05",
    title: "Фундамент",
    duration: "2–4 недели",
    desc: "Заливаем фундамент по геологическим данным участка. Ленточный, плитный или свайный — под ваши условия.",
    image: "/images/stages/stages-1.jpg",
    points: ["Земляные работы", "Монтаж опалубки", "Заливка бетона"],
  },
  {
    num: "06",
    title: "Сборка сруба и кровля",
    duration: "3–6 недель",
    desc: "Собираем сруб, монтируем кровлю, устанавливаем окна и двери. Дом приобретает форму.",
    image: "/images/gallery/gallery-3.jpg",
    points: ["Сборка стен", "Стропильная система", "Кровельные работы"],
  },
  {
    num: "07",
    title: "Отделка и сдача",
    duration: "8–12 недель",
    desc: "Инженерные коммуникации, чистовая отделка, пусконаладка. Принимаем дом вместе с вами по чек-листу из 300 пунктов.",
    image: "/images/gallery/gallery-1.jpg",
    points: ["Отопление и электрика", "Внутренняя отделка", "Передача ключей"],
  },
];

const faqs = [
  {
    q: "Можно ли строить зимой?",
    a: "Да, строительство из дерева можно и даже нужно вести зимой. Зимний лес имеет меньшую влажность, сруб даёт более равномерную усадку, а на участке меньше грязи.",
  },
  {
    q: "Сколько времени занимает усадка сруба?",
    a: "Основная усадка занимает от 6 до 12 месяцев. Для домов из профилированного бруса камерной сушки этот период минимален, и к отделке можно приступать раньше.",
  },
  {
    q: "Что делать, если сроки сдвигаются из-за погоды?",
    a: "Все сроки в договоре указываются с запасом на неблагоприятные погодные условия. При значительных задержках мы информируем клиента заранее, но за 25 лет работы мы ни разу не нарушили договорные сроки сдачи.",
  },
];

export default function Stages() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background pt-20">
      <PageHero
        title="Этапы строительства"
        subtitle="От первого звонка до ключей в руках — прозрачно и в срок"
        breadcrumb="Этапы строительства"
        tag="Процесс"
        image="/images/gallery/gallery-3.jpg"
      />

      {/* Stages */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 gap-px bg-border">
            {stages.map((stage, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white"
              >
                <div className={`flex flex-col ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                  {/* Image */}
                  <div className="lg:w-2/5 overflow-hidden relative">
                    <div className="aspect-[16/10] lg:aspect-auto lg:h-full min-h-[260px] group">
                      <img
                        src={stage.image}
                        alt={stage.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-6 left-6">
                        <div className="text-7xl font-bold text-white/15 leading-none" style={{ fontFamily: "'Playfair Display', serif" }}>
                          {stage.num}
                        </div>
                      </div>
                      <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-foreground">
                        {stage.duration}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-3/5 p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-8 h-px bg-accent" />
                      <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Этап {stage.num}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-light text-foreground mb-5 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {stage.title}
                    </h2>
                    <p className="text-muted-foreground font-light leading-relaxed mb-7 text-lg">{stage.desc}</p>
                    <ul className="space-y-2.5">
                      {stage.points.map((point, j) => (
                        <li key={j} className="flex items-center gap-3">
                          <CheckCircle size={16} weight="bold" className="text-accent shrink-0" />
                          <span className="text-sm font-medium text-foreground">{point}</span>
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

      {/* FAQ */}
      <section className="py-20 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-6 md:px-12 max-w-3xl">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-px bg-accent" />
            <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Частые вопросы</span>
          </div>
          <h2 className="font-light text-3xl text-foreground mb-10" style={{ fontFamily: "'Playfair Display', serif" }}>
            Вопросы по срокам
          </h2>
          <Accordion type="single" collapsible className="w-full bg-white border border-border">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-b border-border last:border-0">
                <AccordionTrigger className="px-6 py-5 hover:no-underline hover:text-accent font-semibold text-base text-left">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 text-muted-foreground font-light leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#0d1f12] text-white py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-accent" />
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">Первый шаг</span>
            </div>
            <h2 className="font-light text-4xl md:text-5xl text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              Готовы начать первый этап?
            </h2>
            <p className="text-white/60 text-lg font-light mb-10 leading-relaxed">
              Оставьте заявку на бесплатную консультацию. Мы ответим на все вопросы и поможем сделать правильный выбор.
            </p>
            <Link
              href="/contacts"
              className="inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 transition-all duration-300 hover:gap-5"
            >
              Записаться на консультацию <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
