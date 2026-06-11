import { Link } from "wouter";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb: string;
  image?: string;
  tag?: string;
}

export default function PageHero({ title, subtitle, breadcrumb, image = "/images/hero/hero-1.jpg", tag }: PageHeroProps) {
  return (
    <section className="relative h-[52vh] min-h-[380px] max-h-[560px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      <div className="relative h-full flex flex-col justify-end container mx-auto px-6 md:px-12 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="text-sm mb-5 text-white/50 flex items-center gap-2">
            <Link href="/" className="hover:text-white/90 transition-colors">Главная</Link>
            <span>/</span>
            <span className="text-white/70">{breadcrumb}</span>
          </div>

          {tag && (
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-accent" />
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">{tag}</span>
            </div>
          )}

          <h1 className="font-light text-4xl md:text-6xl text-white leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {title}
          </h1>

          {subtitle && (
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed font-light">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
