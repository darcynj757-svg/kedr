
import { Link } from "wouter";
import { FaVk, FaTelegram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const navLinks = [
    { label: "Главная", to: "/" },
    { label: "Проекты", to: "/projects" },
    { label: "Фотогалерея", to: "/gallery" },
    { label: "Услуги", to: "/services" },
    { label: "Этапы строительства", to: "/stages" },
    { label: "О компании", to: "/about" },
    { label: "Производство", to: "/production" },
    { label: "Статьи", to: "/articles" },
    { label: "Контакты", to: "/contacts" },
  ];

  const usefulLinks = [
    { label: "Калькулятор стоимости", to: "/calculator" },
    { label: "Сравнение материалов", to: "/comparison" },
    { label: "Вопросы и ответы", to: "/faq" },
    { label: "География работ", to: "/geography" },
  ];

  return (
    <footer className="bg-black border-t border-white/8 text-white" data-testid="footer">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16 border-b border-white/8">
          <div>
            <Link href="/" className="inline-block mb-6">
              <img src="/logo.png" alt="Кедр-Томск" className="h-12 w-auto object-contain" style={{ filter: "brightness(1.1)" }} />
            </Link>
            <p className="text-white/35 mb-8 text-sm leading-relaxed font-light">
              Строительство деревянных домов под ключ в Томске и Томской области. Собственное производство, гарантия качества 5 лет.
            </p>
            <div className="flex gap-3">
              {[FaVk, FaTelegram, FaYoutube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/40 hover:border-accent hover:text-accent transition-all duration-300 rounded-sm">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-xs font-semibold mb-6 uppercase tracking-[0.2em] text-white/40">Навигация</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.to} className="text-white/40 hover:text-accent transition-colors text-sm font-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-semibold mb-6 uppercase tracking-[0.2em] text-white/40">Услуги</h4>
            <ul className="space-y-3 mb-8">
              <li><Link href="/services" className="text-white/40 hover:text-accent transition-colors text-sm font-light">Дома из профилированного бруса</Link></li>
              <li><Link href="/services" className="text-white/40 hover:text-accent transition-colors text-sm font-light">Дома из рубленого бревна</Link></li>
              <li><Link href="/services" className="text-white/40 hover:text-accent transition-colors text-sm font-light">Каркасные дома</Link></li>
              <li><Link href="/services" className="text-white/40 hover:text-accent transition-colors text-sm font-light">Бани и сауны</Link></li>
              <li><Link href="/services" className="text-white/40 hover:text-accent transition-colors text-sm font-light">Проектирование</Link></li>
            </ul>
            <h4 className="text-xs font-semibold mb-4 uppercase tracking-[0.2em] text-white/40">Полезное</h4>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.to}>
                  <Link href={link.to} className="text-white/40 hover:text-accent transition-colors text-sm font-light">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xs font-semibold mb-6 uppercase tracking-[0.2em] text-white/40">Контакты</h4>
            <ul className="space-y-5">
              <li className="flex flex-col">
                <span className="text-white/25 text-xs uppercase tracking-widest mb-1">Телефон</span>
                <a href="tel:+73822334439" className="text-lg font-semibold hover:text-accent transition-colors tracking-tight">+7 (3822) 33-44-39</a>
              </li>
              <li className="flex flex-col">
                <span className="text-white/25 text-xs uppercase tracking-widest mb-1">Email</span>
                <a href="mailto:mail@kedr-tomsk.ru" className="text-white/50 hover:text-accent transition-colors text-sm">mail@kedr-tomsk.ru</a>
              </li>
              <li className="flex flex-col">
                <span className="text-white/25 text-xs uppercase tracking-widest mb-1">Офис</span>
                <span className="text-white/50 text-sm font-light">г. Томск, ул. Профсоюзная, 2/67 стр.3</span>
              </li>
              <li className="flex flex-col">
                <span className="text-white/25 text-xs uppercase tracking-widest mb-1">Режим работы</span>
                <span className="text-white/50 text-sm font-light">Пн–Пт: 9:00–19:00, Сб: 10:00–17:00</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Кедр-Томск. Все права защищены.</p>
          <div className="flex gap-8">
            <Link href="/privacy" className="hover:text-white/40 transition-colors">Политика конфиденциальности</Link>
            <Link href="/terms" className="hover:text-white/40 transition-colors">Пользовательское соглашение</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
