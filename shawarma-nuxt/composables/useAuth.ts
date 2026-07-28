--- shawarma-nuxt/composables/useAuth.ts (原始)


+++ shawarma-nuxt/composables/useAuth.ts (修改后)
import { ref, computed } from 'vue'
import type { User, Order, Review, Address } from '~/types/product'

export interface AuthForm {
  name: string
  contact: string
  pass: string
}

export interface ProfileForm {
  name: string
  contact: string
}

export interface AddrForm {
  address: string
  ent: string
  floor: string
  apt: string
}

const DEMO_USERS: Record<string, User> = {
  guest: { name: 'Гость', contact: 'guest@example.com', role: 'customer' },
  admin: { name: 'Администратор', contact: 'admin@shawarma.ru', role: 'admin' },
}

const DEMO_ORDERS: Order[] = [
  { id: '10234', name: 'Гость', phone: '+7 (999) 123-45-67', total: 890, delivery: 'delivery', status: 'completed', date: '12.12.2024' },
  { id: '10235', name: 'Гость', phone: '+7 (999) 123-45-67', total: 1250, delivery: 'pickup', status: 'ready', date: '13.12.2024' },
  { id: '10236', name: 'Гость', phone: '+7 (999) 123-45-67', total: 670, delivery: 'delivery', status: 'cooking', date: '14.12.2024' },
]

const DEMO_REVIEWS: Review[] = [
  { id: 1, author: 'Алексей', rating: 5, text: 'Лучшая шаурма в городе! Готовят быстро, всегда свежее.', published: true, color: '#FFD9D9', meta: '2 дня назад' },
  { id: 2, author: 'Марина', rating: 5, text: 'Заказываю доставку уже третий раз — всё отлично!', published: true, color: '#FFF3C4', meta: 'Неделю назад' },
  { id: 3, author: 'Денис', rating: 4, text: 'Вкусно, сытно, недорого. Классическая шаурма — топ!', published: false, color: '#E8E0D5', meta: '2 недели назад' },
  { id: 4, author: 'Ольга', rating: 5, text: 'Соусы просто бомба! Рекомендую острую шаурму.', published: true, color: '#D4EDDA', meta: '3 недели назад' },
]

const DEMO_ADDRESSES: Address[] = [
  { id: 1, address: 'ул. Пушкина, д. 10', ent: '3', floor: '5', apt: '42', def: true },
  { id: 2, address: 'пр. Ленина, д. 25', ent: '1', floor: '2', apt: '18', def: false },
]

export const useAuth = () => {
  const user = ref<User | null>(null)
  const authForm = reactive<AuthForm>({ name: '', contact: '', pass: '' })
  const profileForm = reactive<ProfileForm>({ name: '', contact: '' })
  const addrForm = reactive<AddrForm>({ address: '', ent: '', floor: '', apt: '' })

  const addresses = ref<Address[]>([...DEMO_ADDRESSES])
  const reviews = ref<Review[]>([...DEMO_REVIEWS])
  const orders = ref<Order[]>([...DEMO_ORDERS])

  const isLoggedIn = computed(() => user.value !== null)
  const isAdmin = computed(() => user.value?.role === 'admin')

  const myOrders = computed(() => {
    if (!user.value) return []
    return orders.value.filter(o => o.name === user.value?.name || o.phone === user.value?.contact)
  })

  const login = (role: 'customer' | 'admin') => {
    user.value = role === 'admin' ? DEMO_USERS.admin : DEMO_USERS.guest
    if (user.value) {
      profileForm.name = user.value.name
      profileForm.contact = user.value.contact
    }
  }

  const logout = () => {
    user.value = null
    authForm.name = ''
    authForm.contact = ''
    authForm.pass = ''
  }

  const saveProfile = () => {
    if (user.value) {
      user.value.name = profileForm.name
      user.value.contact = profileForm.contact
    }
  }

  const addAddress = () => {
    if (addrForm.address.trim()) {
      addresses.value.push({
        id: Date.now(),
        address: addrForm.address,
        ent: addrForm.ent || '1',
        floor: addrForm.floor || '1',
        apt: addrForm.apt || '',
        def: addresses.value.length === 0,
      })
      addrForm.address = ''
      addrForm.ent = ''
      addrForm.floor = ''
      addrForm.apt = ''
    }
  }

  const removeAddress = (id: number) => {
    addresses.value = addresses.value.filter(a => a.id !== id)
  }

  const setDefaultAddress = (id: number) => {
    addresses.value.forEach(a => {
      a.def = a.id === id
    })
  }

  const removeReview = (id: number) => {
    reviews.value = reviews.value.filter(r => r.id !== id)
  }

  const toggleReviewPublished = (id: number) => {
    const review = reviews.value.find(r => r.id === id)
    if (review) {
      review.published = !review.published
    }
  }

  return {
    user,
    authForm,
    profileForm,
    addrForm,
    addresses,
    reviews,
    orders,
    isLoggedIn,
    isAdmin,
    myOrders,
    login,
    logout,
    saveProfile,
    addAddress,
    removeAddress,
    setDefaultAddress,
    removeReview,
    toggleReviewPublished,
  }
}
