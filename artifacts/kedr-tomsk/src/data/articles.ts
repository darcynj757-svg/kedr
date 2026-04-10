export interface Article {
  slug: string;
  title: string;
  date: string;
  img: string;
  excerpt: string;
  readTime: string;
  sourceUrl: string;
  tags: string[];
}

export const articles: Article[] = [
  {
    slug: "osobennosti-stroitelstva-domov",
    title: "Особенности строительства домов",
    date: "24.11.2017",
    img: "https://kedr-tomsk.ru/assets/cache/images/articles/2017/11/740x500-stroitelstva-domov-iz-dereva.9fe.jpg",
    excerpt:
      "У каждой страны свой менталитет, свои климатические особенности, свои традиции и свои предпочтения. Строительство деревянного дома — процесс довольно сложный, имеющий свои особенности и нюансы. Поэтому не лишним будет познакомиться с технологиями строительства домов за границей.",
    readTime: "5 мин",
    sourceUrl: "https://kedr-tomsk.ru/articles/osobennosti-stroitelstva-domov",
    tags: ["Строительство", "Технологии"],
  },
  {
    slug: "derevyannye-sruby",
    title: "Деревянные срубы",
    date: "24.11.2017",
    img: "https://kedr-tomsk.ru/assets/cache/images/articles/2017/11/740x500-derevyannye-sruby.9fe.jpg",
    excerpt:
      "Вот уже много веков дерево служит человеку одним из самых популярных и повсеместно используемых материалов для строительства. Его ценят за красоту, натуральность, экологичность, простоту в обработке и относительно невысокую стоимость.",
    readTime: "4 мин",
    sourceUrl: "https://kedr-tomsk.ru/articles/derevyannye-sruby",
    tags: ["Материалы", "Сруб"],
  },
  {
    slug: "profilirovannyj-i-kleenyj-brus",
    title: "Профилированный и клееный брус",
    date: "19.10.2017",
    img: "https://kedr-tomsk.ru/assets/cache/images/articles/2017/740x500-profilirovannyj-i-kleenyj-brus.9fe.jpg",
    excerpt:
      "Дерево уже на протяжении тысяч лет рассматривается как материал с уникальными характеристиками. Именно поэтому при строительстве домов предпочтение всегда отдавалось дереву. Из него возводят загородные дома, коттеджи, сауны, бани.",
    readTime: "5 мин",
    sourceUrl: "https://kedr-tomsk.ru/articles/profilirovannyj-i-kleenyj-brus",
    tags: ["Материалы", "Брус"],
  },
  {
    slug: "bolshie-brevna-v-stroitelstve",
    title: "Большие бревна в строительстве",
    date: "10.10.2017",
    img: "https://kedr-tomsk.ru/assets/cache/images/articles/2017/740x500-bolshie-brevna-v-stroitelstve-ohotnichih-domikov.9fe.jpg",
    excerpt:
      "Популярность деревянных домов не перестает возрастать. С каждым сезоном открываются новые туристические базы в горах, куда приглашают отдыхать людей. Естественность, красота деревянного домика, комфортность — главные достоинства.",
    readTime: "4 мин",
    sourceUrl: "https://kedr-tomsk.ru/articles/bolshie-brevna-v-stroitelstve",
    tags: ["Строительство", "Бревно"],
  },
  {
    slug: "finskaya-tehnologiya-stroitelstva-domov-karkasnogo-tipa",
    title: "Финская технология строительства домов каркасного типа",
    date: "14.09.2017",
    img: "https://kedr-tomsk.ru/assets/cache/images/articles/2017/09/740x500-finskaya-tehnologiya-stroitelstva-domov-karkasnogo-tipa.9fe.jpg",
    excerpt:
      "Начиная от обычных навесов и заканчивая избами, для строительства в северных широтах использовалось дерево — доступный, легко обрабатываемый материал со свойствами, обеспечивающими тепло и уют в доме.",
    readTime: "5 мин",
    sourceUrl:
      "https://kedr-tomsk.ru/articles/finskaya-tehnologiya-stroitelstva-domov-karkasnogo-tipa",
    tags: ["Технологии", "Каркас"],
  },
  {
    slug: "dekorirovanie-derevyannogo-doma",
    title: "Декорирование деревянного дома",
    date: "05.09.2017",
    img: "https://kedr-tomsk.ru/assets/cache/images/articles/2017/09/740x500-dekorirovanie-derevyannogo-doma.9fe.jpg",
    excerpt:
      "Выбирая предметы интерьера для дома из дерева, необходимо придерживаться определённых правил. Деревянный интерьер требует особого подхода — гармонии натуральных материалов, правильного освещения и текстильных акцентов.",
    readTime: "4 мин",
    sourceUrl: "https://kedr-tomsk.ru/articles/dekorirovanie-derevyannogo-doma",
    tags: ["Интерьер", "Дизайн"],
  },
  {
    slug: "derevyannyj-dom-vybiraem-material",
    title: "Деревянный дом: выбираем материал",
    date: "19.08.2017",
    img: "https://kedr-tomsk.ru/assets/cache/images/articles/2017/09/740x500-pilomaterialy.9fe.jpg",
    excerpt:
      "Нет более уютного жилища, чем дом из дерева. Его завораживающая красота впечатляет своей неповторимостью, а свежий аромат, излучаемый экологически чистым материалом, расслабляет и окунает в атмосферу отдыха и спокойствия.",
    readTime: "6 мин",
    sourceUrl: "https://kedr-tomsk.ru/articles/derevyannyj-dom-vybiraem-material",
    tags: ["Материалы", "Советы"],
  },
  {
    slug: "neobychnye-doma-iz-dereva",
    title: "Необычные дома из дерева",
    date: "10.08.2017",
    img: "https://kedr-tomsk.ru/assets/cache/images/articles/2017/09/740x500-zhilishhe-princa-barta-v-albukerke.9fe.jpg",
    excerpt:
      "Одних людей устраивают дома из дерева в спокойном и комфортном пригороде, другие проектируют единичные по своей архитектуре необыкновенные дома из дерева с необычайным креативным внешним видом.",
    readTime: "4 мин",
    sourceUrl: "https://kedr-tomsk.ru/articles/neobychnye-doma-iz-dereva",
    tags: ["Вдохновение", "Дизайн"],
  },
  {
    slug: "derevyannaya-besedka",
    title: "Деревянная беседка — красота и уют",
    date: "20.07.2017",
    img: "https://kedr-tomsk.ru/assets/cache/images/articles/2017/740x500-derevyannaya-besedka.9fe.jpg",
    excerpt:
      "Любой хозяйке хочется, чтобы ее двор был красивым и уютным. Одним из этапов на пути создания ландшафтного дизайна является установка и обустройство беседки. Она выполняет функции декоративного элемента и несёт в себе практичные качества.",
    readTime: "4 мин",
    sourceUrl: "https://kedr-tomsk.ru/articles/derevyannaya-besedka",
    tags: ["Беседки", "Ландшафт"],
  },
];
