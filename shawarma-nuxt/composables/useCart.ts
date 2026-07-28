import { ref, computed } from 'vue'

export interface Product {
  id: number
  name: string
  desc: string
  price: number
  emoji: string
  bg: string
  pop?: boolean
  badge?: 'hit' | 'new' | 'veg'
}

export const BADGE_LABELS: Record<string, string> = {
  hit: 'ХИТ',
  new: 'НОВИНКА',
  veg: 'ВЕГЕ',
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Шаурма Классическая',
    desc: 'Курица, огурцы, томаты, фирменный соус',
    price: 290,
    emoji: '🌯',
    bg: '#FFE5B4',
    pop: true,
    badge: 'hit',
  },
  {
    id: 2,
    name: 'Шаурма Сырная',
    desc: 'Курица, сыр чеддер, огурцы, чесночный соус',
    price: 320,
    emoji: '🧀',
    bg: '#FFF8DC',
    pop: true,
  },
  {
    id: 3,
    name: 'Шаурма Острая',
    desc: 'Курица, халапеньо, острый соус, томаты',
    price: 310,
    emoji: '🌶️',
    bg: '#FFDAB9',
    pop: true,
    badge: 'new',
  },
  {
    id: 4,
    name: 'Шаурма Вегетарианская',
    desc: 'Фалафель, овощи, хумус, тахини',
    price: 280,
    emoji: '🥬',
    bg: '#E8F5E9',
    badge: 'veg',
  },
  {
    id: 5,
    name: 'Шаурма Цезарь',
    desc: 'Курица, салат ромэн, пармезан, цезарь',
    price: 340,
    emoji: '🥗',
    bg: '#F1F8E9',
  },
  {
    id: 6,
    name: 'Шаурма Грибная',
    desc: 'Шампиньоны, сыр, огурцы, грибной соус',
    price: 300,
    emoji: '🍄',
    bg: '#EFEBE9',
  },
]

export const fmt = (val: number) => {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(val)
}

export interface CartItem extends Product {
  qty: number
  sizeLabel: string
  extrasLabel: string
}

export const useCart = () => {
  const cart = ref<CartItem[]>([])
  const subtotal = computed(() => cart.value.reduce((sum, item) => sum + item.price * item.qty, 0))
  const discount = computed(() => (subtotal.value > 1500 ? subtotal.value * 0.1 : 0))
  const delivery = computed(() => (subtotal.value >= 1000 ? 0 : 150))
  const total = computed(() => subtotal.value - discount.value + delivery.value)
  const count = computed(() => cart.value.reduce((sum, item) => sum + item.qty, 0))

  const addToCart = (product: Product, sizeLabel = 'Стандарт', extrasLabel = '') => {
    const existing = cart.value.find(item => item.id === product.id && item.sizeLabel === sizeLabel && item.extrasLabel === extrasLabel)
    if (existing) {
      existing.qty++
    } else {
      cart.value.push({ ...product, qty: 1, sizeLabel, extrasLabel })
    }
  }

  const removeFromCart = (index: number) => {
    cart.value.splice(index, 1)
  }

  const clearCart = () => {
    cart.value = []
  }

  return {
    cart,
    subtotal,
    discount,
    delivery,
    total,
    count,
    addToCart,
    removeFromCart,
    clearCart,
  }
}
