
import { Link } from "wouter";
import { TreePine } from "lucide-react";
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
    <footer className="bg-primary text-white py-16" data-testid="footer">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Link href="/" className="flex items-center gap-2 text-white mb-6">
              <TreePine size={32} className="text-accent" />
              <span className="text-2xl font-bold tracking-tight">Кедр-Томск</span>
            </Link>
            <p className="text-white/70 mb-6 text-sm">
              Строительство деревянных домов под ключ в Томске и Томской области. Собственное производство, гарантия качества 5 лет.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <FaVk size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <FaTelegram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Навигация</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.to} className="text-white/70 hover:text-accent transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Услуги</h4>
            <ul className="space-y-3 mb-8">
              <li><Link href="/services" className="text-white/70 hover:text-accent transition-colors text-sm">Дома из профилированного бруса</Link></li>
              <li><Link href="/services" className="text-white/70 hover:text-accent transition-colors text-sm">Дома из рубленого бревна</Link></li>
              <li><Link href="/services" className="text-white/70 hover:text-accent transition-colors text-sm">Каркасные дома</Link></li>
              <li><Link href="/services" className="text-white/70 hover:text-accent transition-colors text-sm">Бани и сауны</Link></li>
              <li><Link href="/services" className="text-white/70 hover:text-accent transition-colors text-sm">Проектирование</Link></li>
            </ul>
            <h4 className="text-lg font-bold mb-4">Полезное</h4>
            <ul className="space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.to}>
                  <Link href={link.to} className="text-white/70 hover:text-accent transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Контакты</h4>
            <ul className="space-y-4">
              <li className="flex flex-col">
                <span className="text-white/50 text-xs mb-1">Телефон:</span>
                <a href="tel:+73822334439" className="text-lg font-bold hover:text-accent transition-colors">+7 (3822) 33-44-39</a>
              </li>
              <li className="flex flex-col">
                <span className="text-white/50 text-xs mb-1">Email:</span>
                <a href="mailto:mail@kedr-tomsk.ru" className="hover:text-accent transition-colors">mail@kedr-tomsk.ru</a>
              </li>
              <li className="flex flex-col">
                <span className="text-white/50 text-xs mb-1">Офис:</span>
                <span className="text-white/80 text-sm">г. Томск, ул. Профсоюзная, 2/67 стр.3</span>
              </li>
              <li className="flex flex-col">
                <span className="text-white/50 text-xs mb-1">Режим работы:</span>
                <span className="text-white/80 text-sm">Пн-Пт: 9:00–19:00, Сб: 10:00–17:00</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Кедр-Томск. Все права защищены.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Политика конфиденциальности</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Пользовательское соглашение</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
