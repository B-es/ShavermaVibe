export interface Address {
  id: number
  address: string
  ent: string
  floor: string
  apt: string
  def: boolean
}

export interface OrderItem {
  id: number
  name: string
  qty: number
  size: string
  extras: string
  price: number
  subtotal: number
}

export interface Order {
  id: string
  date: string
  total: number
  status: 'new' | 'confirmed' | 'cooking' | 'ready' | 'courier' | 'completed' | 'cancelled'
  delivery: 'delivery' | 'pickup'
  address?: string
  items: OrderItem[]
}

export interface User {
  id: number
  name: string
  contact: string
  role: 'customer' | 'admin'
  addresses?: Address[]
}
