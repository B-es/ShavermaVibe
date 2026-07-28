--- shawarma-nuxt/composables/useAdmin.ts (原始)


+++ shawarma-nuxt/composables/useAdmin.ts (修改后)
import { ref, computed } from 'vue'
import type { Product, Order, Review } from '~/types/product'

export const ORDER_STATUSES = [
  { id: 'new', label: 'Новый' },
  { id: 'confirmed', label: 'Подтверждён' },
  { id: 'cooking', label: 'Готовится' },
  { id: 'ready', label: 'Готов' },
  { id: 'courier', label: 'Курьер едет' },
  { id: 'completed', label: 'Завершён' },
  { id: 'cancelled', label: 'Отменён' },
]

const DEMO_PRODUCTS: Product[] = [
  { id: 1, name: 'Шаурма Классическая', desc: 'Курица, огурцы, томаты, фирменный соус', price: 290, emoji: '🌯', bg: '#FFE5B4', cat: 'shawarma', weight: '350г', badge: 'hit', pop: true, available: true },
  { id: 2, name: 'Шаурма Сырная', desc: 'Курица, сыр чеддер, огурцы, чесночный соус', price: 320, emoji: '🧀', bg: '#FFF8DC', cat: 'shawarma', weight: '380г', available: true },
  { id: 3, name: 'Шаурма Острая', desc: 'Курица, халапеньо, острый соус, томаты', price: 310, emoji: '🌶️', bg: '#FFDAB9', cat: 'shawarma', weight: '360г', badge: 'spicy', available: true },
  { id: 4, name: 'Донер Классический', desc: 'Телятина, овощи, соус на выбор', price: 350, emoji: '🥙', bg: '#FFE4C4', cat: 'doner', weight: '400г', pop: true, available: true },
  { id: 5, name: 'Комбо №1', desc: 'Шаурма + картофель фри + напиток', price: 490, emoji: '🍱', bg: '#FFFACD', cat: 'combo', weight: '650г', badge: 'hit', available: true },
]

const DEMO_ADMIN_ORDERS: Order[] = [
  { id: '10234', name: 'Иван Петров', phone: '+7 (999) 111-22-33', total: 890, delivery: 'delivery', status: 'completed', date: '12.12.2024' },
  { id: '10235', name: 'Мария Сидорова', phone: '+7 (999) 444-55-66', total: 1250, delivery: 'pickup', status: 'ready', date: '13.12.2024' },
  { id: '10236', name: 'Алексей Козлов', phone: '+7 (999) 777-88-99', total: 670, delivery: 'delivery', status: 'cooking', date: '14.12.2024' },
  { id: '10237', name: 'Елена Морозова', phone: '+7 (999) 000-11-22', total: 1580, delivery: 'delivery', status: 'confirmed', date: '14.12.2024' },
  { id: '10238', name: 'Дмитрий Волков', phone: '+7 (999) 333-44-55', total: 420, delivery: 'pickup', status: 'new', date: '14.12.2024' },
]

const DEMO_ADMIN_REVIEWS: Review[] = [
  { id: 1, author: 'Алексей', rating: 5, text: 'Лучшая шаурма в городе! Готовят быстро, всегда свежее.', published: true, color: '#FFD9D9', meta: '2 дня назад' },
  { id: 2, author: 'Марина', rating: 5, text: 'Заказываю доставку уже третий раз — всё отлично!', published: true, color: '#FFF3C4', meta: 'Неделю назад' },
  { id: 3, author: 'Денис', rating: 4, text: 'Вкусно, сытно, недорого. Классическая шаурма — топ!', published: false, color: '#E8E0D5', meta: '2 недели назад' },
  { id: 4, author: 'Ольга', rating: 5, text: 'Соусы просто бомба! Рекомендую острую шаурму.', published: true, color: '#D4EDDA', meta: '3 недели назад' },
]

export const useAdmin = () => {
  const products = ref<Product[]>([...DEMO_PRODUCTS])
  const adminOrders = ref<Order[]>([...DEMO_ADMIN_ORDERS])
  const adminReviews = ref<Review[]>([...DEMO_ADMIN_REVIEWS])
  const adminTab = ref<'products' | 'orders' | 'reviews'>('products')

  const np = reactive({ emoji: '🌯', name: '', cat: 'shawarma', price: 0 })

  const adminKpi = computed(() => {
    const revenue = adminOrders.value.reduce((sum, o) => sum + o.total, 0)
    const count = adminOrders.value.length
    const avg = count > 0 ? revenue / count : 0
    const active = adminOrders.value.filter(o => ['new', 'confirmed', 'cooking', 'ready', 'courier'].includes(o.status)).length
    return { revenue, count, avg, active }
  })

  const cats = [
    { id: 'all', label: 'Все' },
    { id: 'shawarma', label: 'Шаурма' },
    { id: 'doner', label: 'Донер' },
    { id: 'combo', label: 'Комбо' },
    { id: 'drinks', label: 'Напитки' },
  ]

  const catLabel = (id: string) => {
    const cat = cats.find(c => c.id === id)
    return cat?.label || id
  }

  const addProduct = () => {
    if (np.name.trim() && np.price > 0) {
      products.value.push({
        id: Date.now(),
        emoji: np.emoji || '🌯',
        name: np.name,
        desc: 'Новый товар',
        price: np.price,
        bg: '#FFFFFF',
        cat: np.cat,
        weight: '350г',
        available: true,
      })
      np.name = ''
      np.price = 0
    }
  }

  const removeProduct = (id: number) => {
    products.value = products.value.filter(p => p.id !== id)
  }

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    const order = adminOrders.value.find(o => o.id === orderId)
    if (order) {
      order.status = status
    }
  }

  const removeReview = (id: number) => {
    adminReviews.value = adminReviews.value.filter(r => r.id !== id)
  }

  const toggleReviewPublished = (id: number) => {
    const review = adminReviews.value.find(r => r.id === id)
    if (review) {
      review.published = !review.published
    }
  }

  return {
    products,
    adminOrders,
    adminReviews,
    adminTab,
    np,
    adminKpi,
    cats,
    catLabel,
    addProduct,
    removeProduct,
    updateOrderStatus,
    removeReview,
    toggleReviewPublished,
  }
}
