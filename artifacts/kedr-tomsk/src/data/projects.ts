export interface Project {
  slug: string;
  name: string;
  type: string;
  area: number;
  floors: number;
  beds: number;
  price: number;
  badge?: string;
  img: string;
}

export const projects: Project[] = [
  { slug: "kedroviy-8x10", name: "Кедровый 8×10", type: "brus", area: 120, floors: 1.5, beds: 4, price: 2450000, badge: "Хит", img: "woodhouse2" },
  { slug: "tayozhny-10x12", name: "Таёжный 10×12", type: "brus", area: 180, floors: 2, beds: 5, price: 3800000, badge: "Новинка", img: "woodhouse3" },
  { slug: "sibirskiy-6x8", name: "Сибирский 6×8", type: "brus", area: 90, floors: 1, beds: 3, price: 1650000, img: "woodhouse4" },
  { slug: "tomskiy-12x14", name: "Томский 12×14", type: "brus", area: 280, floors: 2, beds: 6, price: 5200000, badge: "Хит", img: "woodhouse5" },
  { slug: "russky-banya", name: "Баня «Русская»", type: "banya", area: 48, floors: 1, beds: 1, price: 850000, img: "sauna1" },
  { slug: "banya-premium", name: "Баня Премиум 6×8", type: "banya", area: 72, floors: 1.5, beds: 2, price: 1350000, img: "sauna2" },
  { slug: "kadrovy-100", name: "Каркасный 100", type: "karkasny", area: 100, floors: 1, beds: 3, price: 1200000, img: "frame1" },
  { slug: "kadrovy-150", name: "Каркасный Плюс 150", type: "karkasny", area: 150, floors: 2, beds: 4, price: 2100000, badge: "Новинка", img: "frame2" },
  { slug: "brvno-7x9", name: "Брёвенный 7×9", type: "brvno", area: 110, floors: 1.5, beds: 3, price: 1900000, img: "log2" },
  { slug: "usadba-15x15", name: "Усадьба 15×15", type: "brus", area: 380, floors: 2, beds: 7, price: 8500000, img: "woodhouse6" },
  { slug: "kompakty-5x7", name: "Компакт 5×7", type: "brus", area: 65, floors: 1, beds: 2, price: 980000, img: "woodhouse7" },
  { slug: "brvno-classic", name: "Бревенчатый Классик", type: "brvno", area: 140, floors: 2, beds: 4, price: 2800000, img: "log3" },
];
