# Shawarma Restaurant - Nuxt 3 App

Современное веб-приложение для ресторана шаурмы, построенное на Nuxt 3 с использованием лучших практик и современных технологий.

## 🚀 Стек технологий

### Frontend
- **Nuxt 3** - Фреймворк (SSR / SSG / Hybrid)
- **Vue 3** - UI-библиотека
- **TypeScript (strict)** - Типизация
- **TailwindCSS** - Стилизация
- **Pinia** - Клиентское глобальное состояние
- **TanStack Query (Vue Query)** - Серверные данные, кэширование
- **VueUse** - Утилитарные composables
- **VueUse Motion** - Анимации
- **Zod** - Валидация данных и DTO
- **Lucide Vue** - Иконки
- **@nuxt/image** - Оптимизация изображений
- **@nuxt/fonts** - Подключение шрифтов

### Backend
- **Supabase** - База данных (PostgreSQL), Auth, Storage, Realtime
- **Nitro (server/api)** - REST API, серверная логика

## 🏗 Архитектура

### Рендеринг
Используются возможности Nuxt 3:
- **SSR** — страницы меню, карточки блюд
- **SSG** — страницы «О ресторане», «Контакты»
- **Hybrid Rendering** — через Route Rules
- **Server Components** — где не требуется интерактивность
- **Lazy Components** — тяжёлые блоки (галерея, отзывы)

## 📁 Структура проекта

```
shawarma-nuxt/
├── app.vue                 # Корневой компонент
├── nuxt.config.ts          # Конфигурация Nuxt
├── package.json            # Зависимости
├── tsconfig.json           # TypeScript конфигурация
├── tailwind.config.js      # TailwindCSS конфигурация
│
├── assets/
│   └── css/
│       └── tailwind.css    # Глобальные стили
│
├── components/
│   ├── CartButton.vue      # Кнопка корзины
│   ├── ProductCard.vue     # Карточка товара
│   └── ui/                 # UI компоненты (shadcn-vue style)
│
├── composables/
│   └── useQueries.ts       # TanStack Query хуки
│
├── layouts/
│   └── default.vue         # Дефолтный лейаут
│
├── lib/
│   ├── supabase.ts         # Supabase клиент
│   ├── utils.ts            # Утилиты (cn, clsx)
│   └── validators.ts       # Zod схемы валидации
│
├── pages/
│   ├── index.vue           # Главная страница
│   ├── menu/
│   │   └── [id].vue        # Страница товара
│   ├── about.vue           # О ресторане (SSG)
│   └── contacts.vue        # Контакты (SSG)
│
├── plugins/
│   ├── vue-query.ts        # TanStack Query плагин
│   └── vueuse-motion.ts    # VueUse Motion плагин
│
├── server/
│   └── api/
│       ├── products.ts     # API продуктов
│       └── orders.ts       # API заказов
│
├── stores/
│   └── cart.ts             # Pinia store корзины
│
└── types/
    └── product.ts          # TypeScript типы
```

## 🛠 Установка

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр продакшен сборки
npm run preview
```

## 🔧 Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```env
NUXT_PUBLIC_SUPABASE_URL=your_supabase_url
NUXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
```

## 📦 Основные возможности

- ✅ Модульная архитектура с четким разделением ответственности
- ✅ TypeScript strict mode для полной типобезопасности
- ✅ Pinia для управления состоянием корзины
- ✅ TanStack Query для кэширования серверных данных
- ✅ Hybrid rendering (SSR + SSG) через route rules
- ✅ Оптимизация изображений через @nuxt/image
- ✅ Автоматическая оптимизация шрифтов через @nuxt/fonts
- ✅ Валидация данных с Zod
- ✅ Современные UI компоненты с TailwindCSS

## 🎨 Дизайн-система

Проект использует дизайн-токены:
- **Цвета**: primary (#ff6b35), secondary (#2d3436), accent (#feca57)
- **Шрифты**: Inter (основной), Playfair Display (заголовки)
- **Компоненты**: Кнопки, карточки, формы с единым стилем

## 📄 Лицензия

MIT
