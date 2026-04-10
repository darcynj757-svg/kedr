import { useEffect } from "react";
import { Link } from "wouter";
import { Shield, Target, Users, Award, Briefcase, FileCheck, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const team = [
    { name: "Иванов Алексей", pos: "Генеральный директор", exp: "15 лет в строительстве" },
    { name: "Петрова Мария", pos: "Главный архитектор", exp: "200+ проектов" },
    { name: "Сидоров Николай", pos: "Руководитель производства", exp: "20 лет работы с деревом" },
    { name: "Козлова Елена", pos: "Менеджер по работе с клиентами", exp: "С нами с основания компании" },
    { name: "Волков Дмитрий", pos: "Главный инженер", exp: "Технадзор 50+ объектов" },
    { name: "Морозова Анна", pos: "Дизайнер интерьеров", exp: "Создает уют в деревянных домах" },
  ];

  return (
    <div className="min-h-screen bg-background fade-in-section visible" data-testid="about-page">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-sm mb-4 text-white/70">
            <Link href="/" className="hover:text-accent transition-colors">Главная</Link> / О компании
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">О компании Кедр-Томск</h1>
          <p className="text-xl text-white/80 max-w-3xl">С 2014 года строим деревянные дома в Томске и Томской области</p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-accent text-white py-10 border-b-4 border-primary">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">150+</div>
              <div className="text-white/90 text-sm md:text-base font-medium">построенных домов</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">10+</div>
              <div className="text-white/90 text-sm md:text-base font-medium">лет опыта</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">200+</div>
              <div className="text-white/90 text-sm md:text-base font-medium">разработанных проектов</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
              <div className="text-white/90 text-sm md:text-base font-medium">рекомендуют нас</div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-primary mb-6">История и подход</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Кедр-Томск — это современная строительная компания, основанная в 2014 году. Наш профиль — экологичные загородные дома из натурального дерева: профилированного бруса, рубленого бревна и кедра.
              </p>
              <p>
                Мы — полноциклная компания: от архитектурного проекта до ключей в руках. Собственная производственная площадка в промышленной зоне Томска позволяет нам контролировать качество на каждом этапе — от выбора сырья до готового сруба.
              </p>
              <p>
                За 10 лет работы мы построили более 150 домов, разработали 200+ индивидуальных проектов и завоевали доверие клиентов по всей Сибири и России. Наша миссия — создавать дома, в которых хочется жить и которые будут служить поколениям.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <img 
              src="/images/about/about-7.jpg" 
              alt="Кедр-Томск производство" 
              className="rounded-2xl shadow-xl w-full border border-border"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Наши ценности</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Shield size={48} className="text-accent mb-6" />
                <h3 className="text-xl font-bold text-primary mb-4">Качество</h3>
                <p className="text-muted-foreground">Используем только отборный лес зимней заготовки. Многоступенчатый контроль на производстве и строительной площадке.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Target size={48} className="text-accent mb-6" />
                <h3 className="text-xl font-bold text-primary mb-4">Прозрачность</h3>
                <p className="text-muted-foreground">Честная смета без скрытых платежей. Фиксируем стоимость и сроки в договоре до начала работ.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Users size={48} className="text-accent mb-6" />
                <h3 className="text-xl font-bold text-primary mb-4">Ответственность</h3>
                <p className="text-muted-foreground">Несем гарантийные обязательства 5 лет на все несущие конструкции. Мы всегда на связи с нашими клиентами.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-primary">Наша команда</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">Главная ценность компании — это люди. У нас работают квалифицированные инженеры, архитекторы и плотники с многолетним стажем.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((person, i) => (
              <div key={i} className="bg-white rounded-xl p-6 text-center border border-border shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src={`/images/about/about-${(i % 6) + 1}.jpg`} 
                  alt={person.name} 
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-muted"
                />
                <h3 className="text-xl font-bold text-primary mb-1">{person.name}</h3>
                <div className="text-accent font-medium mb-2">{person.pos}</div>
                <p className="text-sm text-muted-foreground">{person.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Документы и лицензии</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((doc) => (
              <div key={doc} className="bg-white p-6 rounded-xl border border-border flex flex-col items-center justify-center aspect-[3/4] hover:-translate-y-2 transition-transform cursor-pointer shadow-sm">
                <FileCheck size={48} className="text-muted-foreground mb-4" />
                <div className="font-semibold text-center text-sm">Сертификат соответствия №{doc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold mb-6">Приходите на экскурсию на производство</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Убедитесь лично в качестве нашего бруса. Мы покажем все этапы обработки древесины и расскажем, как строится надежный дом.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8 h-14 text-lg" asChild>
            <Link href="/production">Записаться на экскурсию</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
