import { useState, useEffect } from "react";
import { Link } from "wouter";
import { CheckCircle, XCircle, MinusCircle, Info } from "lucide-react";

const materials = [
  {
    id: "brevno",
    name: "Рубленое бревно",
    desc: "Традиционный сруб ручной рубки. Природная красота и долговечность.",
    color: "bg-amber-700",
    textColor: "text-amber-700",
    borderColor: "border-amber-700",
    bgLight: "bg-amber-50",
    icon: "🌲",
  },
  {
    id: "brus",
    name: "Профилированный брус",
    desc: "Собственное производство Кедр-Томск. Точная геометрия, быстрый монтаж.",
    color: "bg-sky-700",
    textColor: "text-sky-700",
    borderColor: "border-sky-700",
    bgLight: "bg-sky-50",
    icon: "🪵",
  },
  {
    id: "karkas",
    name: "Каркасный дом",
    desc: "Современная технология. Минимальная усадка, отличная теплоизоляция.",
    color: "bg-emerald-700",
    textColor: "text-emerald-700",
    borderColor: "border-emerald-700",
    bgLight: "bg-emerald-50",
    icon: "🏗️",
  },
];

type Score = "yes" | "no" | "mid";

interface Criterion {
  label: string;
  hint?: string;
  brevno: Score;
  brus: Score;
  karkas: Score;
  details: { brevno: string; brus: string; karkas: string };
}

const criteria: Criterion[] = [
  {
    label: "Стоимость строительства",
    hint: "Цена за м² коробки дома",
    brevno: "mid",
    brus: "mid",
    karkas: "yes",
    details: {
      brevno: "14 000–16 000 ₽/м² — дороже за счёт ручного труда",
      brus: "12 000–14 000 ₽/м² — оптимальное соотношение цены и качества",
      karkas: "11 000–13 000 ₽/м² — наиболее доступный вариант",
    },
  },
  {
    label: "Скорость строительства",
    hint: "От начала до заселения",
    brevno: "mid",
    brus: "yes",
    karkas: "yes",
    details: {
      brevno: "6–10 месяцев. Требует больше ручной работы на объекте",
      brus: "4–6 месяцев. Заводское изготовление ускоряет монтаж",
      karkas: "3–5 месяцев. Минимальное время на стройке",
    },
  },
  {
    label: "Усадка",
    hint: "Насколько дом даёт осадку после строительства",
    brevno: "no",
    brus: "mid",
    karkas: "yes",
    details: {
      brevno: "3–8%. Требует выжидания 1–2 года до финишной отделки",
      brus: "1–3%. Незначительная усадка, отделку можно начинать раньше",
      karkas: "Менее 0.5%. Можно заезжать сразу после строительства",
    },
  },
  {
    label: "Теплоизоляция",
    hint: "Эффективность удержания тепла зимой",
    brevno: "mid",
    brus: "yes",
    karkas: "yes",
    details: {
      brevno: "Зависит от диаметра бревна. Стена 300–400 мм держит тепло хорошо",
      brus: "Брус 200×300 мм + утеплитель. Отличные показатели для Сибири",
      karkas: "Современный утеплитель обеспечивает наилучшую теплоизоляцию",
    },
  },
  {
    label: "Экологичность",
    hint: "Натуральность материалов, воздухопроницаемость",
    brevno: "yes",
    brus: "yes",
    karkas: "mid",
    details: {
      brevno: "100% природный материал. Дышащие стены, здоровый микроклимат",
      brus: "Натуральное дерево без лишней химической обработки",
      karkas: "Дерево + утеплитель. Качество зависит от применяемых материалов",
    },
  },
  {
    label: "Долговечность",
    hint: "Расчётный срок службы при правильном уходе",
    brevno: "yes",
    brus: "yes",
    karkas: "mid",
    details: {
      brevno: "100+ лет. Рубленые дома стоят веками при надлежащем уходе",
      brus: "50–80 лет. При регулярной обработке срок сопоставим с бревном",
      karkas: "30–50 лет. Зависит от качества материалов и ухода",
    },
  },
  {
    label: "Внешний вид",
    hint: "Возможности архитектурного оформления",
    brevno: "yes",
    brus: "yes",
    karkas: "mid",
    details: {
      brevno: "Неповторимая природная красота. Каждый дом уникален",
      brus: "Аккуратный, современный вид. Легко комбинировать с другими материалами",
      karkas: "Требует внешней отделки: сайдинг, штукатурка, вагонка",
    },
  },
  {
    label: "Пожаростойкость",
    hint: "Устойчивость к возгоранию",
    brevno: "mid",
    brus: "mid",
    karkas: "mid",
    details: {
      brevno: "Массивное бревно горит медленнее тонких конструкций",
      brus: "Массивная древесина + огнезащитная пропитка по стандарту",
      karkas: "Требует дополнительных мер огнезащиты утеплителя",
    },
  },
  {
    label: "Сейсмостойкость",
    hint: "Устойчивость конструкции при нагрузках",
    brevno: "yes",
    brus: "yes",
    karkas: "yes",
    details: {
      brevno: "Рубленый сруб — одна из самых сейсмостойких конструкций",
      brus: "Монолитная конструкция хорошо сопротивляется нагрузкам",
      karkas: "Каркас гибко воспринимает нагрузки, хорошая сейсмостойкость",
    },
  },
];

const scoreIcon = (s: Score) => {
  if (s === "yes") return <CheckCircle size={22} className="text-emerald-500" />;
  if (s === "no") return <XCircle size={22} className="text-red-400" />;
  return <MinusCircle size={22} className="text-amber-400" />;
};

const scoreBg = (s: Score) => {
  if (s === "yes") return "bg-emerald-50";
  if (s === "no") return "bg-red-50";
  return "bg-amber-50";
};

export default function Comparison() {
  const [highlight, setHighlight] = useState<string | null>(null);
  const [openRow, setOpenRow] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-in-section").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero */}
      <section className="bg-primary text-white py-14">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-sm mb-4 text-white/70">
            <Link href="/" className="hover:text-accent transition-colors">Главная</Link>
            {" / "}
            <Link href="/services" className="hover:text-accent transition-colors">Услуги</Link>
            {" / "}Сравнение материалов
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Выбор материала для дома</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Сравниваем три основных технологии по 9 параметрам, чтобы помочь вам сделать правильный выбор
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Material cards + highlight toggle */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 fade-in-section">
          {materials.map((m) => (
            <button
              key={m.id}
              onClick={() => setHighlight(highlight === m.id ? null : m.id)}
              className={`text-left rounded-2xl border-2 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
                highlight === m.id
                  ? `${m.borderColor} ${m.bgLight} shadow-lg`
                  : "border-border bg-white hover:border-border/60"
              }`}
            >
              <div className="text-3xl mb-3">{m.icon}</div>
              <div className={`font-bold text-lg mb-1 ${highlight === m.id ? m.textColor : "text-foreground"}`}>
                {m.name}
              </div>
              <div className="text-sm text-muted-foreground leading-snug">{m.desc}</div>
              {highlight === m.id && (
                <div className={`text-xs font-semibold mt-3 ${m.textColor}`}>✓ Выделено в таблице</div>
              )}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted-foreground mb-6 flex items-center gap-1.5 fade-in-section">
          <Info size={14} />
          Нажмите на материал выше, чтобы выделить его в таблице. Нажмите на строку — узнайте подробности.
        </p>

        {/* Comparison table */}
        <div className="rounded-3xl border border-border overflow-hidden shadow-sm fade-in-section">
          {/* Header */}
          <div className="grid grid-cols-4 bg-primary text-white">
            <div className="p-4 text-sm font-semibold">Параметр</div>
            {materials.map((m) => (
              <div
                key={m.id}
                className={`p-4 text-center text-sm font-semibold border-l border-white/10 transition-all ${
                  highlight === m.id ? "bg-white/20" : ""
                }`}
              >
                <span className="mr-1">{m.icon}</span> {m.name.split(" ")[0]}
              </div>
            ))}
          </div>

          {/* Rows */}
          {criteria.map((c, i) => (
            <div key={i}>
              <button
                className={`w-full grid grid-cols-4 text-left transition-all duration-200 ${
                  i % 2 === 0 ? "bg-white" : "bg-muted/30"
                } hover:bg-accent/5`}
                onClick={() => setOpenRow(openRow === i ? null : i)}
              >
                <div className="p-4 border-r border-border">
                  <div className="font-medium text-foreground text-sm">{c.label}</div>
                  {c.hint && <div className="text-xs text-muted-foreground mt-0.5">{c.hint}</div>}
                </div>
                {(["brevno", "brus", "karkas"] as const).map((key) => (
                  <div
                    key={key}
                    className={`flex items-center justify-center p-4 border-l border-border transition-all ${
                      highlight === key ? scoreBg(c[key]) : ""
                    }`}
                  >
                    {scoreIcon(c[key])}
                  </div>
                ))}
              </button>

              {/* Expanded details row */}
              {openRow === i && (
                <div className="grid grid-cols-4 border-t border-accent/20 bg-accent/5 animate-slide-up">
                  <div className="p-3" />
                  {(["brevno", "brus", "karkas"] as const).map((key) => (
                    <div key={key} className="p-3 border-l border-border text-xs text-muted-foreground leading-relaxed">
                      {c.details[key]}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-5 mt-6 text-sm fade-in-section">
          <div className="flex items-center gap-2">
            <CheckCircle size={18} className="text-emerald-500" />
            <span className="text-muted-foreground">Отличный показатель</span>
          </div>
          <div className="flex items-center gap-2">
            <MinusCircle size={18} className="text-amber-400" />
            <span className="text-muted-foreground">Средний показатель</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle size={18} className="text-red-400" />
            <span className="text-muted-foreground">Требует внимания</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-primary rounded-3xl p-8 md:p-12 text-white text-center fade-in-section">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Не можете определиться?</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Наши специалисты помогут выбрать оптимальный материал исходя из вашего бюджета, климата и пожеланий.
            Консультация бесплатна.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/calculator"
              className="inline-block bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 hover:scale-105"
            >
              Рассчитать стоимость
            </Link>
            <Link
              href="/contacts"
              className="inline-block bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 border border-white/20"
            >
              Задать вопрос специалисту
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
