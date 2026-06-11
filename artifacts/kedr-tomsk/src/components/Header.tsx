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
      setIsScrolled(window.scrollY > 20);
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
            ? "bg-black/30 backdrop-blur-md shadow-lg py-2"
            : "bg-transparent py-4"
        }`}
        data-testid="header-nav"
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center group select-none">
            <span className="text-xl font-bold tracking-tight transition-transform duration-300 group-hover:scale-105 inline-flex items-baseline gap-0.5">
              <span className="text-white" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>Кедр</span>
              <span className="text-accent" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}>Tomsk</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-4">
            {navLinks.map((link) => {
              const isActive = location === link.to;
              return (
                <Link
                  key={link.label}
                  href={link.to}
                  className={`relative text-xs font-medium transition-colors whitespace-nowrap group ${
                    isActive ? "text-accent" : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-accent rounded-full transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+73822334439"
              className="text-xs font-bold whitespace-nowrap transition-colors duration-200 text-white hover:text-white/80"
            >
              +7 (3822) 33-44-39
            </a>
            <Button
              size="sm"
              variant="outline"
              className="border-border hover:bg-muted text-xs whitespace-nowrap transition-all duration-200 hover:scale-105"
              asChild
            >
              <Link href="/contacts">Заказать звонок</Link>
            </Button>
            <Button
              size="sm"
              className="btn-accent-gradient text-white text-xs whitespace-nowrap shimmer transition-all duration-200 hover:scale-105 hover:shadow-lg"
              asChild
            >
              <Link href="/calculator">Рассчитать стоимость</Link>
            </Button>
          </div>

          <button
            className="lg:hidden p-2 transition-transform duration-200 hover:scale-110 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-2xl border-t py-4 flex flex-col px-4 gap-4 animate-slide-up">
            {navLinks.map((link) => {
              const isActive = location === link.to;
              return (
                <Link
                  key={link.label}
                  href={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium py-2 border-b border-border/50 transition-colors ${
                    isActive ? "text-accent" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="flex flex-col gap-3 mt-2">
              <a href="tel:+73822334439" className="text-lg font-bold text-center py-2">
                +7 (3822) 33-44-39
              </a>
              <Button variant="outline" className="w-full" asChild onClick={() => setIsMobileMenuOpen(false)}>
                <Link href="/contacts">Заказать звонок</Link>
              </Button>
              <Button className="btn-accent-gradient text-white w-full" asChild onClick={() => setIsMobileMenuOpen(false)}>
                <Link href="/calculator">Рассчитать стоимость</Link>
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
