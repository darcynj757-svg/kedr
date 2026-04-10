import { useEffect } from "react";
import { Link } from "wouter";
import { Factory, Ruler, TreePine, Droplets, Package, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Production() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const steps = [
    {
      title: "Приёмка древесины",
      desc: "Отбор и входной контроль сырья (кедр, сосна, лиственница). Заготавливаем только качественный зимний лес северных районов Томской области.",
      img: "timber2"
    },
    {
      title: "Сушка в камерах",
      desc: "Сушим древесину в специальных конвективных камерах до 12-14% влажности для минимальной усадки и предотвращения трещин.",
      img: "drying1"
    },
    {
      title: "Профилирование",
      desc: "Нарезка точного профиля шип-паз на современных строгальных ЧПУ-станках. Это обеспечивает плотное прилегание венцов и исключает продувание стен.",
      img: "milling1"
    },
    {
      title: "Заводка чашек и пазов",
      desc: "Нарезка чашек (угловых соединений) строго по индивидуальному проекту дома. Ювелирная точность станков гарантирует идеальную сборку на участке.",
      img: "cutting1"
    },
    {
      title: "Контроль качества",
      desc: "100% проверка каждого элемента технадзором. Отбраковка деталей со смоляными карманами, обзолом или нарушением геометрии.",
      img: "quality1"
    },
    {
      title: "Упаковка и маркировка",
      desc: "Все детали комплекта маркируются и бережно упаковываются в транспортировочные пачки для безопасной доставки на объект.",
      img: "packing1"
    }
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
          <p className="text-xl text-white/80 max-w-3xl">Единственный производственный комплекс профилированного бруса в Томске с полным циклом обработки.</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-accent mb-1">2000 м²</div>
              <div className="text-muted-foreground text-sm font-medium">площадь цехов</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-1">20+</div>
              <div className="text-muted-foreground text-sm font-medium">станков ЧПУ</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-1">30+</div>
              <div className="text-muted-foreground text-sm font-medium">мастеров-станочников</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent mb-1">15 лет</div>
              <div className="text-muted-foreground text-sm font-medium">опыта обработки</div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">Процесс производства сруба</h2>
            <p className="text-lg text-muted-foreground">Каждая деталь вашего будущего дома проходит 6 этапов контроля перед отправкой на строительную площадку.</p>
          </div>

          <div className="space-y-16">
            {steps.map((step, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-center gap-10 ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="w-full md:w-1/2">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[16/10] border border-border group">
                    <img 
                      src={`https://picsum.photos/seed/${step.img}/800/500`} 
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 w-12 h-12 bg-accent rounded-full text-white font-bold text-xl flex items-center justify-center shadow-md z-10">
                      {i + 1}
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <h3 className="text-2xl font-bold text-primary mb-4">{step.title}</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">{step.desc}</p>
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
                <p className="text-muted-foreground text-sm">Природный антисептик. Обладает уникальным целебным ароматом хвои. Невероятно долговечный и теплый материал с красивой текстурой.</p>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-border">
              <div className="h-48 bg-primary/5 flex items-center justify-center p-6 border-b border-border">
                <TreePine size={64} className="text-primary" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3">Сосна ангарская</h3>
                <p className="text-muted-foreground text-sm">Оптимальное соотношение цены и качества. Высокая плотность годовых колец, отличная теплоизоляция, легко поддается обработке.</p>
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-border">
              <div className="h-48 bg-primary/5 flex items-center justify-center p-6 border-b border-border">
                <TreePine size={64} className="text-accent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3">Лиственница</h3>
                <p className="text-muted-foreground text-sm">Максимальная прочность и невероятная стойкость к влаге. Используется для закладных венцов, террас и строительства бань премиум-класса.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">Жизнь цеха</h2>
          <div className="grid grid-cols-2 gap-4">
            <img src="https://picsum.photos/seed/factorygal1/800/600" alt="Цех 1" className="rounded-xl w-full object-cover aspect-[4/3] border border-border shadow-sm" />
            <img src="https://picsum.photos/seed/factorygal2/800/600" alt="Цех 2" className="rounded-xl w-full object-cover aspect-[4/3] border border-border shadow-sm" />
            <img src="https://picsum.photos/seed/factorygal3/800/600" alt="Цех 3" className="rounded-xl w-full object-cover aspect-[4/3] border border-border shadow-sm" />
            <img src="https://picsum.photos/seed/factorygal4/800/600" alt="Цех 4" className="rounded-xl w-full object-cover aspect-[4/3] border border-border shadow-sm" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-3xl font-bold mb-6">Хотите увидеть всё своими глазами?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Запишитесь на экскурсию. Мы проведем вас по всем цехам, покажем качество нашего бруса и ответим на все технические вопросы.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8 h-14 text-lg" asChild>
            <Link href="/contacts">Записаться на экскурсию</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
