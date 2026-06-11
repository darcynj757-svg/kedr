import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Главная", to: "/" },
    { label: "Проекты", to: "/projects" },
    { label: "Галерея", to: "/gallery" },
    { label: "Услуги", to: "/services" },
    { label: "Этапы", to: "/stages" },
    { label: "О компании", to: "/about" },
    { label: "Производство", to: "/production" },
    { label: "Статьи", to: "/articles" },
    { label: "Контакты", to: "/contacts" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl border-b border-border shadow-sm py-3"
            : "liquid-glass border-b border-white/10 py-5"
        }`}
        data-testid="header-nav"
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center group">
            <img
              src="/logo.png"
              alt="Кедр-Томск"
              className="h-12 w-auto object-contain transition-opacity duration-300 group-hover:opacity-75"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = location === link.to;
              return (
                <Link
                  key={link.label}
                  href={link.to}
                  className={`relative text-[11px] font-medium transition-colors whitespace-nowrap uppercase tracking-widest ${
                    isActive
                      ? "text-primary"
                      : isScrolled
                      ? "text-foreground/55 hover:text-foreground"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-accent" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+73822334439"
              className={`text-[11px] font-semibold whitespace-nowrap transition-colors duration-200 tracking-widest uppercase ${
                isScrolled ? "text-foreground/60 hover:text-foreground" : "text-white/60 hover:text-white"
              }`}
            >
              +7 (3822) 33-44-39
            </a>
            <Button
              size="sm"
              variant="outline"
              className={`text-[11px] whitespace-nowrap rounded-sm tracking-widest uppercase px-5 transition-all duration-300 ${
                isScrolled
                  ? "border-border text-foreground/60 hover:text-foreground hover:border-foreground/40"
                  : "border-white/20 text-white/60 hover:bg-white/8 hover:text-white bg-transparent"
              }`}
              asChild
            >
              <Link href="/contacts">Заказать звонок</Link>
            </Button>
            <Button
              size="sm"
              className="btn-accent-gradient text-black text-[11px] whitespace-nowrap rounded-sm tracking-widest uppercase px-5 transition-all duration-300 hover:opacity-90"
              asChild
            >
              <Link href="/calculator">Рассчитать</Link>
            </Button>
          </div>

          <button
            className={`lg:hidden p-2 transition-colors ${isScrolled ? "text-foreground/60 hover:text-foreground" : "text-white/60 hover:text-white"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/97 backdrop-blur-xl border-t border-border py-6 flex flex-col px-6 gap-0 shadow-lg">
            {navLinks.map((link) => {
              const isActive = location === link.to;
              return (
                <Link
                  key={link.label}
                  href={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-sm font-medium py-4 border-b border-border transition-colors uppercase tracking-widest ${
                    isActive ? "text-primary" : "text-foreground/50 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="flex flex-col gap-3 mt-6">
              <a href="tel:+73822334439" className="text-base font-semibold text-center py-2 text-foreground tracking-wider">
                +7 (3822) 33-44-39
              </a>
              <Button variant="outline" className="w-full border-border text-foreground/60 hover:text-foreground rounded-sm tracking-widest uppercase text-xs" asChild onClick={() => setIsMobileMenuOpen(false)}>
                <Link href="/contacts">Заказать звонок</Link>
              </Button>
              <Button className="btn-accent-gradient text-black w-full rounded-sm tracking-widest uppercase text-xs font-semibold" asChild onClick={() => setIsMobileMenuOpen(false)}>
                <Link href="/calculator">Рассчитать стоимость</Link>
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
