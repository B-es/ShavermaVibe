<template>
    <div class="menu-page">
        <template v-if="!route.params.id">
            <section class="menu">
                <div class="wrap">
                    <div class="sec-head">
                        <h2>Наше <em>меню</em></h2>
                        <p>{{ filteredProducts.length }} позиций · всё готовится при тебе</p>
                    </div>
                    <div class="menu__bar">
                        <div class="search">
                            <input v-model="curSearch" type="text" placeholder="Найти шаурму, донер, комбо…" />
                        </div>
                        <div class="tabs">
                            <button v-for="c in cats" :key="c.id" class="tab" :class="{ active: curCat === c.id }" @click="curCat = c.id">
                                {{ c.label }}
                            </button>
                        </div>
                    </div>
                    <div class="filters">
                        <span class="fl-label">Фильтры:</span>
                        <div class="price-in">
                            <input v-model.number="fPriceMin" type="number" placeholder="от ₽" min="0" />
                            <span style="color: rgba(34,34,34,0.4)">—</span>
                            <input v-model.number="fPriceMax" type="number" placeholder="до ₽" min="0" />
                        </div>
                        <label class="check" :class="{ on: fPopular }">
                            <input type="checkbox" v-model="fPopular" />🔥 Популярное
                        </label>
                        <label class="check" :class="{ on: fNew }">
                            <input type="checkbox" v-model="fNew" />✨ Новинки
                        </label>
                        <label class="check" :class="{ on: fSpicy }">
                            <input type="checkbox" v-model="fSpicy" />🌶 Острое
                        </label>
                        <label class="check" :class="{ on: fVeg }">
                            <input type="checkbox" v-model="fVeg" />🥗 Вегетарианское
                        </label>
                        <select class="sel" v-model="sortBy" style="margin-left: auto">
                            <option value="default">Сортировка</option>
                            <option value="priceAsc">Сначала дешевле</option>
                            <option value="priceDesc">Сначала дороже</option>
                            <option value="popular">Сначала популярные</option>
                        </select>
                    </div>
                    <div
                        class="grid"
                        :key="curCat + curSearch + JSON.stringify([fPriceMin, fPriceMax, fPopular, fNew, fSpicy, fVeg, sortBy])"
                    >
                        <article
                            v-for="(p, i) in filteredProducts"
                            :key="p.id"
                            class="card"
                            :style="{ animationDelay: i * 35 + 'ms' }"
                        >
                            <div class="card__img" :style="{ background: p.bg }" @click="navigateTo('/menu/' + p.id)">
                                <span v-if="productBadge(p)" class="card__badge" :class="'b-' + productBadge(p)">{{ badgeLabel(productBadge(p)) }}</span>
                                <span>{{ p.emoji }}</span>
                            </div>
                            <div class="card__body">
                                <div class="card__top">
                                    <h3 class="card__name" @click="navigateTo('/menu/' + p.id)">{{ p.name }}</h3>
                                    <span class="card__weight">{{ p.weight }}</span>
                                </div>
                                <p class="card__desc">{{ p.desc }}</p>
                                <div class="card__foot">
                                    <div class="card__price">{{ p.price }} <small>₽</small></div>
                                    <button class="add" @click="quickAdd(p.id, $event)">+</button>
                                </div>
                            </div>
                        </article>
                        <div v-if="!filteredProducts.length" class="empty">
                            <b>🤷‍♂️</b>Ничего не нашлось. Попробуй сбросить фильтры.
                        </div>
                    </div>
                </div>
            </section>
        </template>
        <NuxtPage v-else />
    </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useProductStore } from "~/stores/products";
import { useCartStore } from "~/stores/cart";
import { useAuthStore } from "~/stores/auth";
import { useRoute } from "vue-router";
import { useSalesBadge } from "~/composables/useSalesBadge";


const productStore = useProductStore();
const cartStore = useCartStore();
const authStore = useAuthStore();
const route = useRoute();

const catMap = { shawarma: "shawarma", doner: "doner", drinks: "drinks", sides: "sides", combos: "combo" };

onMounted(() => {
    const hash = route.hash?.replace("#", "");
    if (hash && catMap[hash]) {
        curCat.value = catMap[hash];
        setTimeout(() => {
            document.querySelector(".menu__bar")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    }
});

const cats = [
    { id: "all", label: "Всё" },
    { id: "shawarma", label: "Шаурма" },
    { id: "doner", label: "Донер" },
    { id: "drinks", label: "Напитки" },
    { id: "sides", label: "Дополнения" },
];

const curSearch = ref("");
const curCat = ref("all");
const fPriceMin = ref(0);
const fPriceMax = ref(0);
const fPopular = ref(false);
const fNew = ref(false);
const fSpicy = ref(false);
const fVeg = ref(false);
const sortBy = ref("default");

const badgeLabel = (badge) => {
    const labels = { hit: "ХИТ", new: "НОВИНКА", veg: "ВЕГЕ", spicy: "ОСТРОЕ" };
    return labels[badge] || badge;
};

const { badgeFor } = useSalesBadge();

const productBadge = (p) => badgeFor(p);

const filteredProducts = computed(() => {
    let list = productStore.items.filter((p) => p.published !== false);

    if (curCat.value !== "all") {
        list = list.filter((p) => p.cat === curCat.value);
    }

    if (curSearch.value.trim()) {
        const q = curSearch.value.toLowerCase();
        list = list.filter((p) => p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));
    }

    if (fPriceMin.value > 0) {
        list = list.filter((p) => p.price >= fPriceMin.value);
    }
    if (fPriceMax.value > 0) {
        list = list.filter((p) => p.price <= fPriceMax.value);
    }

    if (fPopular.value) {
        list = list.filter((p) => p.pop || badgeFor(p) === "hit");
    }
    if (fNew.value) {
        list = list.filter((p) => p.badge === "new");
    }
    if (fSpicy.value) {
        list = list.filter((p) => p.badge === "spicy");
    }
    if (fVeg.value) {
        list = list.filter((p) => p.badge === "veg");
    }

    if (sortBy.value === "priceAsc") {
        list.sort((a, b) => a.price - b.price);
    } else if (sortBy.value === "priceDesc") {
        list.sort((a, b) => b.price - a.price);
    } else if (sortBy.value === "popular") {
        list.sort((a, b) => (a.pop ? -1 : 1));
    }

    return list;
});

const quickAdd = (id, event) => {
    if (authStore.isAdmin) { alert('Администратор не может покупать товары'); return }
    const product = productStore.items.find((p) => p.id === id);
    if (!product) return;
    if (product.sizes?.length && product.sizes.length > 1) {
        navigateTo('/menu/' + id);
    } else {
        cartStore.addToCart(product, 1, "Стандарт");
        createFly(event);
    }
};

const createFly = (event) => {
    const el = document.createElement("div");
    el.className = "fly";
    const rect = event.target.getBoundingClientRect();
    el.style.left = rect.left + rect.width / 2 - 8 + "px";
    el.style.top = rect.top + rect.height / 2 - 8 + "px";
    document.body.appendChild(el);
    requestAnimationFrame(() => {
        el.style.transition = "all 0.7s cubic-bezier(0.22,1,0.36,1)";
        el.style.left = "calc(100vw - 100px)";
        el.style.top = "20px";
        el.style.transform = "scale(0.2)";
        el.style.opacity = "0";
    });
    setTimeout(() => el.remove(), 800);
};

definePageMeta({ layout: "default" });
</script>

<style scoped>
.menu-page { min-height: 100vh; }
.menu { padding: 60px 0 100px; }
.sec-head { text-align: center; margin-bottom: 40px; }
.sec-head h2 { font-size: clamp(28px,4vw,48px); font-weight: 900; letter-spacing: -0.03em; text-transform: uppercase; }
.sec-head h2 em { font-style: normal; color: var(--red); }
.sec-head p { color: rgba(34,34,34,.45); font-size: 14px; margin-top: 8px; font-weight: 600; letter-spacing: .02em }
.menu__bar { display: flex; align-items: center; gap: 16px; margin-bottom: 20px; flex-wrap: wrap }
.search { flex: 1; min-width: 200px }
.search input { width: 100%; padding: 10px 16px; border: 2px solid #e0e0e0; border-radius: 40px; font-size: 14px; font-family: inherit; background: #f9f9f9; transition: .2s; box-sizing: border-box; }
.search input:focus { outline: none; border-color: var(--red); background: #fff }
.tabs { display: flex; gap: 6px; flex-wrap: wrap }
.tab { padding: 6px 18px; border-radius: 99px; font-size: 13px; font-weight: 700; background: rgba(34,34,34,.04); border: none; cursor: pointer; transition: .2s; white-space: nowrap; color: rgba(34,34,34,.6); }
.tab.active { background: var(--red); color: #fff; box-shadow: 0 2px 12px rgba(214,40,40,.25); }
.filters { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 32px; padding: 12px 16px; background: #fff; border-radius: 14px; border: 1px solid rgba(34,34,34,.06); }
.fl-label { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: .08em; color: rgba(34,34,34,.35) }
.price-in { display: flex; align-items: center; gap: 6px }
.price-in input { width: 70px; padding: 6px 10px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 13px; font-family: inherit; background: #f9f9f9; text-align: center; box-sizing: border-box; }
.price-in input:focus { outline: none; border-color: var(--red) }
.check { display: inline-flex; align-items: center; gap: 6px; font-size: 12px; font-weight: 700; cursor: pointer; padding: 6px 14px; border-radius: 99px; border: 2px solid transparent; transition: .2s; color: rgba(34,34,34,.5); user-select: none; }
.check input { display: none }
.check.on { border-color: var(--red); color: var(--red); background: rgba(214,40,40,.06) }
.sel { padding: 6px 12px; border: 2px solid #e0e0e0; border-radius: 8px; font-size: 12px; font-weight: 600; font-family: inherit; background: #f9f9f9; cursor: pointer; color: rgba(34,34,34,.6); }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; }
.card { background: #fff; border-radius: 20px 20px 20px 6px; overflow: hidden; transition: .25s cubic-bezier(.22,1,.36,1); cursor: pointer; border: 2px solid rgba(34,34,34,.06); animation: fadeUp .5s both; }
.card:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(34,34,34,.08); border-color: rgba(214,40,40,.15); }
@keyframes fadeUp { from { opacity: 0; transform: translateY(20px) } }
.card__img { height: 140px; display: flex; align-items: center; justify-content: center; font-size: 48px; position: relative; }
.card__badge { position: absolute; top: 8px; left: 8px; padding: 2px 8px; border-radius: 99px; font-size: 9px; font-weight: 900; letter-spacing: .05em; text-transform: uppercase; color: #fff; }
.b-hit { background: var(--red) }
.b-new { background: #27ae60 }
.b-veg { background: #27ae60 }
.b-spicy { background: var(--orange) }
.card__body { padding: 14px; }
.card__top { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 6px; }
.card__name { font-size: 15px; font-weight: 800; line-height: 1.2; color: var(--ink); margin: 0; }
.card__weight { font-size: 11px; color: rgba(34,34,34,.3); white-space: nowrap; margin-top: 2px }
.card__desc { font-size: 12px; color: rgba(34,34,34,.5); line-height: 1.4; margin: 0 0 14px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.card__foot { display: flex; align-items: center; justify-content: space-between; }
.card__price { font-size: 18px; font-weight: 900; color: var(--red); }
.card__price small { font-size: 13px; font-weight: 600; }
.add { width: 36px; height: 36px; border-radius: 50%; border: none; background: var(--yellow); font-size: 20px; font-weight: 700; cursor: pointer; transition: .2s; display: flex; align-items: center; justify-content: center; color: var(--ink); }
.add:hover { transform: scale(1.1); box-shadow: 0 4px 16px rgba(247,127,0,.3); }
.empty { grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: rgba(34,34,34,.4); }
.empty b { display: block; font-size: 40px; margin-bottom: 12px }
.fly { position: fixed; width: 16px; height: 16px; background: var(--yellow); border-radius: 50%; pointer-events: none; z-index: 9999; }
</style>
