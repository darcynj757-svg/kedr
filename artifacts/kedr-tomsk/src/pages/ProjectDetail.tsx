import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [activeTab, setActiveTab] = useState("plan");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8" data-testid="project-detail-page">
        <h1 className="text-3xl font-bold text-primary mb-4">Проект не найден</h1>
        <p className="text-muted-foreground mb-8">Запрошенный проект не существует или был удален.</p>
        <Button asChild>
          <Link href="/projects">Вернуться в каталог</Link>
        </Button>
      </div>
    );
  }

  // Get 3 random related projects (excluding current)
  const relatedProjects = projects.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background fade-in-section visible" data-testid="project-detail-page">
      {/* Hero */}
      <section className="bg-primary text-white py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-sm mb-6 text-white/70">
            <Link href="/" className="hover:text-accent transition-colors">Главная</Link> /{" "}
            <Link href="/projects" className="hover:text-accent transition-colors">Проекты</Link> /{" "}
            {project.name}
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl md:text-5xl font-bold">{project.name}</h1>
                {project.badge && <Badge className="bg-accent text-white text-sm">{project.badge}</Badge>}
              </div>
              <p className="text-xl text-white/80">Площадь: {project.area} м² • Этажность: {project.floors}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/70 mb-1">Стоимость строительства</p>
              <p className="text-3xl font-bold text-accent">от {project.price.toLocaleString()} ₽</p>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Gallery */}
          <div className="lg:col-span-2 space-y-4">
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-border">
              <img 
                src={`https://picsum.photos/seed/${project.img}/1200/900`} 
                alt={project.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <img src={`https://picsum.photos/seed/${project.img}-2/400/300`} alt="Вид 2" className="rounded-lg object-cover aspect-[4/3] border border-border" />
              <img src={`https://picsum.photos/seed/${project.img}-3/400/300`} alt="Вид 3" className="rounded-lg object-cover aspect-[4/3] border border-border" />
              <img src={`https://picsum.photos/seed/${project.img}-4/400/300`} alt="Вид 4" className="rounded-lg object-cover aspect-[4/3] border border-border" />
            </div>
          </div>

          {/* Right: Specs & CTA */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm">
              <h3 className="text-xl font-bold mb-6">Характеристики</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Общая площадь:</span>
                  <span className="font-medium">{project.area} м²</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Этажность:</span>
                  <span className="font-medium">{project.floors}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Спальни:</span>
                  <span className="font-medium">{project.beds}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Материал стен:</span>
                  <span className="font-medium text-right max-w-[150px]">
                    {project.type === "brus" ? "Профилированный брус" : 
                     project.type === "brvno" ? "Рубленое бревно" : 
                     project.type === "karkasny" ? "Каркас" : "Брус/Бревно"}
                  </span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                  <span className="text-muted-foreground">Фундамент:</span>
                  <span className="font-medium text-right max-w-[150px]">Свайно-винтовой / Ленточный</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-muted-foreground">Кровля:</span>
                  <span className="font-medium text-right max-w-[150px]">Металлочерепица</span>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button size="lg" className="w-full bg-primary hover:bg-primary/90" asChild>
                  <Link href="/contacts">Заказать проект</Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-white" asChild>
                  <Link href="/contacts">Рассчитать точно</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs section */}
        <div className="mt-16">
          <div className="flex border-b border-border gap-8 mb-8 overflow-x-auto whitespace-nowrap">
            <button 
              className={`pb-4 text-lg font-semibold transition-colors relative ${activeTab === 'plan' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setActiveTab('plan')}
            >
              Планировка
              {activeTab === 'plan' && <div className="absolute bottom-0 left-0 w-full h-1 bg-accent"></div>}
            </button>
            <button 
              className={`pb-4 text-lg font-semibold transition-colors relative ${activeTab === 'kit' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setActiveTab('kit')}
            >
              Комплектация
              {activeTab === 'kit' && <div className="absolute bottom-0 left-0 w-full h-1 bg-accent"></div>}
            </button>
            <button 
              className={`pb-4 text-lg font-semibold transition-colors relative ${activeTab === 'build' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              onClick={() => setActiveTab('build')}
            >
              Строительство
              {activeTab === 'build' && <div className="absolute bottom-0 left-0 w-full h-1 bg-accent"></div>}
            </button>
          </div>

          <div className="bg-white p-8 rounded-xl border border-border">
            {activeTab === 'plan' && (
              <div className="text-center animate-in fade-in duration-500">
                <p className="text-lg text-muted-foreground mb-6">Грамотное распределение пространства для комфортной жизни.</p>
                <img src={`https://picsum.photos/seed/plan-${project.slug}/800/600`} alt="Планировка" className="mx-auto rounded-lg border border-border max-w-full" />
              </div>
            )}
            {activeTab === 'kit' && (
              <div className="animate-in fade-in duration-500">
                <h3 className="text-xl font-bold mb-4">В базовую комплектацию входит:</h3>
                <ul className="list-disc list-inside space-y-2 text-foreground ml-4">
                  <li>Фундамент (свайно-винтовой)</li>
                  <li>Домокомплект из сухого профилированного бруса</li>
                  <li>Лаги пола и перекрытия первого этажа</li>
                  <li>Стропильная система и обрешетка</li>
                  <li>Кровельное покрытие (металлочерепица)</li>
                  <li>Сборка сруба на березовые нагеля</li>
                  <li>Межвенцовый утеплитель (джут)</li>
                  <li>Крепеж и расходные материалы</li>
                </ul>
              </div>
            )}
            {activeTab === 'build' && (
              <div className="animate-in fade-in duration-500">
                <h3 className="text-xl font-bold mb-4">Процесс строительства</h3>
                <p className="mb-4">Строительство занимает от 2 до 4 месяцев в зависимости от сложности и комплектации.</p>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0">1</div>
                    <div><h4 className="font-semibold">Проектирование и договор</h4><p className="text-sm text-muted-foreground">Согласование деталей, подписание договора.</p></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0">2</div>
                    <div><h4 className="font-semibold">Производство и фундамент</h4><p className="text-sm text-muted-foreground">Изготовление сруба и заливка фундамента на участке.</p></div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0">3</div>
                    <div><h4 className="font-semibold">Сборка сруба</h4><p className="text-sm text-muted-foreground">Возведение стен и кровли.</p></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Projects */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8">Похожие проекты</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((proj) => (
              <div key={proj.slug} className="bg-white rounded-xl overflow-hidden shadow-sm border border-border group hover:shadow-md transition-all">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={`https://picsum.photos/seed/${proj.img}/600/400`} 
                    alt={proj.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-primary mb-2">{proj.name}</h3>
                  <div className="text-sm text-muted-foreground mb-4">
                    Площадь: {proj.area} м² • {proj.floors} эт.
                  </div>
                  <Button className="w-full bg-muted text-primary hover:bg-primary hover:text-white" asChild>
                    <Link href={`/projects/${proj.slug}`}>Подробнее</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
