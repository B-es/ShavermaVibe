export interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  isAvailable: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
}

export interface MenuCategory {
  id: number
  name: string
  slug: string
  description?: string
}

export interface Order {
  id: number
  items: CartItem[]
  total: number
  customerName: string
  customerPhone: string
  customerAddress: string
  status: 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'completed' | 'cancelled'
  createdAt: string
}

export type OrderStatus = Order['status']
