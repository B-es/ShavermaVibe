export interface Size {
  id: string;
  label: string;
  priceModifier: number;
  kcal?: number;
}

interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  emoji: string;
  bg: string;
  cat: string;
  sizes?: Size[];
  pop?: boolean;
  badge?: "hit" | "new" | "veg" | "spicy";
  kcal?: number;
  p?: number;
  f?: number;
  c?: number;
  allerg?: string[];
  available?: boolean;
}

const products: Product[] = [
  {
    id: 1,
    name: "Шаурма Классическая",
    desc: "Курица, огурцы, томаты, фирменный соус",
    price: 290,
    emoji: "🌯",
    bg: "#FFE5B4",
    cat: "shawarma",
    sizes: [
      { id: "small", label: "Маленькая", priceModifier: 0, kcal: 450 },
      { id: "medium", label: "Обычная", priceModifier: 0.3, kcal: 650 },
      { id: "large", label: "Большая", priceModifier: 0.7, kcal: 850 },
    ],
    pop: true,
    badge: "hit",
    allerg: ["gluten", "dairy"],
    available: true,
  },
  {
    id: 2,
    name: "Шаурма Сырная",
    desc: "Курица, сыр чеддер, огурцы, чесночный соус",
    price: 320,
    emoji: "🧀",
    bg: "#FFF8DC",
    cat: "shawarma",
    sizes: [
      { id: "small", label: "Маленькая", priceModifier: 0, kcal: 500 },
      { id: "medium", label: "Обычная", priceModifier: 0.3, kcal: 720 },
      { id: "large", label: "Большая", priceModifier: 0.7, kcal: 950 },
    ],
    pop: true,
    allerg: ["dairy", "gluten"],
    available: true,
  },
  {
    id: 3,
    name: "Шаурма Острая",
    desc: "Курица, халапеньо, острый соус, томаты",
    price: 310,
    emoji: "🌶️",
    bg: "#FFDAB9",
    cat: "shawarma",
    sizes: [
      { id: "small", label: "Маленькая", priceModifier: 0, kcal: 480 },
      { id: "medium", label: "Обычная", priceModifier: 0.3, kcal: 680 },
      { id: "large", label: "Большая", priceModifier: 0.7, kcal: 900 },
    ],
    pop: true,
    badge: "new",
    allerg: ["gluten"],
    available: true,
  },
  {
    id: 4,
    name: "Шаурма Вегетарианская",
    desc: "Фалафель, овощи, хумус, тахини",
    price: 280,
    emoji: "🥬",
    bg: "#E8F5E9",
    cat: "shawarma",
    sizes: [
      { id: "small", label: "Маленькая", priceModifier: 0, kcal: 400 },
      { id: "medium", label: "Обычная", priceModifier: 0.3, kcal: 580 },
      { id: "large", label: "Большая", priceModifier: 0.7, kcal: 780 },
    ],
    badge: "veg",
    allerg: ["gluten", "nuts"],
    available: true,
  },
  {
    id: 5,
    name: "Шаурма Цезарь",
    desc: "Курица, салат ромэн, пармезан, цезарь",
    price: 340,
    emoji: "🥗",
    bg: "#F1F8E9",
    cat: "shawarma",
    sizes: [
      { id: "small", label: "Маленькая", priceModifier: 0, kcal: 520 },
      { id: "medium", label: "Обычная", priceModifier: 0.3, kcal: 750 },
      { id: "large", label: "Большая", priceModifier: 0.7, kcal: 980 },
    ],
    allerg: ["dairy", "gluten"],
    available: true,
  },
  {
    id: 6,
    name: "Шаурма Грибная",
    desc: "Шампиньоны, сыр, огурцы, грибной соус",
    price: 300,
    emoji: "🍄",
    bg: "#EFEBE9",
    cat: "shawarma",
    sizes: [
      { id: "small", label: "Маленькая", priceModifier: 0, kcal: 460 },
      { id: "medium", label: "Обычная", priceModifier: 0.3, kcal: 660 },
      { id: "large", label: "Большая", priceModifier: 0.7, kcal: 870 },
    ],
    allerg: ["dairy", "gluten", "mushrooms"],
    available: true,
  },
  {
    id: 7,
    name: "Фета-донар",
    desc: "Свинина, огурцы, томаты, соус фета",
    price: 360,
    emoji: "🥙",
    bg: "#FFFACD",
    cat: "doner",
    sizes: [
      { id: "small", label: "Маленькая", priceModifier: 0, kcal: 700 },
      { id: "medium", label: "Обычная", priceModifier: 0.3, kcal: 1000 },
      { id: "large", label: "Большая", priceModifier: 0.7, kcal: 1300 },
    ],
    pop: true,
    badge: "new",
    allerg: ["dairy", "gluten"],
    available: true,
  },
  {
    id: 8,
    name: "Донар Классический",
    desc: "Свинина, курица, свежие овощи, соус тзатзики",
    price: 350,
    emoji: "🥙",
    bg: "#F0E68C",
    cat: "doner",
    sizes: [
      { id: "small", label: "Маленькая", priceModifier: 0, kcal: 650 },
      { id: "medium", label: "Обычная", priceModifier: 0.3, kcal: 950 },
      { id: "large", label: "Большая", priceModifier: 0.7, kcal: 1250 },
    ],
    pop: true,
    badge: "hit",
    allerg: ["dairy", "gluten"],
    available: true,
  },
  {
    id: 9,
    name: "Сок Яблочный",
    desc: "Свежевыжатый, без сахара",
    price: 120,
    emoji: "🧃",
    bg: "#F5F5DC",
    cat: "drinks",
    sizes: [
      { id: "0.3", label: "0.3л", priceModifier: 0, kcal: 135 },
      { id: "0.5", label: "0.5л", priceModifier: 0.5, kcal: 225 },
    ],
    allerg: ["none"],
    available: true,
  },
  {
    id: 10,
    name: "Кола",
    desc: "Холодный газированный напиток",
    price: 100,
    emoji: "🥤",
    bg: "#FFE4E1",
    cat: "drinks",
    sizes: [
      { id: "0.3", label: "0.3л", priceModifier: 0, kcal: 120 },
      { id: "0.5", label: "0.5л", priceModifier: 0.5, kcal: 200 },
    ],
    allerg: ["none"],
    available: true,
  },
  {
    id: 11,
    name: "Чай Лимонный",
    desc: "Холодный чай с лимоном",
    price: 110,
    emoji: "🍵",
    bg: "#F0FFF0",
    cat: "drinks",
    sizes: [
      { id: "0.3", label: "0.3л", priceModifier: 0, kcal: 50 },
      { id: "0.5", label: "0.5л", priceModifier: 0.5, kcal: 80 },
    ],
    allerg: ["none"],
    available: true,
  },
  {
    id: 12,
    name: "Картошка Фритюр",
    desc: "Хрустящие картофеля с соусом",
    price: 180,
    emoji: "🍟",
    bg: "#FAFAD2",
    cat: "sides",
    sizes: [
      { id: "small", label: "Маленькая", priceModifier: 0, kcal: 250 },
      { id: "large", label: "Большая", priceModifier: 0.6, kcal: 400 },
    ],
    pop: true,
    badge: "new",
    allerg: ["gluten"],
    available: true,
  },
  {
    id: 13,
    name: "Куриные Крылышки",
    desc: "Жареные крылышки со специями",
    price: 220,
    emoji: "🍗",
    bg: "#FFEFD5",
    cat: "sides",
    sizes: [
      { id: "6", label: "6шт", priceModifier: 0, kcal: 300 },
      { id: "10", label: "10шт", priceModifier: 0.5, kcal: 500 },
    ],
    badge: "new",
    allerg: ["gluten"],
    available: true,
  },
  {
    id: 14,
    name: "Салат Винегрет",
    desc: "Свежий сезонный салат",
    price: 190,
    emoji: "🥗",
    bg: "#F0FFF0",
    cat: "sides",
    sizes: [{ id: "normal", label: "Нормальный", priceModifier: 0, kcal: 180 }],
    allerg: ["none"],
    available: true,
  },
];

export const PRODUCTS = products;
