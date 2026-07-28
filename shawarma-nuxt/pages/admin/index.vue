--- shawarma-nuxt/pages/admin/index.vue (原始) +++
shawarma-nuxt/pages/admin/index.vue (修改后)
<template>
    <div class="admin-page">
        <template v-if="isAdmin">
            <section class="admin">
                <div class="wrap">
                    <div class="admin__head">
                        <h1>Админ-<em>панель</em></h1>
                        <span class="status st-cooking">режим управления</span>
                    </div>

                    <!-- KPI Dashboard -->
                    <div class="kpis">
                        <div class="kpi" v-motion-fade>
                            <span>Выручка</span>
                            <b>{{ fmt(adminKpi.revenue) }}</b>
                        </div>
                        <div class="kpi" v-motion-fade>
                            <span>Заказы</span>
                            <b>{{ adminKpi.count }} <i>шт</i></b>
                        </div>
                        <div class="kpi" v-motion-fade>
                            <span>Средний чек</span>
                            <b>{{ fmt(adminKpi.avg) }}</b>
                        </div>
                        <div class="kpi" v-motion-fade>
                            <span>В работе</span>
                            <b>{{ adminKpi.active }} <i>заказов</i></b>
                        </div>
                    </div>

                    <!-- Admin Tabs -->
                    <div class="admin__tabs">
                        <button
                            class="tab"
                            :class="{ active: adminTab === 'products' }"
                            @click="adminTab = 'products'"
                        >
                            🌯 Товары
                        </button>
                        <button
                            class="tab"
                            :class="{ active: adminTab === 'orders' }"
                            @click="adminTab = 'orders'"
                        >
                            📦 Заказы
                        </button>
                        <button
                            class="tab"
                            :class="{ active: adminTab === 'reviews' }"
                            @click="adminTab = 'reviews'"
                        >
                            ⭐ Отзывы
                        </button>
                    </div>

                    <!-- Товары -->
                    <div v-if="adminTab === 'products'" class="panel-card">
                        <div class="add-form">
                            <input
                                v-model="np.emoji"
                                placeholder="🌯"
                                style="width: 60px; text-align: center"
                            />
                            <input
                                v-model="np.name"
                                placeholder="Название"
                                style="flex: 1; min-width: 160px"
                            />
                            <select v-model="np.cat">
                                <option
                                    v-for="c in cats.slice(1)"
                                    :key="c.id"
                                    :value="c.id"
                                >
                                    {{ c.label }}
                                </option>
                            </select>
                            <input
                                v-model.number="np.price"
                                type="number"
                                placeholder="Цена ₽"
                                style="width: 100px"
                            />
                            <button
                                class="btn btn--red btn--sm"
                                @click="addProduct"
                            >
                                + Добавить
                            </button>
                        </div>

                        <div style="overflow-x: auto">
                            <table class="tbl">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Название</th>
                                        <th>Категория</th>
                                        <th>Цена</th>
                                        <th>Доступен</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="p in products" :key="p.id">
                                        <td class="p-emoji">{{ p.emoji }}</td>
                                        <td>
                                            <b>{{ p.name }}</b>
                                            <br />
                                            <span
                                                style="
                                                    font-size: 11px;
                                                    color: rgba(
                                                        34,
                                                        34,
                                                        34,
                                                        0.5
                                                    );
                                                "
                                                >{{ p.weight }}</span
                                            >
                                        </td>
                                        <td>{{ catLabel(p.cat) }}</td>
                                        <td>
                                            <input
                                                class="price-edit"
                                                type="number"
                                                v-model.number="p.price"
                                            />
                                            ₽
                                        </td>
                                        <td>
                                            <label class="switch">
                                                <input
                                                    type="checkbox"
                                                    v-model="p.available"
                                                />
                                                <i></i>
                                            </label>
                                        </td>
                                        <td>
                                            <button
                                                class="icon-del"
                                                @click="removeProduct(p.id)"
                                            >
                                                🗑
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Заказы -->
                    <div v-else-if="adminTab === 'orders'" class="panel-card">
                        <div style="overflow-x: auto">
                            <table class="tbl">
                                <thead>
                                    <tr>
                                        <th>№</th>
                                        <th>Клиент</th>
                                        <th>Телефон</th>
                                        <th>Сумма</th>
                                        <th>Доставка</th>
                                        <th>Статус</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="o in adminOrders" :key="o.id">
                                        <td>
                                            <b>{{ o.id }}</b>
                                            <br />
                                            <span
                                                style="
                                                    font-size: 11px;
                                                    color: rgba(
                                                        34,
                                                        34,
                                                        34,
                                                        0.5
                                                    );
                                                "
                                                >{{ o.date }}</span
                                            >
                                        </td>
                                        <td>{{ o.name }}</td>
                                        <td>{{ o.phone }}</td>
                                        <td>
                                            <b>{{ fmt(o.total) }}</b>
                                        </td>
                                        <td>
                                            {{
                                                o.delivery === "delivery"
                                                    ? "🛵"
                                                    : "🏃"
                                            }}
                                        </td>
                                        <td>
                                            <select
                                                class="status-sel"
                                                :class="'st-' + o.status"
                                                v-model="o.status"
                                            >
                                                <option
                                                    v-for="s in ORDER_STATUSES"
                                                    :key="s.id"
                                                    :value="s.id"
                                                >
                                                    {{ s.label }}
                                                </option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Отзывы -->
                    <div v-else class="panel-card">
                        <div style="overflow-x: auto">
                            <table class="tbl">
                                <thead>
                                    <tr>
                                        <th>Автор</th>
                                        <th>Оценка</th>
                                        <th>Текст</th>
                                        <th>Опубликован</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="r in adminReviews" :key="r.id">
                                        <td>
                                            <b>{{ r.author }}</b>
                                        </td>
                                        <td
                                            style="
                                                color: var(--orange);
                                                font-weight: 800;
                                            "
                                        >
                                            {{ "★".repeat(r.rating)
                                            }}{{ "☆".repeat(5 - r.rating) }}
                                        </td>
                                        <td style="max-width: 320px">
                                            {{ r.text }}
                                        </td>
                                        <td>
                                            <label class="switch">
                                                <input
                                                    type="checkbox"
                                                    v-model="r.published"
                                                />
                                                <i></i>
                                            </label>
                                        </td>
                                        <td>
                                            <button
                                                class="icon-del"
                                                @click="removeReview(r.id)"
                                            >
                                                🗑
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </template>

        <div v-else class="access">
            <div>
                <b>🛡</b>
                <h2
                    style="
                        font-size: 24px;
                        font-weight: 900;
                        text-transform: uppercase;
                        margin-bottom: 8px;
                    "
                >
                    Только для админа
                </h2>
                <p style="color: rgba(34, 34, 34, 0.6); margin-bottom: 20px">
                    Войди как администратор (демо-кнопка на странице входа)
                </p>
                <NuxtLink to="/auth" class="btn btn--red"
                    >Перейти ко входу</NuxtLink
                >
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAdmin } from "~/composables/useAdmin";
import { useAuth } from "~/composables/useAuth";
import { fmt } from "~/composables/useCart";
import { ORDER_STATUSES } from "~/composables/useAdmin";

const admin = useAdmin();
const auth = useAuth();

const {
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
    removeReview,
} = admin;
const { isAdmin } = auth;

definePageMeta({
    layout: "default",
});
</script>

<style scoped>
.admin-page {
    min-height: calc(100vh - 72px);
    padding: 40px 0;
}

.admin__head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
    flex-wrap: wrap;
    gap: 16px;
}

.admin__head h1 {
    font-size: 28px;
    font-weight: 900;
    text-transform: uppercase;
}

.admin__head h1 em {
    font-style: normal;
    color: var(--red);
}

.kpis {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-bottom: 32px;
}

.kpi {
    background: #fff;
    border-radius: 20px 20px 20px 6px;
    border: 2px solid rgba(34, 34, 34, 0.07);
    padding: 24px;
    text-align: center;
}

.kpi span {
    display: block;
    font-size: 13px;
    color: rgba(34, 34, 34, 0.55);
    margin-bottom: 8px;
    font-weight: 600;
    text-transform: uppercase;
}

.kpi b {
    display: block;
    font-size: 28px;
    font-weight: 800;
    color: var(--ink);
}

.kpi b i {
    font-style: normal;
    font-size: 14px;
    font-weight: 500;
    color: var(--orange);
}

.admin__tabs {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
    border-bottom: 2px solid rgba(34, 34, 34, 0.08);
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

.panel-card {
    background: #fff;
    border-radius: 20px 20px 20px 6px;
    border: 2px solid rgba(34, 34, 34, 0.07);
    padding: 24px;
}

.add-form {
    display: flex;
    gap: 12px;
    margin-bottom: 24px;
    flex-wrap: wrap;
}

.add-form input,
.add-form select {
    padding: 11px 14px;
    border: 2px solid rgba(34, 34, 34, 0.12);
    border-radius: 10px;
    font-size: 14px;
    font-family: inherit;
    background: #fff;
}

.add-form input:focus,
.add-form select:focus {
    outline: none;
    border-color: var(--red);
}

.tbl {
    width: 100%;
    border-collapse: collapse;
}

.tbl th {
    text-align: left;
    padding: 14px 12px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    color: rgba(34, 34, 34, 0.55);
    border-bottom: 2px solid rgba(34, 34, 34, 0.08);
}

.tbl td {
    padding: 16px 12px;
    border-bottom: 1px solid rgba(34, 34, 34, 0.05);
    vertical-align: middle;
}

.tbl tbody tr:last-child td {
    border-bottom: none;
}

.p-emoji {
    font-size: 28px;
}

.price-edit {
    width: 80px;
    padding: 6px 10px;
    border: 2px solid rgba(34, 34, 34, 0.12);
    border-radius: 8px;
    font-size: 14px;
    font-family: inherit;
}

.price-edit:focus {
    outline: none;
    border-color: var(--red);
}

.switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 26px;
}

.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.switch i {
    position: absolute;
    cursor: pointer;
    inset: 0;
    background: rgba(34, 34, 34, 0.15);
    border-radius: 26px;
    transition: 0.3s;
}

.switch i:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 3px;
    bottom: 3px;
    background: #fff;
    border-radius: 50%;
    transition: 0.3s;
}

.switch input:checked + i {
    background: var(--red);
}

.switch input:checked + i:before {
    transform: translateX(22px);
}

.status-sel {
    padding: 8px 12px;
    border: 2px solid transparent;
    border-radius: 99px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    cursor: pointer;
    background: #fff;
}

.status-sel.st-new {
    background: #e3f2fd;
    color: #1976d2;
    border-color: #1976d2;
}
.status-sel.st-confirmed {
    background: #fff3e0;
    color: #f57c00;
    border-color: #f57c00;
}
.status-sel.st-cooking {
    background: #ffebee;
    color: #d32f2f;
    border-color: #d32f2f;
}
.status-sel.st-ready {
    background: #e8f5e9;
    color: #388e3c;
    border-color: #388e3c;
}
.status-sel.st-courier {
    background: #f3e5f5;
    color: #7b1fa2;
    border-color: #7b1fa2;
}
.status-sel.st-completed {
    background: #e0f2f1;
    color: #00796b;
    border-color: #00796b;
}
.status-sel.st-cancelled {
    background: #ffebee;
    color: #c62828;
    border-color: #c62828;
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

.status {
    padding: 6px 12px;
    border-radius: 99px;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
}

.st-cooking {
    background: #ffebee;
    color: #d32f2f;
}
</style>
