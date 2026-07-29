// Utilities from the original prototype

// Parse hash for routing
export function parseHash(): string {
  return window.location.hash || '#';
}

// Get item by ID
export function byId<T>(list: T[], id: number): T | undefined {
  return list.find((item) => (item as any).id === id);
}

// Format currency
export const fmt = (val: number) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(val);
};

// Pluralization helper (for "1 заказ", "2 заказа", "5 заказов")
export function plural(
  count: number,
  form1: string,
  form2: string,
  form5: string,
): string {
  const m = count % 10;
  const d = count % 100;
  if (d >= 11 && d <= 14) return form5;
  if (m === 1) return form1;
  if (m >= 2 && m <= 4) return form2;
  return form5;
}

// Calculate unit price based on size modifier
export const calcUnit = (
  product: Product,
  sizeLabel: string = 'Стандарт',
): number => {
  const sizeMod = sizeLabel !== 'Стандарт' ? 0.3 : 0;
  const basePrice = product.price * (1 + sizeMod);
  return basePrice;
};

// Badge labels
export const BADGE_LABELS = {
  hit: 'ХИТ',
  new: 'НОВИНКА',
  spicy: 'ОСТРОЕ',
  veg: 'ВЕГЕ',
};

// Order statuses
export const ORDER_STATUSES = [
  { id: 'new', label: 'Новый' },
  { id: 'confirmed', label: 'Подтверждён' },
  { id: 'cooking', label: 'Готовим' },
  { id: 'ready', label: 'Готово' },
  { id: 'courier', label: 'В пути' },
  { id: 'completed', label: 'Выполнен' },
  { id: 'cancelled', label: 'Отменён' },
];

// Free from allergens (empty for now)
export const FREE_FROM = [];

// Need Product type for calcUnit
import type { Product } from '~/types/product';
