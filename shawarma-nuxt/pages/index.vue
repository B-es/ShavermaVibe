<template>
    <div class="home-page">
        <!-- Hero Section -->
        <section class="hero">
            <div class="wrap hero__in">
                <div>
                    <span class="kicker">Готовим на огне с 2024 года</span>
                    <h1>
                        Сочная<span class="r2">Шаурма</span
                        ><span class="r3">за 5 минут</span>
                    </h1>
                    <p class="hero__sub">
                        Мясо с вертикального гриля, свежие овощи и
                        <b>тот самый фирменный соус</b>. Соберём твой идеальный
                        лаваш — горячим и хрустящим.
                    </p>
                    <div class="hero__cta">
                        <NuxtLink to="/menu" class="btn btn--red"
                            ><SvgIcon name="chevron-right" :size="18" /> Заказать сейчас</NuxtLink
                        >
                        <NuxtLink to="/about" class="btn btn--ghost"
                            >О ресторане</NuxtLink
                        >
                    </div>
                    <div class="hero__stats">
                        <div class="stat">
                            <b>4.9 <i>★</i></b
                            ><span>2 400+ отзывов</span>
                        </div>
                        <div class="stat">
                            <b>30 мин</b><span>средняя доставка</span>
                        </div>
                        <div class="stat">
                            <b>120 000+</b><span>заказов приготовлено</span>
                        </div>
                    </div>
                </div>
                <div class="stage">
                    <div class="stage__ring"></div>
                    <div class="grill">
                        <div class="grill__glow"></div>
                        <div class="grill__steam"><b></b><b></b><b></b></div>
                        <div v-if="hitProduct" class="product-visual" :style="{ background: hitProduct.bg }">
                            <span>{{ hitProduct.emoji }}</span>
                        </div>
                        <div class="grill__tray"></div>
                    </div>
                    <div class="orbit">
                        <span v-for="o in orbit" :key="o">{{ o }}</span>
                    </div>
                    <div v-if="hitProduct" class="sticker sticker--hit">Хит продаж</div>
                    <div v-if="hitProduct" class="sticker sticker--price">от <b>{{ topProductPrice }}</b></div>
                </div>
            </div>
        </section>

        <!-- Why Us Section -->
        <section class="why">
            <div class="wrap">
                <div class="sec-head">
                    <h2>Почему <em>мы</em></h2>
                    <p>Четыре причины, по которым к нам возвращаются</p>
                </div>
                <div class="coupons">
                    <div v-for="w in why" :key="w.num" class="coupon">
                        <span class="coupon__ico"><SvgIcon :name="w.ico" :size="24" /></span>
                        <div class="coupon__num">{{ w.num }}</div>
                        <h3>{{ w.title }}</h3>
                        <p>{{ w.text }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Reviews Section -->
        <section class="reviews">
            <div class="wrap">
                <div class="sec-head">
                    <h2>Говорят <em>гости</em></h2>
                    <p>4.9 из 5 — и мы не планируем останавливаться</p>
                </div>
                <div class="rev-grid">
                    <div v-for="r in reviews" :key="r.id" class="rev">
                        <div class="stars">{{ "★".repeat(r.rating) }}</div>
                        <p>{{ r.text }}</p>
                        <div class="rev__who">
                            <span
                                class="rev__ava"
                                :style="{ background: r.color }"
                                >{{ r.author[0] }}</span
                            >
                            <div>
                                <b>{{ r.author }}</b
                                ><span>{{ r.meta }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Delivery Steps Section -->
        <section class="delivery">
            <div class="wrap">
                <div class="sec-head">
                    <h2>Как <em>заказать</em></h2>
                    <p>От клика до горячей шаурмы — четыре шага</p>
                </div>
                <div class="steps">
                    <div v-for="s in stepsData" :key="s.n" class="step">
                        <div class="step__n">{{ s.n }}</div>
                        <h3>{{ s.title }}</h3>
                        <p>{{ s.text }}</p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useProductStore } from "~/stores/products";
import { useCartStore } from "~/stores/cart";
import { useOrderStore } from "~/stores/orders";
import { fmt } from "~/composables/useUtils";

const productStore = useProductStore();
const cartStore = useCartStore();
const orderStore = useOrderStore();

const hitProduct = computed(() => {
    const top = orderStore.topProducts;
    if (!top.length) return null;
    return productStore.items.find((p) => p.name === top[0].name) || null;
});

const topProductPrice = computed(() => {
    if (!hitProduct.value) return "199 ₽";
    return hitProduct.value.price + " ₽";
});

const orbit = ["🌿", "🧅", "🍅", "🧄", "🌶️"];


const quickAdd = (id, event) => {
    const product = productStore.items.find((p) => p.id === id);
    if (product) {
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

const why = [
    {
        num: "01",
        ico: "heart",
        title: "Свежее мясо",
        text: "Курицу и свинину привозят каждое утро — никакой заморозки, только охлаждёнка.",
    },
    {
        num: "02",
        ico: "star",
        title: "Овощи день в день",
        text: "Режем на салаты утром. То, что не продали — не используем.",
    },
    {
        num: "03",
        ico: "message",
        title: "Авторские соусы",
        text: "Двенадцать видов соусов собственного приготовления. Рецепты не раскрываем.",
    },
    {
        num: "04",
        ico: "clock",
        title: "Три минуты",
        text: "Среднее время сборки — три минуты. Не ждёшь — успеваешь.",
    },
];

const reviews = [
    {
        id: 1,
        author: "Алексей М.",
        rating: 5,
        text: "Лучшая шаурма в городе! Особенно нравится острая с халапеньо. Готовят быстро, всегда свежее.",
        color: "#d62828",
        meta: "2 дня назад",
    },
    {
        id: 2,
        author: "Мария К.",
        rating: 5,
        text: "Заказываю доставку уже третий раз — всё отлично! Упаковано аккуратно, горячее, курьер вежливый.",
        color: "#f77f00",
        meta: "Неделю назад",
    },
    {
        id: 3,
        author: "Дмитрий В.",
        rating: 4,
        text: "Вкусно, сытно, недорого. Классическая шаурма — топ! Иногда бывают очереди, но оно того стоит.",
        color: "#fcbf49",
        meta: "2 недели назад",
    },
];

const stepsData = [
    {
        n: 1,
        title: "Выбери позиции",
        text: "Листай меню, добавляй в корзину любые шаурмы, напитки и дополнения.",
    },
    {
        n: 2,
        title: "Оформи заказ",
        text: "Укажи адрес, выбери доставку или самовывоз — и нажми «Заказать».",
    },
    {
        n: 3,
        title: "Мы готовим",
        text: "Повар собирает твой заказ за 3 минуты. Мясо на гриле, овощи нарезаются.",
    },
    {
        n: 4,
        title: "Получаешь",
        text: "Курьер привозит заказ за 30 минут или ждём тебя у стойки. Приятного!",
    },
];

definePageMeta({ layout: "default" });
</script>

<style scoped>
.home-page {
    min-height: 100vh;
}

.stage {
    position: relative;
    height: 500px;
    display: grid;
    place-items: center;
}
.stage__ring {
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    border: 2px dashed rgba(214, 40, 40, 0.32);
    animation: spin 44s linear infinite;
}
@keyframes spin {
    to { transform: rotate(360deg); }
}
.grill {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 3;
    overflow: visible;
}
.grill__glow {
    position: absolute;
    top: 50%; left: 50%;
    width: 260px; height: 260px;
    border-radius: 50%;
    margin: -130px 0 0 -130px;
    background: radial-gradient(circle at 50% 42%, rgba(247,127,0,0.42), rgba(252,191,73,0.16) 52%, transparent 72%);
    animation: breathe 3s ease-in-out infinite;
    z-index: -1;
}
@keyframes breathe {
    50% { opacity: 0.7; }
}
.grill__tray {
    width: 216px; height: 15px; border-radius: 8px;
    background: linear-gradient(#9ca3af, #6b7280);
    margin-top: 8px; box-shadow: 0 10px 24px rgba(0,0,0,0.22); z-index: 3;
}
.grill__steam {
    position: absolute; top: -34px; left: 50%; transform: translateX(-50%);
    display: flex; gap: 15px; z-index: 5;
}
.grill__steam b {
    width: 7px; height: 46px; border-radius: 99px;
    background: linear-gradient(to top, rgba(255,255,255,0), rgba(255,255,255,0.9));
    filter: blur(3px); animation: rise 2.6s ease-in-out infinite;
}
.grill__steam b:nth-child(2) { animation-delay: 0.7s; height: 58px; }
.grill__steam b:nth-child(3) { animation-delay: 1.3s; }
@keyframes rise {
    0% { transform: translateY(16px) scaleY(0.5); opacity: 0; }
    45% { opacity: 0.95; }
    100% { transform: translateY(-32px) scaleY(1.1); opacity: 0; }
}
.orbit {
    position: absolute; width: 440px; height: 440px;
    animation: spin 28s linear infinite; z-index: 2;
}
.orbit span {
    position: absolute; font-size: 40px;
    filter: drop-shadow(0 6px 10px rgba(34,34,34,0.22));
}
.orbit span:nth-child(1) { top: -8px; left: 50%; }
.orbit span:nth-child(2) { top: 50%; right: -12px; }
.orbit span:nth-child(3) { bottom: -6px; left: 46%; }
.orbit span:nth-child(4) { top: 46%; left: -14px; }
.orbit span:nth-child(5) { top: 10%; right: 6%; }
.sticker {
    position: absolute; z-index: 6; font-weight: 800; text-transform: uppercase;
    letter-spacing: 0.04em; box-shadow: 0 12px 26px -10px rgba(34,34,34,0.4);
    animation: float 6s ease-in-out infinite;
}
@keyframes float {
    50% { transform: translateY(-10px); }
}
.sticker--hit {
    top: 56px; right: 4px;
    background: var(--yellow); color: var(--ink);
    padding: 10px 16px; border-radius: 4px 16px 4px 16px;
    transform: rotate(6deg); font-size: 13px;
}
.sticker--price {
    bottom: 64px; left: -6px;
    background: var(--red); color: #fff;
    padding: 14px 20px; border-radius: 16px 4px 16px 4px;
    transform: rotate(-5deg); font-size: 14px; animation-delay: 1.1s;
}
.sticker--price b {
    font-size: 25px; display: block; letter-spacing: -0.02em;
}

.product-visual {
    width: 120px; height: 140px; border-radius: 20px;
    display: grid; place-items: center; font-size: 60px;
    z-index: 3; box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
</style>
