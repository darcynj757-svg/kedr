import { useEffect } from "react";
import { Link } from "wouter";
import { Shield, Target, Users, FileCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background fade-in-section visible" data-testid="about-page">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-sm mb-4 text-white/70">
            <Link href="/" className="hover:text-accent transition-colors">Главная</Link> / О компании
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">О компании Кедр-Томск</h1>
          <p className="text-xl text-white/80 max-w-3xl">С 2001 года строим деревянные дома в Томске, Томской области и по всей России</p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-accent text-white py-10 border-b-4 border-primary">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">2001</div>
              <div className="text-white/90 text-sm md:text-base font-medium">год основания</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">25+</div>
              <div className="text-white/90 text-sm md:text-base font-medium">лет опыта</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">500</div>
              <div className="text-white/90 text-sm md:text-base font-medium">м³ бруса в месяц</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
              <div className="text-white/90 text-sm md:text-base font-medium">собственное производство</div>
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
                ООО «Кедр-Томск» ведёт деятельность с 2001 года. Наш профиль — строительство деревянных домов, коттеджей и бань под ключ из профилированного бруса и рубленого бревна.
              </p>
              <p>
                Мы — полноциклная компания: собственное производство в Томске позволяет нам изготавливать профилированный брус и столярные изделия любой сложности на месте. Производственная мощность — до 500 м³ профилированного бруса в месяц.
              </p>
              <p>
                За 25 лет работы мы накопили богатый опыт строительства деревянных домов в условиях сибирского климата. Строим в Томске, Томской области, а также по всей России — от заготовки бруса до передачи ключей.
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
                <p className="text-muted-foreground">Используем только отборный лес. Профилированный брус производим на собственной площадке с использованием финского 4-х стороннего станка и ленточной пилорамы.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Target size={48} className="text-accent mb-6" />
                <h3 className="text-xl font-bold text-primary mb-4">Прозрачность</h3>
                <p className="text-muted-foreground">Честная смета без скрытых платежей. Фиксируем стоимость и сроки в договоре до начала работ. Строительство под ключ от 11 000 до 16 000 руб./м².</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <Users size={48} className="text-accent mb-6" />
                <h3 className="text-xl font-bold text-primary mb-4">Ответственность</h3>
                <p className="text-muted-foreground">Несем гарантийные обязательства на все несущие конструкции. Мы всегда на связи с нашими клиентами — с 2001 года и по сей день.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Director */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-primary">Руководство компании</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">Компанией руководят профессионалы с многолетним опытом в деревянном строительстве.</p>
          
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-xl p-8 text-center border border-border shadow-sm hover:shadow-md transition-shadow">
              <img 
                src="/images/about/about-1.jpg" 
                alt="Серебряков Павел Михайлович" 
                className="w-40 h-40 rounded-full mx-auto mb-6 object-cover border-4 border-muted"
              />
              <h3 className="text-2xl font-bold text-primary mb-2">Серебряков Павел Михайлович</h3>
              <div className="text-accent font-semibold mb-4">Директор ООО «Кедр-Томск»</div>
              <a href="tel:+79528800973" className="text-muted-foreground hover:text-accent transition-colors font-medium">
                +7 (952) 88-00-973
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Наша компания</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[2, 3, 4, 5, 6, 7, 8].slice(0, 4).map((n) => (
              <img
                key={n}
                src={`/images/about/about-${n}.jpg`}
                alt={`Кедр-Томск фото ${n}`}
                className="rounded-xl w-full object-cover aspect-square border border-border shadow-sm"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Реквизиты компании</h2>
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl border border-border shadow-sm">
            <dl className="space-y-4 text-sm">
              <div className="flex gap-4 border-b border-border pb-4">
                <dt className="font-semibold text-primary w-48 shrink-0">Полное наименование:</dt>
                <dd className="text-muted-foreground">Общество с ограниченной ответственностью «Кедр-Томск»</dd>
              </div>
              <div className="flex gap-4 border-b border-border pb-4">
                <dt className="font-semibold text-primary w-48 shrink-0">Юридический адрес:</dt>
                <dd className="text-muted-foreground">634024, г. Томск, ул. Профсоюзная, 2/67 стр. 3</dd>
              </div>
              <div className="flex gap-4 border-b border-border pb-4">
                <dt className="font-semibold text-primary w-48 shrink-0">Телефон:</dt>
                <dd className="text-muted-foreground">
                  <a href="tel:+73822334439" className="hover:text-accent transition-colors">+7 (3822) 33-44-39</a>
                </dd>
              </div>
              <div className="flex gap-4 border-b border-border pb-4">
                <dt className="font-semibold text-primary w-48 shrink-0">Email:</dt>
                <dd className="text-muted-foreground">
                  <a href="mailto:mail@kedr-tomsk.ru" className="hover:text-accent transition-colors">mail@kedr-tomsk.ru</a>
                </dd>
              </div>
              <div className="flex gap-4">
                <dt className="font-semibold text-primary w-48 shrink-0">Директор:</dt>
                <dd className="text-muted-foreground">Серебряков Павел Михайлович</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold mb-6">Приходите на экскурсию на производство</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Убедитесь лично в качестве нашего бруса. Мы покажем все этапы обработки древесины и расскажем, как строится надёжный дом.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8 h-14 text-lg" asChild>
            <Link href="/contacts">Записаться на экскурсию</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
