import { useEffect } from "react";
import { Link } from "wouter";
import { Shield, Home, Key, HardHat, FileText, CheckCircle, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stages = [
    {
      num: "01",
      title: "УЧАСТОК — Выбор и оформление участка",
      items: [
        "Подбор земельного участка",
        "Юридическое сопровождение сделки",
        "Проверка документов",
        "Технический анализ участка",
        "Ландшафтное планирование"
      ],
      icon: Search
    },
    {
      num: "02",
      title: "ПРОЕКТ — Проектирование",
      items: [
        "Консультация с архитектором",
        "Анализ планировки",
        "Индивидуальное проектирование",
        "Помощь с выбором технологии"
      ],
      icon: FileText
    },
    {
      num: "03",
      title: "ПОДГОТОВКА — Подготовка к строительству",
      items: [
        "Подготовка участка",
        "Получение разрешительной документации",
        "Решение административных вопросов"
      ],
      icon: HardHat
    },
    {
      num: "04",
      title: "СТРОИТЕЛЬСТВО — Строительство домов",
      items: [
        "Дома из профилированного бруса",
        "Дома из рубленого бревна",
        "Каркасные дома",
        "Бани и сауны",
        "Инженерные коммуникации и отделка",
        "Покраска и отделка фасадов"
      ],
      icon: Home
    },
    {
      num: "05",
      title: "КОНТРОЛЬ — Сопровождение при строительстве",
      items: [
        "Независимый технадзор",
        "Фотофиксация этапов",
        "Личный кабинет (онлайн-мониторинг)",
        "Решение споров с соседями и администрацией"
      ],
      icon: Shield
    },
    {
      num: "06",
      title: "СДАЧА — Завершение строительства",
      items: [
        "Сдача в эксплуатацию",
        "Регистрация дома",
        "Пусконаладочные работы"
      ],
      icon: Key
    },
    {
      num: "07",
      title: "СЕРВИС — Пожизненный сервис",
      items: [
        "Техническое обслуживание",
        "Гарантия 5 лет",
        "Поддержка 24/7"
      ],
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-background fade-in-section visible" data-testid="services-page">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-sm mb-4 text-white/70">
            <Link href="/" className="hover:text-accent transition-colors">Главная</Link> / Услуги
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Наши услуги</h1>
          <p className="text-xl text-white/80 max-w-3xl">Весь цикл работ — от участка до полной эксплуатации дома. Мы берем на себя все заботы, чтобы вы могли просто наслаждаться результатом.</p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {stages.map((stage, i) => (
            <div key={i} className="flex gap-6 md:gap-8 flex-col md:flex-row bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="md:w-1/4 shrink-0 flex flex-row md:flex-col items-center md:items-start gap-4">
                <div className="text-4xl md:text-5xl font-bold text-accent">{stage.num}</div>
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-primary">
                  <stage.icon size={24} />
                </div>
              </div>
              <div className="md:w-3/4">
                <h2 className="text-2xl font-bold text-primary mb-6">{stage.title}</h2>
                <ul className="space-y-3">
                  {stage.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-accent shrink-0 mt-0.5" />
                      <span className="text-foreground/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Highlights */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-primary text-white border-none shadow-lg hover:-translate-y-1 transition-transform">
              <CardContent className="p-8 text-center flex flex-col items-center">
                <Shield size={48} className="text-accent mb-6" />
                <h3 className="text-xl font-bold mb-3">Гарантия 5 лет</h3>
                <p className="text-white/80">На все строительные и монтажные работы, закреплено в договоре.</p>
              </CardContent>
            </Card>
            <Card className="bg-primary text-white border-none shadow-lg hover:-translate-y-1 transition-transform">
              <CardContent className="p-8 text-center flex flex-col items-center">
                <HardHat size={48} className="text-accent mb-6" />
                <h3 className="text-xl font-bold mb-3">Технадзор на всех этапах</h3>
                <p className="text-white/80">Многоуровневый контроль качества каждого узла и соединения.</p>
              </CardContent>
            </Card>
            <Card className="bg-primary text-white border-none shadow-lg hover:-translate-y-1 transition-transform">
              <CardContent className="p-8 text-center flex flex-col items-center">
                <Search size={48} className="text-accent mb-6" />
                <h3 className="text-xl font-bold mb-3">Личный кабинет онлайн</h3>
                <p className="text-white/80">Фото и видео отчеты со стройплощадки в режиме реального времени.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Form */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Получить консультацию</h2>
          <p className="text-muted-foreground mb-8">Оставьте свои контакты, и мы перезвоним для обсуждения вашего будущего дома.</p>
          <form className="flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
            <Input placeholder="Ваше имя" className="h-12 text-base" />
            <Input placeholder="+7 (___) ___-__-__" className="h-12 text-base" />
            <Button type="button" className="h-12 px-8 bg-accent hover:bg-primary text-white text-base">Отправить</Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
        </div>
      </section>
    </div>
  );
}
