import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { TreePine, Menu, X } from "lucide-react";
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
            ? "glass shadow-lg py-2"
            : "bg-transparent py-4"
        }`}
        data-testid="header-nav"
        style={isScrolled ? {} : { background: "rgba(255,255,255,0.96)" }}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary group">
            <TreePine
              size={28}
              className="text-primary transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
            />
            <span className="text-xl font-bold tracking-tight whitespace-nowrap">Кедр-Томск</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-4">
            {navLinks.map((link) => {
              const isActive = location === link.to;
              return (
                <Link
                  key={link.label}
                  href={link.to}
                  className={`relative text-xs font-medium transition-colors whitespace-nowrap group ${
                    isActive ? "text-accent" : "text-foreground hover:text-accent"
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
              className="text-xs font-bold text-foreground hover:text-accent whitespace-nowrap transition-colors duration-200"
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
              className="bg-accent hover:bg-primary text-white text-xs whitespace-nowrap shimmer transition-all duration-200 hover:scale-105 hover:shadow-lg"
              asChild
            >
              <Link href="/contacts">Рассчитать стоимость</Link>
            </Button>
          </div>

          <button
            className="lg:hidden text-foreground p-2 transition-transform duration-200 hover:scale-110"
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
              <Button className="bg-accent hover:bg-primary text-white w-full" asChild onClick={() => setIsMobileMenuOpen(false)}>
                <Link href="/contacts">Рассчитать стоимость</Link>
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
