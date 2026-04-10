import { useState, useEffect } from "react";
import { Link } from "wouter";
import { MapPin, Home, Trees, Building2 } from "lucide-react";

interface City {
  name: string;
  region: string;
  x: number; // % from left
  y: number; // % from top
  count: number;
  objects: string[];
  highlight?: boolean;
}

const cities: City[] = [
  {
    name: "Томск",
    region: "Томская область",
    x: 57.5,
    y: 38,
    count: 142,
    objects: ["Дома из бруса", "Рубленые срубы", "Бани", "Беседки"],
    highlight: true,
  },
  {
    name: "Новосибирск",
    region: "Новосибирская область",
    x: 54,
    y: 42,
    count: 38,
    objects: ["Дома из бруса", "Бани"],
  },
  {
    name: "Кемерово",
    region: "Кемеровская область",
    x: 57,
    y: 44,
    count: 24,
    objects: ["Дома из бруса", "Рубленые срубы"],
  },
  {
    name: "Барнаул",
    region: "Алтайский край",
    x: 54.5,
    y: 48,
    count: 18,
    objects: ["Дома из бруса", "Бани"],
  },
  {
    name: "Красноярск",
    region: "Красноярский край",
    x: 62,
    y: 37,
    count: 21,
    objects: ["Рубленые срубы", "Дома из бруса"],
  },
  {
    name: "Иркутск",
    region: "Иркутская область",
    x: 69.5,
    y: 43,
    count: 12,
    objects: ["Рубленые срубы", "Бани"],
  },
  {
    name: "Екатеринбург",
    region: "Свердловская область",
    x: 43.5,
    y: 36,
    count: 14,
    objects: ["Дома из бруса"],
  },
  {
    name: "Москва",
    region: "Московская область",
    x: 29,
    y: 32,
    count: 11,
    objects: ["Дома из бруса", "Бани"],
  },
  {
    name: "Санкт-Петербург",
    region: "Ленинградская область",
    x: 26,
    y: 23,
    count: 6,
    objects: ["Дома из бруса"],
  },
  {
    name: "Краснодар",
    region: "Краснодарский край",
    x: 28,
    y: 50,
    count: 9,
    objects: ["Каркасные дома", "Бани"],
  },
  {
    name: "Тюмень",
    region: "Тюменская область",
    x: 45.5,
    y: 33,
    count: 16,
    objects: ["Дома из бруса", "Рубленые срубы"],
  },
  {
    name: "Якутск",
    region: "Республика Саха",
    x: 80,
    y: 22,
    count: 7,
    objects: ["Дома из бруса"],
  },
  {
    name: "Хабаровск",
    region: "Хабаровский край",
    x: 90,
    y: 38,
    count: 5,
    objects: ["Рубленые срубы"],
  },
  {
    name: "Магадан",
    region: "Магаданская область",
    x: 88,
    y: 24,
    count: 3,
    objects: ["Дома из бруса"],
  },
  {
    name: "Омск",
    region: "Омская область",
    x: 49.5,
    y: 38,
    count: 19,
    objects: ["Дома из бруса", "Бани"],
  },
];

const stats = [
  { label: "Регионов охвачено", value: "24" },
  { label: "Построено объектов", value: "320+" },
  { label: "Лет на рынке", value: "25" },
  { label: "Средний рейтинг", value: "5.0" },
];

export default function Geography() {
  const [active, setActive] = useState<string | null>("Томск");

  useEffect(() => {
    window.scrollTo(0, 0);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-in-section").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const activeCity = cities.find((c) => c.name === active);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-primary text-white py-14">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-sm mb-4 text-white/70">
            <Link href="/" className="hover:text-accent transition-colors">Главная</Link>
            {" / "}О компании / География работ
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3">География работ</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            Строим деревянные дома по всей России — от Санкт-Петербурга до Магадана
          </p>
        </div>
      </section>

      {/* Stats row */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {stats.map((s, i) => (
              <div key={i} className="py-6 px-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-accent">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start fade-in-section">

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="relative bg-gradient-to-br from-sky-50 to-blue-100 rounded-3xl border border-border overflow-hidden shadow-sm"
              style={{ paddingBottom: "62%" }}>

              {/* Russia SVG outline */}
              <svg
                viewBox="0 0 1000 620"
                className="absolute inset-0 w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Simplified Russia shape */}
                <path
                  d="M 60 180 L 80 140 L 120 120 L 150 100 L 200 90 L 230 80 L 250 60 L 290 55 L 310 70 L 330 60 L 360 65 L 380 55 L 400 60 L 420 50 L 450 55 L 480 45 L 520 50 L 560 40 L 600 50 L 640 45 L 680 55 L 720 50 L 760 60 L 800 55 L 840 65 L 880 80 L 920 100 L 950 130 L 960 160 L 950 190 L 940 220 L 920 240 L 900 250 L 880 260 L 860 280 L 840 300 L 820 310 L 800 320 L 780 310 L 760 320 L 740 340 L 720 350 L 700 370 L 680 380 L 660 390 L 640 400 L 620 410 L 600 420 L 580 430 L 560 420 L 540 430 L 520 440 L 500 450 L 480 440 L 460 450 L 440 460 L 420 470 L 400 460 L 380 470 L 360 480 L 340 490 L 320 480 L 300 490 L 280 500 L 260 490 L 240 500 L 220 510 L 200 500 L 180 490 L 160 500 L 140 490 L 120 480 L 100 470 L 80 460 L 60 440 L 50 410 L 45 380 L 50 350 L 55 320 L 60 290 L 55 260 L 50 230 L 55 200 Z"
                  fill="white"
                  stroke="#0A2540"
                  strokeWidth="2"
                  strokeOpacity="0.15"
                  fillOpacity="0.8"
                />

                {/* Grid lines for reference */}
                {[25, 37.5, 50, 62.5, 75].map((y) => (
                  <line key={y} x1="0" y1={y * 6.2} x2="1000" y2={y * 6.2} stroke="#0A254010" strokeWidth="1" />
                ))}
                {[20, 40, 60, 80].map((x) => (
                  <line key={x} x1={x * 10} y1="0" x2={x * 10} y2="620" stroke="#0A254010" strokeWidth="1" />
                ))}

                {/* Urals divider */}
                <line x1="430" y1="60" x2="390" y2="500" stroke="#0A254020" strokeWidth="1.5" strokeDasharray="6,4" />
                <text x="415" y="290" fill="#0A254040" fontSize="11" transform="rotate(-78, 415, 290)">Урал</text>

                {/* City markers */}
                {cities.map((city) => {
                  const cx = (city.x / 100) * 1000;
                  const cy = (city.y / 100) * 620;
                  const isActive = active === city.name;
                  const r = city.highlight ? 12 : city.count > 30 ? 9 : city.count > 15 ? 7.5 : 6;

                  return (
                    <g
                      key={city.name}
                      onClick={() => setActive(city.name)}
                      style={{ cursor: "pointer" }}
                    >
                      {/* Pulse ring for Tomsk */}
                      {city.highlight && (
                        <circle cx={cx} cy={cy} r={22} fill="none" stroke="#0EA5E9" strokeWidth="2" opacity="0.4">
                          <animate attributeName="r" values="16;26;16" dur="2.5s" repeatCount="indefinite" />
                          <animate attributeName="opacity" values="0.5;0;0.5" dur="2.5s" repeatCount="indefinite" />
                        </circle>
                      )}
                      {/* Active ring */}
                      {isActive && !city.highlight && (
                        <circle cx={cx} cy={cy} r={r + 6} fill="none" stroke="#0EA5E9" strokeWidth="2" opacity="0.5" />
                      )}
                      {/* Main dot */}
                      <circle
                        cx={cx}
                        cy={cy}
                        r={r}
                        fill={city.highlight ? "#0EA5E9" : isActive ? "#0EA5E9" : "#0A2540"}
                        opacity={isActive || city.highlight ? 1 : 0.7}
                      />
                      {/* City label */}
                      <text
                        x={cx}
                        y={cy - r - 5}
                        textAnchor="middle"
                        fontSize={city.highlight ? "13" : "11"}
                        fontWeight={city.highlight || isActive ? "700" : "500"}
                        fill={city.highlight ? "#0A2540" : isActive ? "#0A2540" : "#0A254099"}
                      >
                        {city.name}
                      </text>
                      {/* Count badge */}
                      {(isActive || city.highlight) && (
                        <text
                          x={cx}
                          y={cy + r + 14}
                          textAnchor="middle"
                          fontSize="10"
                          fill="#0EA5E9"
                          fontWeight="600"
                        >
                          {city.count} объектов
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Legend */}
                <g transform="translate(20, 540)">
                  <circle cx="8" cy="8" r="8" fill="#0EA5E9" />
                  <text x="22" y="13" fontSize="11" fill="#0A254099">Главный офис и производство</text>
                  <circle cx="8" cy="28" r="6" fill="#0A2540" opacity="0.7" />
                  <text x="22" y="33" fontSize="11" fill="#0A254099">Объекты построены</text>
                </g>
              </svg>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-3">
              Нажмите на город, чтобы узнать подробности
            </p>
          </div>

          {/* City detail panel */}
          <div className="space-y-4">
            {activeCity ? (
              <div className="bg-white rounded-2xl border border-border shadow-sm p-6 animate-slide-up">
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${activeCity.highlight ? "bg-accent" : "bg-primary"}`}>
                    <MapPin size={18} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-primary">{activeCity.name}</h3>
                    <div className="text-sm text-muted-foreground">{activeCity.region}</div>
                    {activeCity.highlight && (
                      <div className="text-xs text-accent font-semibold mt-0.5">Главный офис и производство</div>
                    )}
                  </div>
                </div>

                <div className="bg-accent/5 rounded-xl p-4 mb-4 text-center">
                  <div className="text-3xl font-bold text-accent mb-0.5">{activeCity.count}</div>
                  <div className="text-sm text-muted-foreground">объектов построено</div>
                </div>

                <div className="mb-4">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Типы объектов</div>
                  <div className="flex flex-wrap gap-2">
                    {activeCity.objects.map((o, i) => (
                      <span key={i} className="text-xs bg-muted px-2.5 py-1 rounded-full text-foreground border border-border">
                        {o}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contacts"
                  className="block text-center text-sm bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl transition-all"
                >
                  Связаться по {activeCity.name}у
                </Link>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-border p-6 text-center text-muted-foreground text-sm">
                Выберите город на карте
              </div>
            )}

            {/* City list */}
            <div className="bg-white rounded-2xl border border-border shadow-sm p-4">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Все города</div>
              <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
                {[...cities].sort((a, b) => b.count - a.count).map((city) => (
                  <button
                    key={city.name}
                    onClick={() => setActive(city.name)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all ${
                      active === city.name
                        ? "bg-accent/10 text-accent font-semibold"
                        : "hover:bg-muted text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${city.highlight ? "bg-accent" : "bg-primary/60"}`} />
                      {city.name}
                    </div>
                    <span className="text-xs text-muted-foreground">{city.count} объ.</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 bg-primary rounded-3xl p-8 md:p-12 text-white text-center fade-in-section">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Строим в вашем регионе</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Если вашего города нет на карте — это не проблема. Мы работаем по всей России, доставляем материалы и выезжаем бригадой.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/calculator"
              className="inline-block bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-3 rounded-xl transition-all hover:scale-105"
            >
              Рассчитать стоимость
            </Link>
            <Link
              href="/contacts"
              className="inline-block bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-3 rounded-xl transition-all"
            >
              Уточнить условия доставки
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
