export interface Product {
  id: number
  name: string
  desc: string
  price: number
  emoji: string
  bg: string
  cat: string
  weight?: string
  badge?: 'hit' | 'new' | 'spicy' | 'veg'
  pop?: boolean
  comp?: string[]
  kcal?: number
  p?: number
  f?: number
  c?: number
  allerg?: string[]
  hasSize?: boolean
  available?: boolean
}

export interface CartItem extends Product {
  qty: number
  sizeLabel: string
  extrasLabel: string
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
  promo?: string
}

export interface MenuCategory {
  id: string
  label: string
}

export interface Order {
  id: string
  name: string
  phone: string
  total: number
  delivery: 'delivery' | 'pickup'
  status: 'new' | 'confirmed' | 'cooking' | 'ready' | 'courier' | 'completed' | 'cancelled'
  date: string
  items?: CartItem[]
}

export interface Review {
  id: number
  author: string
  rating: number
  text: string
  published: boolean
  color: string
  meta: string
}

export interface Address {
  id: number
  address: string
  ent: string
  floor: string
  apt: string
  def: boolean
}

export interface User {
  name: string
  contact: string
  role: 'customer' | 'admin'
}

export type OrderStatus = Order['status']
