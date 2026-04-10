import { useState, useMemo, useEffect } from "react";
import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { projects } from "@/data/projects";

export default function Projects() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [areaFilter, setAreaFilter] = useState("all");
  const [floorsFilter, setFloorsFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, type]);
    } else {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    }
  };

  const resetFilters = () => {
    setSelectedTypes([]);
    setAreaFilter("all");
    setFloorsFilter("all");
    setPriceFilter("all");
  };

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (selectedTypes.length > 0 && !selectedTypes.includes(p.type)) return false;
      
      if (areaFilter === "upTo100" && p.area > 100) return false;
      if (areaFilter === "100to200" && (p.area <= 100 || p.area > 200)) return false;
      if (areaFilter === "over200" && p.area <= 200) return false;

      if (floorsFilter === "1" && p.floors !== 1) return false;
      if (floorsFilter === "1.5" && p.floors !== 1.5) return false;
      if (floorsFilter === "2" && p.floors !== 2) return false;

      if (priceFilter === "upTo2m" && p.price > 2000000) return false;
      if (priceFilter === "2to5m" && (p.price <= 2000000 || p.price > 5000000)) return false;
      if (priceFilter === "over5m" && p.price <= 5000000) return false;

      return true;
    });
  }, [selectedTypes, areaFilter, floorsFilter, priceFilter]);

  return (
    <div className="min-h-screen bg-background fade-in-section visible" data-testid="projects-page">
      {/* Hero */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-sm mb-4 text-white/70">
            <Link href="/" className="hover:text-accent transition-colors">Главная</Link> / Каталог проектов
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Каталог проектов</h1>
          <p className="text-xl text-white/80">Выберите идеальный дом для вашей семьи</p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 py-12 flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-1/4">
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm sticky top-24">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Фильтры</h3>
              <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs text-muted-foreground hover:text-primary">
                Сбросить
              </Button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-3">Тип дома</h4>
                <div className="space-y-2">
                  {[
                    { id: "brus", label: "Из профилированного бруса" },
                    { id: "brvno", label: "Из рубленого бревна" },
                    { id: "karkasny", label: "Каркасный" },
                    { id: "banya", label: "Баня/беседка" },
                  ].map((type) => (
                    <div key={type.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`type-${type.id}`} 
                        checked={selectedTypes.includes(type.id)}
                        onCheckedChange={(c) => handleTypeChange(type.id, !!c)}
                      />
                      <label htmlFor={`type-${type.id}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        {type.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Площадь</h4>
                <RadioGroup value={areaFilter} onValueChange={setAreaFilter}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="area-all" />
                    <Label htmlFor="area-all">Все</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upTo100" id="area-100" />
                    <Label htmlFor="area-100">до 100 м²</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="100to200" id="area-200" />
                    <Label htmlFor="area-200">100–200 м²</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="over200" id="area-300" />
                    <Label htmlFor="area-300">от 200 м²</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Этажность</h4>
                <RadioGroup value={floorsFilter} onValueChange={setFloorsFilter}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="floors-all" />
                    <Label htmlFor="floors-all">Все</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="floors-1" />
                    <Label htmlFor="floors-1">1 этаж</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1.5" id="floors-1.5" />
                    <Label htmlFor="floors-1.5">1.5 этажа</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="floors-2" />
                    <Label htmlFor="floors-2">2 этажа</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Стоимость</h4>
                <RadioGroup value={priceFilter} onValueChange={setPriceFilter}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="price-all" />
                    <Label htmlFor="price-all">Все</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upTo2m" id="price-2m" />
                    <Label htmlFor="price-2m">до 2 млн ₽</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2to5m" id="price-5m" />
                    <Label htmlFor="price-5m">2–5 млн ₽</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="over5m" id="price-over5m" />
                    <Label htmlFor="price-over5m">от 5 млн ₽</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Проектов найдено: {filteredProjects.length}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((proj) => (
              <div key={proj.slug} className="bg-white rounded-xl overflow-hidden shadow-sm border border-border group hover:shadow-md transition-all">
                <div className="relative h-60 overflow-hidden">
                  <img 
                    src={proj.img} 
                    alt={proj.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {proj.badge && (
                    <Badge className="absolute top-4 left-4 bg-accent text-white px-3 py-1 text-sm">{proj.badge}</Badge>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-4">{proj.name}</h3>
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    <div className="text-center p-2 bg-muted rounded-lg">
                      <span className="block text-xs text-muted-foreground mb-1">Площадь</span>
                      <span className="font-semibold text-foreground">{proj.area} м²</span>
                    </div>
                    <div className="text-center p-2 bg-muted rounded-lg">
                      <span className="block text-xs text-muted-foreground mb-1">Этажность</span>
                      <span className="font-semibold text-foreground">{proj.floors}</span>
                    </div>
                    <div className="text-center p-2 bg-muted rounded-lg">
                      <span className="block text-xs text-muted-foreground mb-1">Спальни</span>
                      <span className="font-semibold text-foreground">{proj.beds}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <div>
                      <span className="text-sm text-muted-foreground block">Стоимость:</span>
                      <span className="text-lg font-bold text-primary">от {proj.price.toLocaleString()} ₽</span>
                    </div>
                    <Button className="bg-accent hover:bg-primary text-white" asChild>
                      <Link href={`/projects/${proj.slug}`}>Подробнее</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16 bg-white rounded-xl border border-border">
              <p className="text-lg text-muted-foreground">По вашим критериям не найдено проектов. Попробуйте изменить фильтры.</p>
              <Button variant="outline" className="mt-4" onClick={resetFilters}>Сбросить фильтры</Button>
            </div>
          )}
        </main>
      </div>

      {/* CTA Banner */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Не нашли подходящий проект?</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Разработаем индивидуальный проект с учетом всех ваших пожеланий, особенностей участка и бюджета.
          </p>
          <Button size="lg" className="bg-accent hover:bg-accent/90 text-white" asChild>
            <Link href="/contacts">Заказать индивидуальный проект</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
