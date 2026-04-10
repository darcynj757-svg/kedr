import { useState, useEffect } from "react";
import { Link } from "wouter";
import { CheckCircle, ChevronRight, ChevronLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const houseTypes = [
  {
    id: "brus",
    label: "Из профилированного бруса",
    desc: "Собственное производство. Точная геометрия, хорошая теплоизоляция.",
    icon: "🪵",
    priceMin: 12000,
    priceMax: 14000,
  },
  {
    id: "brevno",
    label: "Из рубленого бревна",
    desc: "Традиционное строительство. Природная красота, долговечность.",
    icon: "🌲",
    priceMin: 14000,
    priceMax: 16000,
  },
  {
    id: "karkас",
    label: "Каркасный дом",
    desc: "Быстрое возведение, отличная теплоизоляция, доступная цена.",
    icon: "🏗️",
    priceMin: 11000,
    priceMax: 13000,
  },
  {
    id: "banya",
    label: "Баня или беседка",
    desc: "Традиционная русская баня из бруса или бревна под ключ.",
    icon: "🛁",
    priceMin: 12000,
    priceMax: 15000,
  },
];

const floorOptions = [
  { id: "1", label: "1 этаж", mult: 1.0 },
  { id: "1.5", label: "1,5 этажа", mult: 1.15 },
  { id: "2", label: "2 этажа", mult: 1.25 },
];

const extras = [
  { id: "foundation", label: "Фундамент", addMin: 3000, addMax: 6000 },
  { id: "roof", label: "Кровля под ключ", addMin: 2500, addMax: 4500 },
  { id: "interior", label: "Черновая отделка", addMin: 2000, addMax: 3500 },
  { id: "engineering", label: "Инженерные сети", addMin: 1500, addMax: 3000 },
];

const STEPS = ["Тип дома", "Площадь", "Этажность", "Опции", "Результат"];

export default function Calculator() {
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [houseType, setHouseType] = useState<string | null>(null);
  const [area, setArea] = useState(120);
  const [floors, setFloors] = useState("1");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const selectedType = houseTypes.find((t) => t.id === houseType);
  const selectedFloor = floorOptions.find((f) => f.id === floors)!;

  const calcPrice = () => {
    if (!selectedType) return { min: 0, max: 0 };
    const base = area * selectedFloor.mult;
    let addMin = 0;
    let addMax = 0;
    selectedExtras.forEach((id) => {
      const ex = extras.find((e) => e.id === id);
      if (ex) {
        addMin += ex.addMin;
        addMax += ex.addMax;
      }
    });
    return {
      min: Math.round(((selectedType.priceMin * base + addMin * base) / 100000)) * 100000,
      max: Math.round(((selectedType.priceMax * base + addMax * base) / 100000)) * 100000,
    };
  };

  const price = calcPrice();

  const formatPrice = (n: number) =>
    n >= 1000000
      ? `${(n / 1000000).toFixed(1).replace(".0", "")} млн ₽`
      : `${(n / 1000).toFixed(0)} тыс ₽`;

  const canNext = () => {
    if (step === 0) return !!houseType;
    if (step === 1) return area >= 30;
    return true;
  };

  const reset = () => {
    setStep(0);
    setHouseType(null);
    setArea(120);
    setFloors("1");
    setSelectedExtras([]);
    setPhone("");
    setName("");
    setSubmitted(false);
  };

  const handleSubmit = () => {
    if (!phone) return;
    toast({
      title: "Заявка принята!",
      description: "Перезвоним в течение 15 минут с точным расчётом",
    });
    setSubmitted(true);
  };

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-white py-14">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-sm mb-4 text-white/70">
            <Link href="/" className="hover:text-accent transition-colors">Главная</Link> / Калькулятор
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Рассчитать стоимость</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Получите ориентировочную стоимость вашего дома за 1 минуту. Точный расчёт — бесплатно после звонка специалиста.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 py-10 max-w-3xl">
        {/* Progress bar */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-3">
            {STEPS.map((label, idx) => (
              <div key={idx} className="flex flex-col items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                    idx < step
                      ? "bg-accent text-white"
                      : idx === step
                      ? "bg-primary text-white ring-4 ring-primary/20"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {idx < step ? <CheckCircle size={16} /> : idx + 1}
                </div>
                <span
                  className={`text-xs mt-1 hidden sm:block transition-colors ${
                    idx === step ? "text-primary font-semibold" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-500"
              style={{ width: `${(step / (STEPS.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Step content */}
        <div className="bg-white rounded-3xl border border-border shadow-sm p-8 min-h-[360px] flex flex-col">

          {/* Step 0: House type */}
          {step === 0 && (
            <div className="animate-slide-up">
              <h2 className="text-2xl font-bold text-primary mb-2">Тип дома</h2>
              <p className="text-muted-foreground mb-6">Выберите тип будущего строения</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {houseTypes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setHouseType(t.id)}
                    className={`text-left p-5 rounded-2xl border-2 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                      houseType === t.id
                        ? "border-accent bg-accent/5 shadow-md"
                        : "border-border hover:border-accent/40"
                    }`}
                  >
                    <div className="text-3xl mb-2">{t.icon}</div>
                    <div className="font-bold text-foreground mb-1">{t.label}</div>
                    <div className="text-sm text-muted-foreground leading-snug">{t.desc}</div>
                    <div className="text-xs text-accent font-semibold mt-2">
                      от {t.priceMin.toLocaleString()} ₽/м²
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Area */}
          {step === 1 && (
            <div className="animate-slide-up">
              <h2 className="text-2xl font-bold text-primary mb-2">Площадь дома</h2>
              <p className="text-muted-foreground mb-8">Укажите желаемую общую площадь</p>
              <div className="text-center mb-8">
                <div className="text-6xl font-bold text-accent mb-1">{area}</div>
                <div className="text-xl text-muted-foreground">м²</div>
              </div>
              <input
                type="range"
                min={30}
                max={500}
                step={5}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none bg-muted accent-accent cursor-pointer mb-6"
                style={{ accentColor: "hsl(var(--accent))" }}
              />
              <div className="flex justify-between text-sm text-muted-foreground mb-6">
                <span>30 м²</span>
                <span>100 м²</span>
                <span>200 м²</span>
                <span>300 м²</span>
                <span>500 м²</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Или введите точное значение:</span>
                <input
                  type="number"
                  value={area}
                  min={30}
                  max={500}
                  onChange={(e) => setArea(Math.min(500, Math.max(30, Number(e.target.value))))}
                  className="w-24 border border-border rounded-lg px-3 py-1.5 text-center font-bold focus:outline-none focus:ring-2 focus:ring-accent/40"
                />
                <span className="text-sm text-muted-foreground">м²</span>
              </div>
            </div>
          )}

          {/* Step 2: Floors */}
          {step === 2 && (
            <div className="animate-slide-up">
              <h2 className="text-2xl font-bold text-primary mb-2">Этажность</h2>
              <p className="text-muted-foreground mb-8">Сколько этажей планируете?</p>
              <div className="grid grid-cols-3 gap-4">
                {floorOptions.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFloors(f.id)}
                    className={`p-6 rounded-2xl border-2 text-center transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${
                      floors === f.id
                        ? "border-accent bg-accent/5 shadow-md"
                        : "border-border hover:border-accent/40"
                    }`}
                  >
                    <div className="text-4xl mb-3">
                      {f.id === "1" ? "🏠" : f.id === "1.5" ? "🏡" : "🏢"}
                    </div>
                    <div className="font-bold text-foreground">{f.label}</div>
                    {f.mult > 1 && (
                      <div className="text-xs text-muted-foreground mt-1">
                        +{Math.round((f.mult - 1) * 100)}% к цене
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Extras */}
          {step === 3 && (
            <div className="animate-slide-up">
              <h2 className="text-2xl font-bold text-primary mb-2">Дополнительные работы</h2>
              <p className="text-muted-foreground mb-6">Выберите, что включить в расчёт (необязательно)</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {extras.map((ex) => {
                  const selected = selectedExtras.includes(ex.id);
                  return (
                    <button
                      key={ex.id}
                      onClick={() => toggleExtra(ex.id)}
                      className={`flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200 ${
                        selected
                          ? "border-accent bg-accent/5"
                          : "border-border hover:border-accent/40"
                      }`}
                    >
                      <div
                        className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                          selected ? "bg-accent border-accent" : "border-muted-foreground/40"
                        }`}
                      >
                        {selected && <CheckCircle size={12} className="text-white" />}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground text-sm">{ex.label}</div>
                        <div className="text-xs text-muted-foreground">
                          +{ex.addMin.toLocaleString()}–{ex.addMax.toLocaleString()} ₽/м²
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Можно пропустить этот шаг — выберем вместе при звонке
              </p>
            </div>
          )}

          {/* Step 4: Result */}
          {step === 4 && !submitted && (
            <div className="animate-scale-in">
              <h2 className="text-2xl font-bold text-primary mb-2">Ваш расчёт готов</h2>
              <p className="text-muted-foreground mb-6">Ориентировочная стоимость строительства</p>

              {/* Summary */}
              <div className="bg-muted/50 rounded-2xl p-5 mb-6">
                <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
                  <span className="text-muted-foreground">Тип дома:</span>
                  <span className="font-semibold">{selectedType?.label}</span>
                  <span className="text-muted-foreground">Площадь:</span>
                  <span className="font-semibold">{area} м²</span>
                  <span className="text-muted-foreground">Этажность:</span>
                  <span className="font-semibold">{selectedFloor?.label}</span>
                  {selectedExtras.length > 0 && (
                    <>
                      <span className="text-muted-foreground">Дополнительно:</span>
                      <span className="font-semibold">
                        {selectedExtras.map((id) => extras.find((e) => e.id === id)?.label).join(", ")}
                      </span>
                    </>
                  )}
                </div>
                <div className="border-t border-border pt-4 text-center">
                  <div className="text-sm text-muted-foreground mb-1">Стоимость строительства:</div>
                  <div className="text-3xl font-bold text-accent">
                    {formatPrice(price.min)} — {formatPrice(price.max)}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    * Ориентировочно. Точная цена — после выезда специалиста
                  </div>
                </div>
              </div>

              {/* Contact form */}
              <p className="text-sm font-semibold mb-3">
                Оставьте контакты — перезвоним с точным расчётом бесплатно:
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/40 text-sm"
                />
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 border border-border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent/40 text-sm"
                />
              </div>
              <Button
                className="w-full mt-4 bg-accent hover:bg-primary text-white py-3 text-base font-semibold hover:scale-[1.02] transition-all"
                onClick={handleSubmit}
                disabled={!phone}
              >
                Получить точный расчёт бесплатно
              </Button>
            </div>
          )}

          {/* Submitted state */}
          {step === 4 && submitted && (
            <div className="flex flex-col items-center justify-center flex-1 text-center animate-scale-in py-8">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-5">
                <CheckCircle size={40} className="text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">Заявка принята!</h3>
              <p className="text-muted-foreground max-w-sm mb-2">
                Наш специалист перезвонит вам в течение 15 минут и подготовит точный расчёт.
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Стоимость консультации: <strong className="text-foreground">бесплатно</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={reset}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  <RotateCcw size={14} /> Новый расчёт
                </button>
                <Link
                  href="/projects"
                  className="text-sm bg-accent text-white px-6 py-2.5 rounded-xl hover:bg-primary transition-colors"
                >
                  Смотреть проекты →
                </Link>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          {step < 4 && (
            <div className="flex items-center justify-between mt-auto pt-8">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} /> Назад
              </button>

              <div className="flex gap-3">
                {step === 3 && (
                  <Button
                    variant="outline"
                    onClick={() => setStep(4)}
                    className="text-sm"
                  >
                    Пропустить
                  </Button>
                )}
                <Button
                  onClick={() => setStep((s) => s + 1)}
                  disabled={!canNext()}
                  className="bg-accent hover:bg-primary text-white flex items-center gap-1.5 hover:scale-105 transition-all disabled:opacity-50"
                >
                  {step === 3 ? "Показать результат" : "Далее"} <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Trust block */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          {[
            { val: "Бесплатно", label: "консультация и расчёт" },
            { val: "15 мин", label: "время ответа" },
            { val: "Гарантия", label: "цены в договоре" },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 border border-border shadow-sm">
              <div className="text-lg font-bold text-accent mb-0.5">{item.val}</div>
              <div className="text-xs text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
