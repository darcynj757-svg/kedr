import { useEffect } from "react";
import { Link } from "wouter";
import { Shield, Home, Key, HardHat, FileText, CheckCircle, TreePine, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Services() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mainServices = [
    {
      num: "01",
      title: "Дома из профилированного бруса",
      items: [
        "Профилированный брус собственного производства",
        "Максимальное сечение стены 300 мм",
        "Мощность — до 500 м³ в месяц",
        "Строительство в Томске и по всей России",
        "Стоимость от 11 000 до 16 000 руб./м² (без фундамента и кровельного материала)",
      ],
      icon: Home
    },
    {
      num: "02",
      title: "Рубленые дома из бревна",
      items: [
        "Дома из рубленого бревна ручной рубки",
        "Сибирский кедр, сосна, лиственница",
        "Индивидуальное проектирование",
        "Рубка в чашу и в лапу",
        "Строительство в Томске, области и по всей России",
      ],
      icon: TreePine
    },
    {
      num: "03",
      title: "Проектирование",
      items: [
        "Разработка индивидуального проекта",
        "Консультация с инженером",
        "Архитектурные и конструктивные решения",
        "Подбор проекта из каталога",
        "Адаптация проекта под ваш участок",
      ],
      icon: FileText
    },
    {
      num: "04",
      title: "Строительство бань и беседок",
      items: [
        "Бани из профилированного бруса",
        "Бани из рубленого бревна",
        "Беседки и террасы",
        "Хозяйственные постройки",
        "Отделка и коммуникации под ключ",
      ],
      icon: HardHat
    },
    {
      num: "05",
      title: "Столярные изделия",
      items: [
        "Деревянные окна",
        "Деревянные двери",
        "Лестницы из массива",
        "Деревянные полы",
        "Мебель на заказ",
      ],
      icon: Package
    },
    {
      num: "06",
      title: "Пиломатериалы и брус оптом",
      items: [
        "Профилированный брус в розницу и оптом",
        "Обрезной и необрезной пиломатериал",
        "Отгрузка в железнодорожные вагоны",
        "Доставка по Томску и Томской области",
        "Доставка в любой регион России",
      ],
      icon: Package
    },
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
          <p className="text-xl text-white/80 max-w-3xl">Строительство деревянных домов под ключ в Томске, Томской области и по всей России. Собственное производство профилированного бруса с 2001 года.</p>
        </div>
      </section>

      {/* Pricing banner */}
      <section className="bg-accent/10 border-b border-accent/20 py-6">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <p className="text-lg font-semibold text-primary">
            Строительство деревянного дома под ключ: <span className="text-accent">от 11 000 до 16 000 руб./м²</span> <span className="text-muted-foreground font-normal text-base">(без стоимости фундамента и кровельного материала)</span>
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {mainServices.map((service, i) => (
            <div key={i} className="flex gap-6 md:gap-8 flex-col md:flex-row bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="md:w-1/4 shrink-0 flex flex-row md:flex-col items-center md:items-start gap-4">
                <div className="text-4xl md:text-5xl font-bold text-accent">{service.num}</div>
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-primary">
                  <service.icon size={24} />
                </div>
              </div>
              <div className="md:w-3/4">
                <h2 className="text-2xl font-bold text-primary mb-6">{service.title}</h2>
                <ul className="space-y-3">
                  {service.items.map((item, j) => (
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
                <h3 className="text-xl font-bold mb-3">Собственное производство</h3>
                <p className="text-white/80">Производим брус сами — контролируем качество на каждом этапе от сырья до готового сруба.</p>
              </CardContent>
            </Card>
            <Card className="bg-primary text-white border-none shadow-lg hover:-translate-y-1 transition-transform">
              <CardContent className="p-8 text-center flex flex-col items-center">
                <HardHat size={48} className="text-accent mb-6" />
                <h3 className="text-xl font-bold mb-3">Строим с 2001 года</h3>
                <p className="text-white/80">Более 25 лет опыта в деревянном строительстве в условиях сибирского климата.</p>
              </CardContent>
            </Card>
            <Card className="bg-primary text-white border-none shadow-lg hover:-translate-y-1 transition-transform">
              <CardContent className="p-8 text-center flex flex-col items-center">
                <Key size={48} className="text-accent mb-6" />
                <h3 className="text-xl font-bold mb-3">Строительство под ключ</h3>
                <p className="text-white/80">От проекта до передачи ключей. Работаем в Томске, области и любом регионе России.</p>
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
