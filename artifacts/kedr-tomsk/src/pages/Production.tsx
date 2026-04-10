import { useEffect } from "react";
import { Link } from "wouter";
import { TreePine, Package, Hammer, Train } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Production() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const products = [
    {
      title: "Профилированный брус",
      desc: "Производим профилированный брус максимальным сечением 200×300 мм (где 300 — толщина стены). Брус изготавливается на финском 4-х стороннем станке, что гарантирует идеальную геометрию и точный профиль шип-паз. Мощность производства — до 500 м³ в месяц.",
      img: "/images/production/prod-1.jpg",
      icon: TreePine
    },
    {
      title: "Столярные изделия",
      desc: "Собственное столярное производство: деревянные окна, двери, лестницы, полы и мебель. Изготавливаем всё необходимое для вашего деревянного дома прямо на нашей площадке в Томске.",
      img: "/images/production/prod-3.jpg",
      icon: Hammer
    },
    {
      title: "Пиломатериал",
      desc: "Производство обрезного и необрезного пиломатериала на ленточной пилораме. Сырьё — отборная сибирская древесина (кедр, сосна, лиственница) зимней заготовки из Томской области.",
      img: "/images/production/prod-4.jpg",
      icon: Package
    },
    {
      title: "Отгрузка и доставка",
      desc: "Оказываем услуги по погрузке и отправке пиломатериала в железнодорожные вагоны. Собственный грузовой автотранспорт с манипуляторами обеспечивает доставку по Томску, области и в любой регион России.",
      img: "/images/production/prod-5.jpg",
      icon: Train
    },
  ];

  return (
    <div className="min-h-screen bg-background fade-in-section visible" data-testid="production-page">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-sm mb-4 text-white/70">
            <Link href="/" className="hover:text-accent transition-colors">Главная</Link> / Производство
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Собственное производство</h1>
          <p className="text-xl text-white/80 max-w-3xl">Производственная площадка в Томске с полным циклом обработки древесины. Профилированный брус, столярные изделия, пиломатериал.</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-accent mb-1">500 м³</div>
              <div className="text-muted-foreground text-sm font-medium">бруса в месяц</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-1">200×300</div>
              <div className="text-muted-foreground text-sm font-medium">макс. сечение бруса (мм)</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-1">2</div>
              <div className="text-muted-foreground text-sm font-medium">башенных крана</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-1">с 2001</div>
              <div className="text-muted-foreground text-sm font-medium">года работаем</div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment highlight */}
      <section className="py-12 bg-accent/5 border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">Оборудование</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 border border-border shadow-sm text-center">
              <div className="text-accent font-bold text-lg mb-2">Финский 4-х сторонний станок</div>
              <p className="text-sm text-muted-foreground">Профилирование бруса с идеальной геометрией и точным пазом шип-паз</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-border shadow-sm text-center">
              <div className="text-accent font-bold text-lg mb-2">Ленточная пилорама</div>
              <p className="text-sm text-muted-foreground">Распиловка кругляка в обрезной и необрезной пиломатериал</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-border shadow-sm text-center">
              <div className="text-accent font-bold text-lg mb-2">Два башенных крана</div>
              <p className="text-sm text-muted-foreground">Подъём и монтаж тяжёлых элементов конструкции на производстве и стройплощадке</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">Что мы производим</h2>
            <p className="text-lg text-muted-foreground">Полный цикл деревообработки — от распиловки бревна до готовых столярных изделий.</p>
          </div>

          <div className="space-y-16">
            {products.map((product, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-center gap-10 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[16/10] border border-border group">
                    <img 
                      src={product.img} 
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                    <product.icon size={28} className="text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-4">{product.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{product.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Материалы, с которыми мы работаем</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-border">
              <div className="h-48 bg-primary/5 flex items-center justify-center p-6 border-b border-border">
                <TreePine size={64} className="text-accent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3">Кедр сибирский</h3>
                <p className="text-muted-foreground text-sm">Природный антисептик с уникальным целебным ароматом. Невероятно долговечный и тёплый материал с красивой текстурой.</p>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-border">
              <div className="h-48 bg-primary/5 flex items-center justify-center p-6 border-b border-border">
                <TreePine size={64} className="text-primary" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3">Сосна ангарская</h3>
                <p className="text-muted-foreground text-sm">Оптимальное соотношение цены и качества. Высокая плотность годовых колец, отличная теплоизоляция, легко поддаётся обработке.</p>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-border">
              <div className="h-48 bg-primary/5 flex items-center justify-center p-6 border-b border-border">
                <TreePine size={64} className="text-accent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3">Лиственница</h3>
                <p className="text-muted-foreground text-sm">Максимальная прочность и стойкость к влаге. Используется для закладных венцов, террас и бань премиум-класса.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Наше производство</h2>
          <div className="grid grid-cols-2 gap-4">
            <img src="/images/production/prod-1.jpg" alt="Производство 1" className="rounded-xl w-full object-cover aspect-[4/3] border border-border shadow-sm" />
            <img src="/images/production/prod-3.jpg" alt="Производство 2" className="rounded-xl w-full object-cover aspect-[4/3] border border-border shadow-sm" />
            <img src="/images/production/prod-4.jpg" alt="Производство 3" className="rounded-xl w-full object-cover aspect-[4/3] border border-border shadow-sm" />
            <img src="/images/production/prod-5.jpg" alt="Производство 4" className="rounded-xl w-full object-cover aspect-[4/3] border border-border shadow-sm" />
          </div>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-16 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">Инфраструктура площадки</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Подъездные пути к производству",
              "Два башенных крана",
              "Грузовой автотранспорт с манипуляторами",
              "Отгрузка в железнодорожные вагоны",
              "Собственный склад древесины",
              "Цех столярных изделий",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-border shadow-sm">
                <div className="w-2.5 h-2.5 rounded-full bg-accent shrink-0"></div>
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold mb-6">Хотите увидеть всё своими глазами?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Запишитесь на экскурсию. Мы проведём вас по производству, покажем качество нашего бруса и ответим на все технические вопросы.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8 h-14 text-lg" asChild>
            <Link href="/contacts">Записаться на экскурсию</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
