export interface Project {
  slug: string;
  name: string;
  type: string;
  area: number;
  floors: number;
  beds: number;
  price: number;
  priceFrom?: number;
  badge?: string;
  img: string;
  floorArea?: { floor1: number; floor2?: number };
}

export const projects: Project[] = [
  {
    slug: "d68",
    name: "Проект Д68",
    type: "brus",
    area: 68,
    floors: 1,
    beds: 2,
    price: 1088000,
    priceFrom: 748000,
    img: "/images/projects/d68.jpg",
  },
  {
    slug: "d89",
    name: "Проект Д89",
    type: "brus",
    area: 89,
    floors: 1,
    beds: 3,
    price: 1424000,
    priceFrom: 979000,
    img: "/images/projects/d89.jpg",
  },
  {
    slug: "d123",
    name: "Проект Д123",
    type: "brus",
    area: 123,
    floors: 2,
    beds: 4,
    price: 1968000,
    priceFrom: 1353000,
    img: "/images/projects/d123.jpg",
  },
  {
    slug: "d126",
    name: "Проект Д126",
    type: "brus",
    area: 126,
    floors: 2,
    beds: 4,
    price: 2016000,
    priceFrom: 1386000,
    badge: "Популярный",
    img: "/images/projects/d126.jpg",
  },
  {
    slug: "d134",
    name: "Проект Д134",
    type: "brvno",
    area: 134,
    floors: 2,
    beds: 4,
    price: 2144000,
    priceFrom: 1474000,
    img: "/images/projects/d134.jpg",
  },
  {
    slug: "d159",
    name: "Проект Д159",
    type: "brus",
    area: 159,
    floors: 2,
    beds: 5,
    price: 2544000,
    priceFrom: 1749000,
    img: "/images/projects/d159.jpg",
  },
  {
    slug: "d217",
    name: "Проект Д217",
    type: "brus",
    area: 217,
    floors: 2,
    beds: 5,
    price: 3472000,
    priceFrom: 2387000,
    badge: "Хит",
    img: "/images/projects/d217.jpg",
  },
  {
    slug: "d236",
    name: "Проект Д236",
    type: "brvno",
    area: 236,
    floors: 2,
    beds: 6,
    price: 3776000,
    priceFrom: 2596000,
    floorArea: { floor1: 118, floor2: 118 },
    img: "/images/projects/d236.jpg",
  },
];
