import { useEffect } from "react";
import { Link } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export default function Stages() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stages = [
    {
      title: "ЗНАКОМСТВО",
      duration: "1 неделя",
      desc: "Обсуждаем проект, показываем портфолио, выезжаем на участок. Никаких обязательств — только знакомство и честная оценка возможностей.",
      image: "meeting1",
      points: [
        "Бесплатная консультация",
        "Выезд инженера на участок",
        "Предварительный расчет стоимости",
      ],
    },
    {
      title: "ДОГОВОР",
      duration: "1-2 недели",
      desc: "Фиксируем все условия, стоимость и сроки в договоре. Назначаем персонального менеджера, согласуем план работ.",
      image: "/images/about/about-8.jpg",
      points: [
        "Фиксация цены",
        "График платежей",
        "Гарантии сроков",
      ],
    },
    {
      title: "ПРОЕКТИРОВАНИЕ",
      duration: "4-8 недель",
      desc: "Архитектор разрабатывает индивидуальный проект с учётом особенностей вашего участка. Согласуем каждую деталь.",
      image: "/images/about/about-7.jpg",
      points: [
        "Эскизный проект",
        "Архитектурные решения",
        "Инженерные сети",
      ],
    },
    {
      title: "ПРОИЗВОДСТВО СРУБА",
      duration: "3-4 недели",
      desc: "Изготавливаем брус на собственном производстве в Томске. Строгий контроль качества на каждом этапе.",
      image: "/images/production/prod-1.jpg",
      points: [
        "Отбор древесины",
        "Камерная сушка",
        "Нарезка чашек",
      ],
    },
    {
      title: "ФУНДАМЕНТ",
      duration: "2-4 недели",
      desc: "Заливаем фундамент по геологическим данным участка. Ленточный, плитный или свайный — под ваши условия.",
      image: "/images/stages/stages-1.jpg",
      points: [
        "Земляные работы",
        "Монтаж опалубки",
        "Заливка бетона",
      ],
    },
    {
      title: "СБОРКА СРУБА И КРОВЛЯ",
      duration: "3-6 недель",
      desc: "Собираем сруб, монтируем кровлю, устанавливаем окна и двери. Дом приобретает форму.",
      image: "/images/gallery/gallery-3.jpg",
      points: [
        "Сборка стен",
        "Стропильная система",
        "Кровельные работы",
      ],
    },
    {
      title: "ОТДЕЛКА И СДАЧА",
      duration: "8-12 недель",
      desc: "Инженерные коммуникации, чистовая отделка, пусконаладка. Принимаем дом вместе с вами по чек-листу из 300 пунктов.",
      image: "/images/gallery/gallery-1.jpg",
      points: [
        "Отопление и электрика",
        "Внутренняя отделка",
        "Передача ключей",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background fade-in-section visible" data-testid="stages-page">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-sm mb-4 text-white/70">
            <Link href="/" className="hover:text-accent transition-colors">Главная</Link> / Этапы строительства
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Этапы строительства</h1>
          <p className="text-xl text-white/80 max-w-3xl">От первого звонка до ключей в руках — прозрачно и в срок.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-border transform -translate-x-1/2 z-0"></div>
          
          <div className="space-y-16 md:space-y-24 relative z-10">
            {stages.map((stage, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="md:w-1/2 w-full flex justify-center md:justify-end">
                  <div className={`relative w-full max-w-lg ${i % 2 !== 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'}`}>
                    <img 
                      src={stage.image} 
                      alt={stage.title} 
                      className="rounded-xl shadow-lg w-full object-cover aspect-[4/3] border border-border"
                    />
                    <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full font-bold text-primary shadow-sm">
                      {stage.duration}
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-accent rounded-full border-4 border-white flex items-center justify-center text-white font-bold text-xl hidden md:flex z-20 shadow-md">
                  {i + 1}
                </div>
                
                <div className="md:w-1/2 w-full flex">
                  <div className={`w-full max-w-lg ${i % 2 !== 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="flex items-center gap-4 mb-4 md:hidden">
                      <div className="w-10 h-10 bg-accent rounded-full text-white flex items-center justify-center font-bold">
                        {i + 1}
                      </div>
                      <h2 className="text-2xl font-bold text-primary">{stage.title}</h2>
                    </div>
                    <h2 className="text-2xl font-bold text-primary mb-4 hidden md:block">{stage.title}</h2>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{stage.desc}</p>
                    <ul className={`space-y-2 ${i % 2 !== 0 ? 'md:flex md:flex-col md:items-end' : ''}`}>
                      {stage.points.map((point, j) => (
                        <li key={j} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent block"></span>
                          <span className="font-medium text-foreground">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-10 text-primary">Частые вопросы по срокам</h2>
          <Accordion type="single" collapsible className="w-full bg-white rounded-xl p-2 border border-border shadow-sm">
            <AccordionItem value="item-1">
              <AccordionTrigger className="px-4 hover:no-underline hover:text-accent font-semibold text-lg">
                Можно ли строить зимой?
              </AccordionTrigger>
              <AccordionContent className="px-4 text-muted-foreground text-base">
                Да, строительство из дерева можно и даже нужно вести зимой. Зимний лес имеет меньшую влажность, сруб дает более равномерную усадку, а на участке меньше грязи.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="px-4 hover:no-underline hover:text-accent font-semibold text-lg">
                Сколько времени занимает усадка сруба?
              </AccordionTrigger>
              <AccordionContent className="px-4 text-muted-foreground text-base">
                Основная усадка занимает от 6 до 12 месяцев. Для домов из профилированного бруса камерной сушки этот период минимален, и к отделке можно приступать раньше.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="px-4 hover:no-underline hover:text-accent font-semibold text-lg">
                Что делать, если сроки сдвигаются из-за погоды?
              </AccordionTrigger>
              <AccordionContent className="px-4 text-muted-foreground text-base">
                Все сроки в договоре указываются с небольшим запасом на неблагоприятные погодные условия. При значительных задержках мы информируем клиента заранее, но за 10 лет работы мы ни разу не нарушили договорные сроки сдачи.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold mb-6">Готовы начать первый этап?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Оставьте заявку на бесплатную консультацию. Мы ответим на все вопросы и поможем сделать правильный выбор.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8 h-14 text-lg" asChild>
            <Link href="/contacts">Записаться на консультацию</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
