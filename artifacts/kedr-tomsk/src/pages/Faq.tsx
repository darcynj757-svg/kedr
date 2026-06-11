import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ChevronDown, Search } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
  category: string;
}

const faqs: FaqItem[] = [
  // Общие
  {
    category: "Общее",
    q: "В каких регионах вы строите?",
    a: "Мы работаем по всей территории России. Основная зона — Томск и Томская область, Новосибирск, Кемерово, Барнаул, Красноярск. Также выполняем проекты в Москве, на Урале, в Сибири и на Дальнем Востоке. Стоимость доставки материалов рассчитывается индивидуально.",
  },
  {
    category: "Общее",
    q: "Сколько лет компания на рынке?",
    a: "«Кедр-Томск» основан в 2001 году. За 25 лет мы построили более 320 объектов — дома, бани, беседки и производственные здания из дерева по всей России.",
  },
  {
    category: "Общее",
    q: "Можно ли приехать и посмотреть готовые объекты?",
    a: "Да. Мы организуем экскурсии на готовые объекты и на наше производство в Томске. Запишитесь по телефону +7 (3822) 33-44-39 или оставьте заявку — мы согласуем удобное время.",
  },
  {
    category: "Общее",
    q: "Работаете ли вы под договором?",
    a: "Обязательно. Мы работаем только по официальному договору, в котором фиксируются: состав работ, сроки, стоимость, гарантии. Никаких устных договорённостей — все условия прописаны документально.",
  },
  // Проектирование
  {
    category: "Проектирование",
    q: "Как происходит выбор проекта?",
    a: "Вы можете выбрать готовый проект из нашего каталога или заказать индивидуальный. При выборе готового проекта — адаптируем его под ваш участок и пожелания. При индивидуальном — работаем с нашим архитектором или вашими чертежами.",
  },
  {
    category: "Проектирование",
    q: "Могу ли я использовать свой проект?",
    a: "Да, мы строим по проектам заказчиков. Нам нужен комплект чертежей: планы этажей, фасады, разрезы. Если проект требует доработки для технологии деревянного домостроения — наш конструктор внесёт необходимые изменения.",
  },
  {
    category: "Проектирование",
    q: "Нужно ли разрешение на строительство дома?",
    a: "Для жилого дома на ИЖС — уведомление о начале строительства в местную администрацию (вместо разрешения с 2018 года). Для домов на садовых участках — аналогично. Мы консультируем по этому вопросу бесплатно.",
  },
  // Производство и материалы
  {
    category: "Материалы",
    q: "Из какого дерева строите?",
    a: "Используем сосну и ель Томской области — одну из лучших в России по плотности и смолистости. Брус производится на нашем собственном заводе в Томске на немецком оборудировании. Сечение 200×200 мм и 200×300 мм для стен.",
  },
  {
    category: "Материалы",
    q: "Какова влажность используемого бруса?",
    a: "Используем брус естественной влажности (до 22%) и камерной сушки (8–12%). Камерная сушка рекомендуется для домов с быстрым заездом — усадка минимальна. Брус ЕВ подходит для домов с отсрочкой отделки.",
  },
  {
    category: "Материалы",
    q: "Чем отличается профилированный брус от рубленого бревна?",
    a: "Профилированный брус — заводское производство, точная геометрия, шип-паз соединение, минимальная усадка (1–3%). Рубленое бревно — ручная работа, природный вид, более высокая усадка (3–8%), требует выжидания 1–2 года до финишной отделки. Подробно — на странице сравнения материалов.",
  },
  {
    category: "Материалы",
    q: "Применяете ли вы антисептики и пропитки?",
    a: "Да. Все деревянные конструкции обрабатываются антисептической пропиткой на производстве. После монтажа — торцы и наружные поверхности обрабатываются защитным составом. Используем сертифицированные материалы Belinka, Tikkurila, Remmers.",
  },
  // Строительство и сроки
  {
    category: "Строительство",
    q: "Сколько времени занимает строительство дома?",
    a: "Зависит от размера и сложности. Ориентировочно: коробка дома из бруса 100–150 м² — 3–5 недель. С учётом фундамента, кровли и отделки — 4–7 месяцев. Каркасные дома строятся быстрее — от 2 месяцев под ключ.",
  },
  {
    category: "Строительство",
    q: "Строите ли зимой?",
    a: "Да. Деревянные дома строятся круглый год. Зимой монтаж продолжается без ограничений — древесина не боится мороза. Фундаментные работы при температуре ниже −15°C проводятся с прогревом бетона.",
  },
  {
    category: "Строительство",
    q: "Включает ли договор гарантию?",
    a: "Да. Гарантия на конструктив (сруб, стены, перекрытия) — 5 лет. На кровлю — 3 года. На инженерные системы — по гарантии производителей оборудования (обычно 1–3 года). Гарантийные обязательства прописаны в договоре.",
  },
  {
    category: "Строительство",
    q: "Нужно ли мне присутствовать на стройке?",
    a: "Нет. У каждого объекта есть прораб, который контролирует работы. Мы присылаем фотоотчёты по этапам и всегда на связи. Но если хотите — приезжайте в любое время, мы рады показать ход строительства.",
  },
  // Стоимость и оплата
  {
    category: "Стоимость",
    q: "Из чего складывается стоимость строительства?",
    a: "Основные составляющие: фундамент, стены (коробка), кровля, окна/двери, перекрытия, отделка, инженерные системы. Стоимость «коробки» из бруса — от 12 000 ₽/м². Полный дом под ключ — от 22 000 ₽/м² в зависимости от отделки.",
  },
  {
    category: "Стоимость",
    q: "Возможна ли рассрочка или этапная оплата?",
    a: "Да. Стандартная схема оплаты — поэтапная: аванс 30% при заключении договора, 40% на этапе монтажа коробки, 30% после завершения работ. Возможна рассрочка от компании на отдельных условиях — уточняйте у менеджера.",
  },
  {
    category: "Стоимость",
    q: "Как получить точный расчёт стоимости?",
    a: "Используйте наш калькулятор на сайте для ориентировочного расчёта. Точная стоимость определяется после изучения проекта и выезда специалиста на участок. Расчёт — бесплатно.",
  },
  {
    category: "Стоимость",
    q: "Есть ли скрытые платежи?",
    a: "Нет. Все работы и материалы фиксируются в смете до начала строительства. Если в процессе вы хотите изменить что-то — составляется дополнительное соглашение. Никаких сюрпризов в конце.",
  },
];

const categories = ["Все", ...Array.from(new Set(faqs.map((f) => f.category)))];

export default function Faq() {
  const [activeCategory, setActiveCategory] = useState("Все");
  const [search, setSearch] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-in-section").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const filtered = faqs.filter((f) => {
    const matchCat = activeCategory === "Все" || f.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  const grouped: Record<string, FaqItem[]> = {};
  filtered.forEach((f) => {
    if (!grouped[f.category]) grouped[f.category] = [];
    grouped[f.category].push(f);
  });

  const globalIdx = (cat: string, localIdx: number) => {
    let count = 0;
    for (const c of Object.keys(grouped)) {
      if (c === cat) return count + localIdx;
      count += grouped[c].length;
    }
    return localIdx;
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero */}
      <section className="bg-primary text-white py-14">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-sm mb-4 text-white/70">
            <Link href="/" className="hover:text-accent transition-colors">Главная</Link> / Вопросы и ответы
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Часто задаваемые вопросы</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Ответы на самые распространённые вопросы о строительстве, материалах и условиях работы
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 py-12 max-w-4xl">
        {/* Search */}
        <div className="relative mb-8 fade-in-section">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск по вопросам..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setOpenIndex(null); }}
            className="w-full pl-11 pr-4 py-3.5 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/40 bg-white text-sm shadow-sm"
          />
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10 fade-in-section">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setOpenIndex(null); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-accent text-white shadow-sm"
                  : "bg-white border border-border text-foreground hover:border-accent/40 hover:text-accent"
              }`}
            >
              {cat}
              {cat !== "Все" && (
                <span className={`ml-1.5 text-xs ${activeCategory === cat ? "text-white/80" : "text-muted-foreground"}`}>
                  ({faqs.filter((f) => f.category === cat).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* FAQ accordion grouped by category */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground fade-in-section">
            По вашему запросу ничего не найдено. Попробуйте другой вопрос.
          </div>
        ) : (
          Object.entries(grouped).map(([cat, items]) => (
            <div key={cat} className="mb-10 fade-in-section">
              {activeCategory === "Все" && (
                <h2 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-6 bg-accent rounded-full inline-block" />
                  {cat}
                </h2>
              )}
              <div className="space-y-2">
                {items.map((item, localIdx) => {
                  const idx = globalIdx(cat, localIdx);
                  const isOpen = openIndex === idx;
                  return (
                    <div
                      key={localIdx}
                      className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                        isOpen ? "border-accent/40 shadow-md" : "border-border bg-white hover:border-accent/30"
                      }`}
                    >
                      <button
                        className="w-full flex items-center justify-between gap-4 p-5 text-left"
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                      >
                        <span className={`font-semibold text-sm leading-snug ${isOpen ? "text-accent" : "text-foreground"}`}>
                          {item.q}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? "rotate-180 text-accent" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 animate-slide-up">
                          <div className="border-t border-border/60 pt-4 text-sm text-muted-foreground leading-relaxed">
                            {item.a}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}

        {/* Didn't find answer CTA */}
        <div className="mt-12 bg-primary rounded-3xl p-8 md:p-10 text-white text-center fade-in-section">
          <h2 className="text-2xl font-bold mb-2">Не нашли ответ на свой вопрос?</h2>
          <p className="text-white/80 mb-6 max-w-lg mx-auto">
            Наши специалисты ответят на любой вопрос о строительстве бесплатно — по телефону или в мессенджере
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+73822334439"
              className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-xl hover:bg-white/90 transition-all"
            >
              +7 (3822) 33-44-39
            </a>
            <Link
              href="/contacts"
              className="inline-block bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-3 rounded-xl transition-all"
            >
              Написать нам
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
