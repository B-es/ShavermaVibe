export interface Product {
  id: number;
  name: string;
  desc: string;
  price: number;
  emoji: string;
  bg: string;
  cat: string;
  image?: string;
  published?: boolean;
  sizes?: {
    id: string;
    label: string;
    priceModifier: number;
    kcal?: number;
  }[];
  kcal?: number;
  p?: number;
  f?: number;
  c?: number;
  allerg?: string[];
  pop?: boolean;
  badge?: "hit" | "new" | "veg" | "spicy";
  available?: boolean;
}

export interface Category {
  id: string;
  label: string;
}

export interface CartItem extends Product {
  qty: number;
  sizeLabel: string;
  size?: {
    id: string;
    label: string;
    priceModifier: number;
  };
  subtotal: number;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export interface MenuCategory {
  id: string;
  label: string;
}

export interface Order {
  id: string;
  name: string;
  phone: string;
  total: number;
  delivery: "delivery" | "pickup";
  status:
    | "new"
    | "confirmed"
    | "cooking"
    | "ready"
    | "courier"
    | "completed"
    | "cancelled";
  date: string;
  items?: CartItem[];
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  published: boolean;
  color: string;
  meta: string;
}

export interface Address {
  id: number;
  address: string;
  ent: string;
  floor: string;
  apt: string;
  def: boolean;
}

export interface User {
  name: string;
  contact: string;
  role: "customer" | "admin";
}

export type OrderStatus = Order["status"];
