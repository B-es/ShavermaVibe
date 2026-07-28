--- shawarma-nuxt/pages/account/index.vue (原始) +++
shawarma-nuxt/pages/account/index.vue (修改后)
<template>
    <div class="account-page">
        <template v-if="user">
            <section class="acct">
                <div class="wrap">
                    <div class="acct__head">
                        <div class="acct__ava">{{ user.name[0] }}</div>
                        <div style="flex: 1">
                            <h1>Привет, {{ user.name }}!</h1>
                            <p>{{ user.contact }} · с нами с 2024 года</p>
                        </div>
                        <button
                            class="btn btn--ghost btn--sm"
                            @click="handleLogout"
                        >
                            Выйти
                        </button>
                    </div>

                    <div class="acct__tabs">
                        <button
                            class="tab"
                            :class="{ active: acctTab === 'orders' }"
                            @click="acctTab = 'orders'"
                        >
                            📦 Заказы
                        </button>
                        <button
                            class="tab"
                            :class="{ active: acctTab === 'profile' }"
                            @click="acctTab = 'profile'"
                        >
                            👤 Профиль
                        </button>
                        <button
                            class="tab"
                            :class="{ active: acctTab === 'addresses' }"
                            @click="acctTab = 'addresses'"
                        >
                            📍 Адреса
                        </button>
                    </div>

                    <!-- Заказы -->
                    <template v-if="acctTab === 'orders'">
                        <div
                            v-for="o in myOrders"
                            :key="o.id"
                            class="order"
                            v-motion-fade
                        >
                            <div>
                                <div class="order__id">№ {{ o.id }}</div>
                                <div class="order__date">{{ o.date }}</div>
                            </div>
                            <div class="order__items">
                                Шаурма × 2, Напиток × 1
                            </div>
                            <span class="status" :class="'st-' + o.status">{{
                                statusLabel(o.status)
                            }}</span>
                            <b style="font-size: 17px">{{ fmt(o.total) }}</b>
                            <button
                                class="btn btn--ghost btn--sm"
                                @click="reorder(o)"
                            >
                                ↻ Повторить
                            </button>
                        </div>
                        <div v-if="!myOrders.length" class="empty">
                            <b>📦</b> Заказов пока нет — самое время сделать
                            первый!
                        </div>
                    </template>

                    <!-- Профиль -->
                    <template v-else-if="acctTab === 'profile'">
                        <div
                            style="
                                max-width: 480px;
                                background: #fff;
                                border-radius: 20px 20px 20px 6px;
                                border: 2px solid rgba(34, 34, 34, 0.07);
                                padding: 26px;
                            "
                        >
                            <div class="field" style="margin-bottom: 14px">
                                <label>Имя</label>
                                <input v-model="profileForm.name" />
                            </div>
                            <div class="field">
                                <label>Телефон / email</label>
                                <input v-model="profileForm.contact" />
                            </div>
                            <button
                                class="btn btn--red"
                                style="margin-top: 18px"
                                @click="saveProfile"
                            >
                                Сохранить изменения
                            </button>
                        </div>
                    </template>

                    <!-- Адреса -->
                    <template v-else>
                        <div style="max-width: 560px">
                            <div
                                v-for="a in addresses"
                                :key="a.id"
                                class="addr"
                                v-motion-fade
                            >
                                <span class="addr__ico">📍</span>
                                <div style="flex: 1">
                                    <b>{{ a.address }}</b>
                                    <span
                                        >подъезд {{ a.ent }} · этаж
                                        {{ a.floor }} · кв. {{ a.apt }}</span
                                    >
                                </div>
                                <span v-if="a.def" class="status st-ready"
                                    >основной</span
                                >
                                <button
                                    class="icon-del"
                                    @click="removeAddress(a.id)"
                                >
                                    🗑
                                </button>
                            </div>

                            <div
                                style="
                                    background: #fff;
                                    border-radius: 20px 20px 20px 6px;
                                    border: 2px dashed rgba(214, 40, 40, 0.35);
                                    padding: 22px;
                                "
                            >
                                <b style="display: block; margin-bottom: 12px"
                                    >Добавить адрес</b
                                >
                                <div class="f-grid">
                                    <div class="field f-full">
                                        <label>Улица, дом</label>
                                        <input
                                            v-model="addrForm.address"
                                            placeholder="ул. Пушкина, д. 10"
                                        />
                                    </div>
                                    <div class="field">
                                        <label>Подъезд</label>
                                        <input v-model="addrForm.ent" />
                                    </div>
                                    <div class="field">
                                        <label>Этаж</label>
                                        <input v-model="addrForm.floor" />
                                    </div>
                                    <div class="field">
                                        <label>Квартира</label>
                                        <input v-model="addrForm.apt" />
                                    </div>
                                </div>
                                <button
                                    class="btn btn--red btn--sm"
                                    style="margin-top: 14px"
                                    @click="addAddress"
                                >
                                    Добавить
                                </button>
                            </div>
                        </div>
                    </template>
                </div>
            </section>
        </template>

        <div v-else class="access">
            <div>
                <b>🔒</b>
                <h2
                    style="
                        font-size: 24px;
                        font-weight: 900;
                        text-transform: uppercase;
                        margin-bottom: 8px;
                    "
                >
                    Нужен вход
                </h2>
                <p style="color: rgba(34, 34, 34, 0.6); margin-bottom: 20px">
                    Войди, чтобы видеть историю заказов и адреса
                </p>
                <NuxtLink to="/auth" class="btn btn--red"
                    >Войти в аккаунт</NuxtLink
                >
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuth } from "~/composables/useAuth";
import { fmt } from "~/composables/useCart";
import { ORDER_STATUSES } from "~/composables/useAdmin";

const auth = useAuth();
const {
    user,
    profileForm,
    addrForm,
    addresses,
    myOrders,
    logout,
    saveProfile,
    addAddress,
    removeAddress,
} = auth;

const acctTab = ref<"orders" | "profile" | "addresses">("orders");

const handleLogout = () => {
    logout();
    navigateTo("/auth");
};

const statusLabel = (status: string) => {
    const s = ORDER_STATUSES.find((x) => x.id === status);
    return s?.label || status;
};

const reorder = (order) => {
    alert(`Повтор заказа №${order.id}`);
};

definePageMeta({
    layout: "default",
});
</script>

<style scoped>
.account-page {
    min-height: calc(100vh - 72px);
    padding: 40px 0;
}

.acct__head {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 32px;
    flex-wrap: wrap;
}

.acct__ava {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: var(--orange);
    color: #fff;
    display: grid;
    place-items: center;
    font-size: 28px;
    font-weight: 700;
}

.acct__head h1 {
    font-size: 24px;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 4px;
}

.acct__head p {
    color: rgba(34, 34, 34, 0.6);
    font-size: 14px;
}

.acct__tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 32px;
    border-bottom: 2px solid rgba(34, 34, 34, 0.08);
    padding-bottom: 0;
}

.tab {
    padding: 12px 20px;
    border: none;
    background: transparent;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    border-radius: 12px 12px 0 0;
    transition: 0.2s;
    color: rgba(34, 34, 34, 0.6);
}

.tab:hover {
    background: rgba(214, 40, 40, 0.05);
    color: var(--ink);
}

.tab.active {
    background: var(--ink);
    color: var(--yellow);
}

.order {
    background: #fff;
    border-radius: 20px 20px 20px 6px;
    border: 2px solid rgba(34, 34, 34, 0.07);
    padding: 20px;
    margin-bottom: 16px;
    display: grid;
    grid-template-columns: auto 1fr auto auto auto;
    gap: 16px;
    align-items: center;
}

@media (max-width: 768px) {
    .order {
        grid-template-columns: 1fr;
        gap: 12px;
    }
}

.order__id {
    font-weight: 800;
    font-size: 16px;
}

.order__date {
    font-size: 12px;
    color: rgba(34, 34, 34, 0.5);
}

.order__items {
    font-size: 14px;
    color: rgba(34, 34, 34, 0.7);
}

.status {
    padding: 6px 12px;
    border-radius: 99px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
}

.st-new {
    background: #e3f2fd;
    color: #1976d2;
}
.st-confirmed {
    background: #fff3e0;
    color: #f57c00;
}
.st-cooking {
    background: #ffebee;
    color: #d32f2f;
}
.st-ready {
    background: #e8f5e9;
    color: #388e3c;
}
.st-courier {
    background: #f3e5f5;
    color: #7b1fa2;
}
.st-completed {
    background: #e0f2f1;
    color: #00796b;
}
.st-cancelled {
    background: #ffebee;
    color: #c62828;
}

.empty {
    text-align: center;
    padding: 60px 20px;
    color: rgba(34, 34, 34, 0.5);
}

.empty b {
    font-size: 48px;
    display: block;
    margin-bottom: 12px;
}

.addr {
    background: #fff;
    border-radius: 20px 20px 20px 6px;
    border: 2px solid rgba(34, 34, 34, 0.07);
    padding: 18px 20px;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 14px;
}

.addr__ico {
    font-size: 24px;
}

.addr b {
    display: block;
    font-size: 15px;
    margin-bottom: 4px;
}

.addr span {
    font-size: 13px;
    color: rgba(34, 34, 34, 0.55);
}

.f-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

.f-full {
    grid-column: 1 / -1;
}

.field {
    display: flex;
    flex-direction: column;
}

.field label {
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 6px;
    color: rgba(34, 34, 34, 0.7);
}

.field input {
    padding: 11px 14px;
    border: 2px solid rgba(34, 34, 34, 0.12);
    border-radius: 10px;
    font-size: 14px;
    font-family: inherit;
    transition: 0.2s;
    background: #fff;
}

.field input:focus {
    outline: none;
    border-color: var(--red);
}

.icon-del {
    width: 36px;
    height: 36px;
    border: none;
    background: rgba(214, 40, 40, 0.08);
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
    transition: 0.2s;
}

.icon-del:hover {
    background: rgba(214, 40, 40, 0.15);
}

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: none;
    border-radius: 16px 16px 16px 4px;
    padding: 12px 24px;
    font-weight: 800;
    font-size: 14px;
    cursor: pointer;
    text-decoration: none;
    transition: 0.22s;
}

.btn--red {
    background: var(--red);
    color: #fff;
    box-shadow: var(--sh-warm);
}

.btn--red:hover {
    background: var(--red-d);
    transform: translateY(-2px);
}

.btn--ghost {
    background: transparent;
    color: var(--ink);
    border: 2px solid rgba(34, 34, 34, 0.22);
}

.btn--ghost:hover {
    border-color: var(--orange);
    color: var(--orange);
}

.btn--sm {
    padding: 10px 18px;
    font-size: 13px;
    border-radius: 12px 12px 12px 3px;
}

.access {
    min-height: calc(100vh - 72px);
    display: grid;
    place-items: center;
    text-align: center;
    padding: 40px 24px;
}

.access > div {
    max-width: 400px;
}

.access b {
    font-size: 64px;
    display: block;
    margin-bottom: 20px;
}

.access h2 {
    font-size: 24px;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 8px;
}

.access p {
    color: rgba(34, 34, 34, 0.6);
    margin-bottom: 20px;
}
</style>
