import { computed } from "vue";
import { useOrderStore } from "~/stores/orders";

export function useSalesBadge() {
  const orderStore = useOrderStore();

  const hitProductNames = computed(() => new Set(orderStore.topProducts.map((p) => p.name)));

  const badgeFor = (product: { name: string; badge?: string }): string | undefined => {
    if (hitProductNames.value.has(product.name)) {
      if (product.badge === "new" || product.badge === "veg" || product.badge === "spicy") {
        return product.badge;
      }
      return "hit";
    }
    if (product.badge === "hit") return undefined;
    return product.badge || undefined;
  };

  return { badgeFor, topProducts: orderStore.topProducts };
}
