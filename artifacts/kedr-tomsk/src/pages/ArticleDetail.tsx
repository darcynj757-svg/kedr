import { useEffect } from "react";
import { Link, useParams } from "wouter";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { articles } from "@/data/articles";
import { articleContent } from "@/data/articleContent";

function renderMarkdown(md: string) {
  const lines = md.split("\n");
  const elements: JSX.Element[] = [];
  let i = 0;
  let listItems: string[] = [];

  const flushList = (key: string) => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={key} className="list-disc pl-6 space-y-2 mb-5 text-foreground/90">
          {listItems.map((item, idx) => (
            <li key={idx} dangerouslySetInnerHTML={{ __html: formatInline(item) }} />
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  const formatInline = (text: string): string => {
    return text
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-accent underline hover:text-primary transition-colors">$1</a>');
  };

  while (i < lines.length) {
    const line = lines[i];

    // Empty line
    if (line.trim() === "") {
      flushList(`list-${i}`);
      i++;
      continue;
    }

    // Image
    const imgMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch && imgMatch[2] && !imgMatch[2].includes("Base64")) {
      flushList(`list-${i}`);
      elements.push(
        <figure key={i} className="my-8 rounded-2xl overflow-hidden shadow-lg">
          <img
            src={imgMatch[2]}
            alt={imgMatch[1]}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
          {imgMatch[1] && (
            <figcaption className="text-center text-sm text-muted-foreground py-2 px-4 bg-muted">
              {imgMatch[1]}
            </figcaption>
          )}
        </figure>
      );
      i++;
      continue;
    }

    // Skip broken images
    if (line.match(/^!?\[.*Base64.*\]/) || line.match(/^!\[\]\(http:\/\/stroyfirm/)) {
      i++;
      continue;
    }

    // H2
    if (line.startsWith("## ")) {
      flushList(`list-${i}`);
      elements.push(
        <h2 key={i} className="text-2xl md:text-3xl font-bold text-primary mt-10 mb-4 pb-2 border-b border-border">
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith("### ")) {
      flushList(`list-${i}`);
      elements.push(
        <h3 key={i} className="text-xl font-bold text-primary mt-8 mb-3">
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // H4 / ####
    if (line.startsWith("#### ")) {
      flushList(`list-${i}`);
      const text = line.slice(5);
      // Skip call-to-action lines
      if (text.includes("Заказать") || text.includes("Узнали")) {
        i++;
        continue;
      }
      elements.push(
        <h4 key={i} className="text-lg font-semibold text-foreground mt-6 mb-2">
          {text}
        </h4>
      );
      i++;
      continue;
    }

    // List item
    if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
      i++;
      continue;
    }

    // Regular paragraph
    flushList(`list-${i}`);
    if (line.trim()) {
      elements.push(
        <p
          key={i}
          className="text-foreground/90 leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: formatInline(line) }}
        />
      );
    }
    i++;
  }

  flushList("final-list");
  return elements;
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const article = articles.find((a) => a.slug === slug);
  const content = articleContent[slug ?? ""];

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary mb-4">Статья не найдена</h1>
          <Link href="/articles" className="text-accent hover:underline">
            Вернуться к статьям
          </Link>
        </div>
      </div>
    );
  }

  const currentIdx = articles.findIndex((a) => a.slug === slug);
  const prev = articles[currentIdx - 1];
  const next = articles[currentIdx + 1];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero image */}
      <div className="relative h-72 md:h-96 overflow-hidden">
        <img
          src={article.img}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="text-sm mb-3 text-white/70">
              <Link href="/" className="hover:text-accent transition-colors">Главная</Link>
              {" / "}
              <Link href="/articles" className="hover:text-accent transition-colors">Статьи</Link>
              {" / "}
              <span className="text-white/50 truncate">{article.title}</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white leading-tight max-w-3xl">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-10">
        <div className="max-w-3xl mx-auto">
          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-border">
            <Link
              href="/articles"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              <ArrowLeft size={16} />
              Все статьи
            </Link>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar size={14} />
              {article.date}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Clock size={14} />
              {article.readTime} чтения
            </div>
            <div className="flex gap-1.5 ml-auto">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full bg-accent/10 text-accent font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Article content */}
          <article className="article-content">
            {content ? (
              renderMarkdown(content)
            ) : (
              <p className="text-muted-foreground">{article.excerpt}</p>
            )}
          </article>

          {/* CTA */}
          <div className="mt-12 p-8 bg-primary rounded-2xl text-white text-center">
            <h3 className="text-xl font-bold mb-2">Готовы начать строительство?</h3>
            <p className="text-white/80 mb-5 text-sm">
              Получите бесплатную консультацию и расчёт стоимости вашего дома
            </p>
            <Link
              href="/contacts"
              className="inline-block bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-2.5 rounded-xl transition-all hover:scale-105"
            >
              Связаться с нами
            </Link>
          </div>

          {/* Prev / Next navigation */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
            {prev && (
              <Link
                href={`/articles/${prev.slug}`}
                className="group flex items-start gap-3 p-4 rounded-xl border border-border hover:border-accent/40 hover:bg-accent/5 transition-all"
              >
                <ArrowLeft size={20} className="mt-0.5 text-muted-foreground group-hover:text-accent shrink-0" />
                <div>
                  <div className="text-xs text-muted-foreground mb-1">Предыдущая</div>
                  <div className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                    {prev.title}
                  </div>
                </div>
              </Link>
            )}
            {next && (
              <Link
                href={`/articles/${next.slug}`}
                className="group flex items-start gap-3 p-4 rounded-xl border border-border hover:border-accent/40 hover:bg-accent/5 transition-all text-right ml-auto w-full"
              >
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground mb-1">Следующая</div>
                  <div className="text-sm font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                    {next.title}
                  </div>
                </div>
                <ArrowLeft size={20} className="mt-0.5 text-muted-foreground group-hover:text-accent shrink-0 rotate-180" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
