<template>
    <div class="admin-page">
        <section class="admin-hero">
            <div class="wrap">
                <span class="kicker"><SvgIcon name="tools" :size="16" /> Админ-панель</span>
                <button @click="logout" class="btn-logout"><SvgIcon name="log-out" :size="14" /> Выйти</button>
            </div>
        </section>

        <section class="admin-content">
            <div class="wrap">
                <div v-if="!authStore.isAuthenticated || !authStore.isAdmin" class="access-denied">
                    <h2><SvgIcon name="x" size="24" color="var(--red)" /> Доступ запрещён</h2>
                    <p>У вас нет прав администратора</p>
                    <NuxtLink to="/menu" class="btn btn--red btn--sm">В меню</NuxtLink>
                </div>

                <div v-else class="admin-dashboard">
                    <div class="kpis">
                        <div class="kpi"><span class="kpi-icon"><SvgIcon name="package" :size="24" /></span><div><div class="kpi-label">Всего заказов</div><div class="kpi-value">{{ totalOrders }}</div></div></div>
                        <div class="kpi"><span class="kpi-icon"><SvgIcon name="cash" :size="24" /></span><div><div class="kpi-label">Выручка</div><div class="kpi-value">{{ fmt(totalRevenue) }}</div></div></div>
                        <div class="kpi"><span class="kpi-icon"><SvgIcon name="trending-up" :size="24" /></span><div><div class="kpi-label">Сегодня</div><div class="kpi-value">{{ todayOrders }}</div></div></div>
                        <div class="kpi"><span class="kpi-icon"><SvgIcon name="star" :size="24" /></span><div><div class="kpi-label">Средний рейтинг</div><div class="kpi-value">{{ avgRating }}/5</div></div></div>
                    </div>

                    <div class="admin-tabs">
                        <button v-for="tab in tabs" :key="tab.id" :class="['tab', { active: adminTab === tab.id }]" @click="adminTab = tab.id">{{ tab.label }}</button>
                    </div>

                    <div v-if="adminTab === 'orders'" class="admin-panel">
                        <div class="panel-head">
                            <h3><SvgIcon name="clipboard" :size="18" /> Заказы</h3>
                            <div class="panel-actions">
                                <button v-for="f in orderFilters" :key="f.id" @click="filterOrders = f.id" class="btn btn--sm" :class="filterOrders === f.id ? 'btn--ink' : 'btn--ghost'">{{ f.label }}</button>
                            </div>
                        </div>
                        <table v-if="filteredOrders.length" class="tbl">
                            <thead><tr><th>ID</th><th>Клиент</th><th>Телефон</th><th>Сумма</th><th>Статус</th><th>Действия</th></tr></thead>
                            <tbody>
                                <tr v-for="order in filteredOrders" :key="order.id">
                                    <td class="td--id">#{{ order.id }}</td>
                                    <td>{{ order.name }}</td>
                                    <td>{{ order.phone }}</td>
                                    <td class="td--price">{{ fmt(order.total) }}</td>
                                    <td><span :class="['badge', 'b--' + order.status]">{{ statusLabel(order.status) }}</span><span v-if="order.cancelReason" class="cancel-reason">: {{ order.cancelReason }}</span></td>
                                    <td class="td--actions">
                                        <button v-if="nextStatus(order.status)" @click="updateOrderStatus(order.id, nextStatus(order.status))" :class="['btn', 'btn--sm', nextBtnClass(order.status)]">{{ nextBtnLabel(order.status) }}</button>
                                        <button v-if="order.status !== 'completed' && order.status !== 'cancelled'" @click="cancelOrder(order.id)" class="btn btn--sm btn--cancel">Отменить</button>
                                        <button v-if="order.status === 'completed' || order.status === 'cancelled'" class="btn btn--sm btn--cancel btn--placeholder" tabindex="-1" aria-hidden="true">Отменить</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div v-else class="empty-state">Заказов не найдено</div>
                    </div>

                    <div v-if="adminTab === 'products'" class="admin-panel">
                        <div class="panel-head">
                            <h3><SvgIcon name="burger" :size="18" /> Продукты</h3>
                            <button @click="openAddProduct" class="btn btn--red btn--sm"><SvgIcon name="plus" :size="14" /> Добавить</button>
                        </div>
                        <div class="products-grid">
                            <div v-for="product in productStore.items" :key="product.id" class="product-card">
                                <div class="product-visual" :style="{ background: product.bg }">
                                    <img v-if="product.image" :src="product.image" :alt="product.name" class="product-img" />
                                    <span v-else>{{ product.emoji }}</span>
                                </div>
                                <div class="product-body">
                                    <b>{{ product.name }}</b>
                                    <span>{{ fmt(product.price) }}</span>
                                    <span :class="product.published !== false ? 'product-published' : 'product-draft'">{{ product.published !== false ? 'Опубликован' : 'Черновик' }}</span>
                                </div>
                                <div class="product-actions">
                                    <button @click="editProduct(product)" class="btn-icon" title="Редактировать"><SvgIcon name="edit" :size="16" /></button>
                                    <button @click="deleteProduct(product.id)" class="btn-icon btn-icon--del" title="Удалить"><SvgIcon name="trash" :size="16" /></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="adminTab === 'categories'" class="admin-panel">
                        <div class="panel-head">
                            <h3><SvgIcon name="folder" :size="18" /> Категории</h3>
                            <button @click="openAddCategory" class="btn btn--red btn--sm"><SvgIcon name="plus" :size="14" /> Добавить</button>
                        </div>
                        <div class="cat-list">
                            <div v-for="cat in productStore.categories" :key="cat.id" class="cat-item">
                                <span class="cat-badge">{{ cat.label }}</span>
                                <span class="cat-id">id: {{ cat.id }}</span>
                                <div class="cat-actions">
                                    <button @click="editCategory(cat)" class="btn-icon" title="Редактировать"><SvgIcon name="edit" :size="16" /></button>
                                    <button @click="deleteCategory(cat.id)" class="btn-icon btn-icon--del" title="Удалить"><SvgIcon name="trash" :size="16" /></button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="adminTab === 'analytics'" class="admin-panel">
                        <div class="panel-head"><h3><SvgIcon name="bar-chart" :size="18" /> Аналитика</h3></div>
                        <div class="analytics-grid">
                            <div class="analytics-card">
                                <h4>Выручка по дням</h4>
                                <div class="bar-chart">
                                    <div v-for="(day, i) in revenueDays" :key="i" class="bar-col">
                                        <div class="bar-value">{{ fmt(day.value) }}</div>
                                        <div class="bar-track">
                                            <div class="bar-fill" :style="{ height: day.pct + '%' }"></div>
                                        </div>
                                        <div class="bar-label">{{ day.label }}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="analytics-card">
                                <h4>Популярные товары</h4>
                                <div class="top-list">
                                    <div v-for="(item, i) in topProducts" :key="i" class="top-item">
                                        <span class="top-rank">{{ i + 1 }}</span>
                                        <span class="top-emoji">{{ item.emoji }}</span>
                                        <span class="top-name">{{ item.name }}</span>
                                        <span class="top-qty">{{ item.qty }} шт</span>
                                    </div>
                                </div>
                            </div>
                            <div class="analytics-card">
                                <h4>Статистика</h4>
                                <div class="stats-list">
                                    <div class="stat-row"><span>Средний чек</span><b>{{ fmt(avgCheck) }}</b></div>
                                    <div class="stat-row"><span>Заказов сегодня</span><b>{{ todayOrders }}</b></div>
                                    <div class="stat-row"><span>Конверсия</span><b>{{ conversionRate }}%</b></div>
                                    <div class="stat-row"><span>Активных клиентов</span><b>{{ activeClients }}</b></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Teleport to="body">
            <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
                <div class="modal-content modal--wide">
                    <div class="modal-head">
                        <h3>{{ editingProduct ? 'Редактировать товар' : 'Новый товар' }}</h3>
                        <button @click="closeModal" class="modal-close">✕</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-row">
                            <label>Название</label>
                            <input v-model="form.name" type="text" placeholder="Шаурма..." class="inp" />
                        </div>
                        <div class="form-row">
                            <label>Категория</label>
                            <select v-model="form.cat" class="inp">
                                <option v-for="cat in productStore.categories" :key="cat.id" :value="cat.id">{{ cat.label }}</option>
                            </select>
                        </div>
                        <div class="form-row">
                            <label>Цена (₽)</label>
                            <input v-model.number="form.price" type="number" min="0" class="inp" />
                        </div>
                        <div class="form-row">
                            <label>Описание</label>
                            <textarea v-model="form.desc" class="inp" rows="2"></textarea>
                        </div>
                        <div class="form-row">
                            <label>Изображение</label>
                            <div class="img-row">
                                <input type="file" accept="image/*" @change="onImageUpload" class="inp-file" />
                                <div v-if="form.image" class="img-preview"><img :src="form.image" alt="preview" /></div>
                            </div>
                        </div>
                        <div class="form-row">
                            <label class="toggle-row">
                                <span>Опубликован</span>
                                <label class="switch">
                                    <input type="checkbox" v-model="form.published" />
                                    <span class="slider"></span>
                                </label>
                            </label>
                        </div>
                        <div class="form-row">
                            <label>Аллергены</label>
                            <div class="allerg-checkboxes">
                                <label v-for="a in allergenList" :key="a.id" class="allerg-checkbox">
                                    <input type="checkbox" :value="a.id" v-model="form.allerg" />
                                    <span>{{ a.label }}</span>
                                </label>
                            </div>
                        </div>
                        <div class="modifiers-section">
                            <h4>Модификаторы</h4>
                            <div class="mod-group">
                                <div class="mod-group-head">
                                    <span>Размеры <small>(радио — выбрать одно)</small></span>
                                    <button @click="addModifier('sizes')" class="btn btn--sm btn--ghost">+ Размер</button>
                                </div>
                                <div v-for="(s, i) in form.sizes" :key="i" class="mod-row">
                                    <input v-model="s.label" type="text" placeholder="Название" class="inp inp--sm" />
                                    <input v-model.number="s.priceModifier" type="number" min="0" placeholder="+₽" class="inp inp--sm inp--num" />
                                    <button @click="form.sizes.splice(i, 1)" class="btn-icon btn-icon--del">✕</button>
                                </div>
                                <div v-if="!form.sizes.length" class="mod-empty">Нет размеров</div>
                            </div>
                            <!-- extras removed -->
                        </div>
                    </div>
                    <div class="modal-foot">
                        <button @click="closeModal" class="btn btn--ghost btn--sm">Отмена</button>
                        <button @click="saveProduct" class="btn btn--red btn--sm" :disabled="!form.name.trim() || !form.price">Сохранить</button>
                    </div>
                </div>
            </div>
            <div v-if="showCatModal" class="modal-overlay" @click.self="closeCatModal">
                <div class="modal-content">
                    <div class="modal-head">
                        <h3>{{ editingCategory ? 'Редактировать категорию' : 'Новая категория' }}</h3>
                        <button @click="closeCatModal" class="modal-close">✕</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-row">
                            <label>Название</label>
                            <input v-model="catForm.label" type="text" placeholder="Например: Комбо" class="inp" />
                        </div>
                    </div>
                    <div class="modal-foot">
                        <button @click="closeCatModal" class="btn btn--ghost btn--sm">Отмена</button>
                        <button @click="saveCategory" class="btn btn--red btn--sm" :disabled="!catForm.label.trim()">Сохранить</button>
                    </div>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import { useAuthStore } from "~/stores/auth";
import { useProductStore } from "~/stores/products";
import { useOrderStore } from "~/stores/orders";
import { fmt } from "~/composables/useUtils";

const authStore = useAuthStore();
const productStore = useProductStore();
const orderStore = useOrderStore();
const adminTab = ref("orders");
const filterOrders = ref("all");

const orders = computed(() => orderStore.orders);
const totalOrders = computed(() => orders.value.length);
const totalRevenue = computed(() => orders.value.reduce((s, o) => s + o.total, 0));
const todayOrders = computed(() => orders.value.filter(o => o.date?.startsWith(new Date().toISOString().split("T")[0])).length);
const avgRating = computed(() => (Math.random() * 1.5 + 3.5).toFixed(1));

const filteredOrders = computed(() => filterOrders.value === "all" ? orders.value : orders.value.filter(o => o.status === filterOrders.value));

const statusFlow: Record<string, string> = { new: "confirmed", confirmed: "cooking", cooking: "ready", ready: "completed" };

const statusLabel = (status: string) => ({ new: "Новый", confirmed: "Принят", cooking: "Готовится", ready: "Готов", completed: "Выдан", cancelled: "Отменён" }[status] || status);

const nextStatus = (status: string) => statusFlow[status] || null;
const nextBtnLabel = (status: string) => ({ new: "Принять", confirmed: "В готовку", cooking: "Готов", ready: "Выдать" }[status] || "");
const nextBtnClass = (status: string) => ({ new: "btn--green", confirmed: "btn--blue", cooking: "btn--purple", ready: "btn--orange" }[status] || "");

const updateOrderStatus = (id: string, status: string) => {
    orderStore.updateStatus(id, status);
};

const cancelOrder = (id: string) => {
    const reason = prompt("Причина отмены:");
    if (reason === null) return;
    orderStore.cancelOrder(id, reason.trim() || "Не указана");
};

const logout = () => {
    authStore.logout();
    navigateTo("/");
};

const tabs = ref([
    { id: "orders", label: "Заказы" },
    { id: "products", label: "Продукты" },
    { id: "categories", label: "Категории" },
    { id: "analytics", label: "Аналитика" },
]);

const orderFilters = ref([
    { id: "all", label: "Все" },
    { id: "new", label: "Новые" },
    { id: "confirmed", label: "Принятые" },
    { id: "cooking", label: "Готовятся" },
    { id: "ready", label: "Готовы" },
    { id: "cancelled", label: "Отменённые" },
]);

const showModal = ref(false);
const editingProduct = ref<any>(null);
const showCatModal = ref(false);
const editingCategory = ref<any>(null);

const allergenList = [
    { id: "gluten", label: "Глютен" },
    { id: "dairy", label: "Молокопродукты" },
    { id: "nuts", label: "Орехи" },
    { id: "mushrooms", label: "Грибы" },
    { id: "none", label: "Нет" },
];

const defaultForm = () => ({
    name: "", cat: productStore.categories[0]?.id || "shawarma", price: 0, desc: "",
    image: "", published: true,
    sizes: [] as { id: string; label: string; priceModifier: number }[],
    allerg: [] as string[],
});

const form = reactive(defaultForm());

let modCounter = 0;
const addModifier = (type: "sizes") => {
    modCounter++;
    form.sizes.push({ id: "m" + modCounter, label: "", priceModifier: 0 });
};

const openAddProduct = () => {
    editingProduct.value = null;
    Object.assign(form, defaultForm());
    showModal.value = true;
};

const editProduct = (product: any) => {
    editingProduct.value = product;
    form.name = product.name;
    form.cat = product.cat;
    form.price = product.price;
    form.desc = product.desc;
    form.image = product.image || "";
    form.published = product.published !== false;
    form.sizes = product.sizes ? product.sizes.map((s: any) => ({ ...s })) : [];
    form.allerg = product.allerg ? [...product.allerg] : [];
    showModal.value = true;
};

const saveProduct = () => {
    if (!form.name.trim() || !form.price) return;
    const sizes = form.sizes.filter((s) => s.label.trim());
    const allerg = form.allerg.filter(Boolean);
    if (editingProduct.value) {
        productStore.updateProduct(editingProduct.value.id, {
            name: form.name.trim(), price: form.price, cat: form.cat, desc: form.desc,
            image: form.image, published: form.published,
            sizes: sizes.length ? sizes : undefined,
            allerg: allerg.length ? allerg : undefined,
        });
    } else {
        productStore.addProduct({
            name: form.name.trim(), cat: form.cat, price: form.price, desc: form.desc,
            image: form.image, published: form.published,
            sizes,
            allerg: allerg.length ? allerg : undefined,
        });
    }
    showModal.value = false;
};

const onImageUpload = (e: Event) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { form.image = reader.result as string; };
    reader.readAsDataURL(file);
};

const closeModal = () => { showModal.value = false; };

const deleteProduct = (id: number) => { if (confirm("Удалить товар?")) productStore.deleteProduct(id); };

const catForm = reactive({ label: "" });
const openAddCategory = () => {
    editingCategory.value = null;
    catForm.label = "";
    showCatModal.value = true;
};
const editCategory = (cat: any) => {
    editingCategory.value = cat;
    catForm.label = cat.label;
    showCatModal.value = true;
};
const saveCategory = () => {
    if (!catForm.label.trim()) return;
    if (editingCategory.value) {
        productStore.updateCategory(editingCategory.value.id, catForm.label.trim());
    } else {
        productStore.addCategory(catForm.label.trim());
    }
    showCatModal.value = false;
};
const closeCatModal = () => { showCatModal.value = false; };
const deleteCategory = (id: string) => {
    const used = productStore.items.some((p) => p.cat === id);
    if (used) { alert("Нельзя удалить категорию — есть товары в ней"); return; }
    if (confirm("Удалить категорию?")) productStore.deleteCategory(id);
};

const revenueDays = computed(() => {
    const data = [
        { label: "Пн", value: 12400 }, { label: "Вт", value: 9800 }, { label: "Ср", value: 15300 },
        { label: "Чт", value: 11200 }, { label: "Пт", value: 18900 }, { label: "Сб", value: 22100 },
        { label: "Вс", value: 17600 },
    ];
    const max = Math.max(...data.map(d => d.value));
    return data.map(d => ({ ...d, pct: Math.round((d.value / max) * 100) }));
});

const topProducts = computed(() => {
    return [
        { emoji: "🌯", name: "Шаурма Классическая", qty: 187 },
        { emoji: "🥙", name: "Донар Классический", qty: 145 },
        { emoji: "🍟", name: "Картошка Фритюр", qty: 132 },
        { emoji: "🧀", name: "Шаурма Сырная", qty: 118 },
        { emoji: "🥤", name: "Кола", qty: 96 },
    ];
});

const avgCheck = computed(() => Math.round(totalRevenue.value / (totalOrders.value || 1)));
const conversionRate = computed(() => (Math.random() * 10 + 15).toFixed(1));
const activeClients = computed(() => Math.floor(Math.random() * 80 + 40));
</script>

<style scoped>
.admin-page { min-height: 100vh; }
.admin-hero {
    background: linear-gradient(135deg, var(--red) 0%, var(--orange) 60%, var(--yellow) 100%);
    color: #fff;
    padding: 28px 0;
    text-align: center;
}
.admin-hero .wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}
.admin-hero .kicker {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    background: rgba(255,255,255,0.2);
    color: #fff;
    font-weight: 700;
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 6px 12px;
    border-radius: 99px;
    margin-bottom: 8px;
}
.admin-hero h1 {
    font-size: clamp(22px, 3.6vw, 36px);
    font-weight: 900;
    letter-spacing: -0.03em;
    text-transform: uppercase;
}
.btn-logout {
    padding: 6px 16px;
    border: 1.5px solid rgba(255,255,255,0.25);
    background: rgba(255,255,255,0.08);
    color: #fff;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    font-size: 12px;
    transition: 0.2s;
    display: inline-flex;
    align-items: center;
    gap: 5px;
}
.btn-logout:hover { background: rgba(255,255,255,0.15); border-color: #fff; }
.access-denied { text-align: center; padding: 60px 20px; margin: 40px auto; max-width: 440px; }
.access-denied h2 { font-size: 24px; margin-bottom: 8px; }
.access-denied p { color: rgba(34,34,34,0.55); margin-bottom: 20px; }
.admin-dashboard { margin: 32px 0 60px; }
.kpis { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-bottom: 28px; }
.kpi {
    background: #fff;
    border-radius: 16px 16px 16px 4px;
    border: 2px solid rgba(34,34,34,0.07);
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 14px;
}
.kpi-icon { font-size: 28px; }
.kpi-label { font-size: 12px; color: rgba(34,34,34,0.5); font-weight: 600; margin-bottom: 2px; }
.kpi-value { font-size: 24px; font-weight: 900; letter-spacing: -0.02em; }
.admin-tabs { display: flex; gap: 4px; margin-bottom: 20px; }
.admin-tabs .tab {
    padding: 10px 18px;
    border: none;
    background: none;
    font-weight: 700;
    font-size: 14px;
    cursor: pointer;
    color: rgba(34,34,34,0.5);
    border-radius: 10px 10px 10px 3px;
    transition: 0.2s;
}
.admin-tabs .tab:hover { background: rgba(214,40,40,0.08); color: var(--red); }
.admin-tabs .tab.active { background: var(--ink); color: var(--yellow); }
.admin-panel {
    background: #fff;
    border-radius: 20px 20px 20px 6px;
    border: 2px solid rgba(34,34,34,0.07);
    padding: 24px;
}
.panel-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
.panel-head h3 { font-size: 18px; font-weight: 800; margin: 0; display: flex; align-items: center; gap: 8px; }
.panel-actions { display: flex; gap: 6px; }
.tbl { width: 100%; border-collapse: collapse; }
.tbl th, .tbl td { padding: 10px 12px; text-align: left; border-bottom: 1px solid rgba(34,34,34,0.06); font-size: 13px; }
.tbl th { font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: rgba(34,34,34,0.4); background: rgba(34,34,34,0.02); }
.td--id { font-weight: 700; font-size: 12px; }
.td--price { font-weight: 800; color: var(--red); }
.badge { font-size: 11px; font-weight: 800; letter-spacing: 0.05em; padding: 3px 10px; border-radius: 3px 10px 3px 10px; white-space: nowrap; }
.b--new { background: #fff8e1; color: #f9a825; }
.b--confirmed { background: #e8f5e9; color: #2e7d32; }
.b--cooking { background: #e3f2fd; color: #1565c0; }
.b--ready { background: #f3e5f5; color: #7b1fa2; }
.b--completed { background: #e8f5e9; color: #2e7d32; }
.b--cancelled { background: #fee2e2; color: var(--red-d); }
.cancel-reason { font-size: 11px; color: rgba(34,34,34,0.45); }
.td--actions { white-space: nowrap; display: flex; gap: 6px; align-items: center; }
.empty-state { text-align: center; padding: 40px 20px; color: rgba(34,34,34,0.4); font-weight: 600; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 14px; }
.product-card {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    border-radius: 14px 14px 14px 4px;
    border: 2px solid rgba(34,34,34,0.06);
    transition: 0.2s;
    min-height: 72px;
}
.product-card:hover { border-color: rgba(214,40,40,0.2); }
.product-visual { width: 60px; height: 60px; border-radius: 14px 14px 14px 4px; display: grid; place-items: center; font-size: 30px; flex-shrink: 0; }
.product-body { flex: 1; min-width: 0; }
.product-body b { display: block; font-size: 14px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.product-body span { font-size: 13px; color: var(--red); font-weight: 800; }
.product-actions { display: flex; gap: 2px; flex-shrink: 0; align-items: center; }

.btn-icon {
    width: 28px; height: 28px;
    display: grid; place-items: center;
    border: none; background: transparent;
    border-radius: 8px 8px 8px 3px;
    cursor: pointer; font-size: 14px;
    transition: 0.15s;
}
.btn-icon:hover { background: rgba(34,34,34,0.06); }
.btn-icon--del:hover { background: rgba(214,40,40,0.1); }

.btn--green, .btn--blue, .btn--purple, .btn--orange, .btn--cancel {
    padding: 6px 14px; font-size: 12px; font-weight: 700; line-height: 1.4;
    border-radius: 8px; cursor: pointer; border: none; transition: background 0.15s, color 0.15s, border-color 0.15s;
    box-sizing: border-box; outline: none; background-clip: padding-box;
}
.btn--green { background: #2e7d32; color: #fff; }
.btn--green:hover { background: #1b5e20; }
.btn--blue { background: #1565c0; color: #fff; }
.btn--blue:hover { background: #0d47a1; }
.btn--purple { background: #7b1fa2; color: #fff; }
.btn--purple:hover { background: #4a148c; }
.btn--orange { background: var(--orange); color: #fff; }
.btn--orange:hover { background: #e07000; }
.btn--cancel { background: rgba(214,40,40,0.08); color: var(--red-d); }
.btn--cancel:hover { background: var(--red); color: #fff; }
.btn--placeholder { visibility: hidden; pointer-events: none; }
.btn--ink { background: var(--ink); color: var(--yellow); padding: 4px 10px; border: none; border-radius: 8px 8px 8px 3px; cursor: pointer; font-weight: 700; font-size: 11px; line-height: 1.4; transition: 0.15s; }

.analytics-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
@media (max-width: 900px) { .analytics-grid { grid-template-columns: 1fr; } }
.analytics-card {
    background: rgba(34,34,34,0.02);
    border-radius: 14px 14px 14px 4px;
    padding: 20px;
}
.analytics-card h4 { font-size: 14px; font-weight: 800; margin: 0 0 16px; }
.analytics-card:last-child { grid-column: 1 / -1; }
.bar-chart { display: flex; gap: 12px; align-items: flex-end; height: 160px; }
.bar-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; height: 100%; }
.bar-value { font-size: 11px; font-weight: 700; color: var(--red); }
.bar-track { flex: 1; width: 100%; background: rgba(214,40,40,0.08); border-radius: 6px 6px 3px 3px; position: relative; display: flex; align-items: flex-end; }
.bar-fill { width: 100%; background: linear-gradient(to top, var(--red), var(--orange)); border-radius: 6px 6px 3px 3px; transition: 0.3s; min-height: 4px; }
.bar-label { font-size: 11px; font-weight: 600; color: rgba(34,34,34,0.5); }
.top-list { display: flex; flex-direction: column; gap: 8px; }
.top-item { display: flex; align-items: center; gap: 10px; padding: 8px 12px; background: #fff; border-radius: 10px 10px 10px 3px; }
.top-rank { width: 22px; height: 22px; display: grid; place-items: center; background: var(--ink); color: var(--yellow); font-weight: 800; font-size: 11px; border-radius: 6px 6px 6px 2px; }
.top-emoji { font-size: 20px; }
.top-name { flex: 1; font-weight: 700; font-size: 13px; }
.top-qty { font-weight: 600; font-size: 12px; color: rgba(34,34,34,0.5); }
.stats-list { display: flex; flex-direction: column; gap: 10px; }
.stat-row { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #fff; border-radius: 10px 10px 10px 3px; font-size: 13px; }
.stat-row b { font-weight: 800; color: var(--red); }

.modal-overlay {
    position: fixed; inset: 0; z-index: 1000;
    background: rgba(0,0,0,0.5);
    display: grid; place-items: center;
    padding: 20px;
}
.modal-content {
    background: #fff;
    border-radius: 20px 20px 20px 6px;
    width: 100%; max-width: 460px;
    max-height: 85vh; overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}
.modal--wide { max-width: 600px; }
.modal-head {
    display: flex; justify-content: space-between; align-items: center;
    padding: 20px 24px 0;
}
.modal-head h3 { font-size: 18px; font-weight: 800; margin: 0; }
.modal-close { width: 32px; height: 32px; border: none; background: rgba(34,34,34,0.06); border-radius: 50%; cursor: pointer; font-size: 16px; display: grid; place-items: center; }
.modal-body { padding: 20px 24px; display: flex; flex-direction: column; gap: 14px; }
.modal-foot { display: flex; justify-content: flex-end; gap: 10px; padding: 0 24px 20px; }
.form-row { display: flex; flex-direction: column; gap: 4px; }
.form-row label { font-size: 12px; font-weight: 700; color: rgba(34,34,34,0.6); text-transform: uppercase; letter-spacing: 0.05em; }
.inp {
    padding: 10px 12px; border: 2px solid rgba(34,34,34,0.1); border-radius: 10px 10px 10px 3px;
    font-size: 14px; font-family: inherit; outline: none; transition: 0.2s;
    background: #fff;
}
.inp:focus { border-color: var(--orange); }
.inp--color { height: 40px; padding: 4px; cursor: pointer; }
textarea.inp { resize: vertical; }
.inp-file { padding: 8px; border: 2px solid rgba(34,34,34,0.1); border-radius: 10px 10px 10px 3px; font-size: 13px; background: #fff; cursor: pointer; width: 100%; box-sizing: border-box; }
.product-img { width: 100%; height: 100%; object-fit: cover; border-radius: 14px 14px 14px 4px; }
.product-published { font-size: 11px; color: #2e7d32; font-weight: 700; display: block; }
.product-draft { font-size: 11px; color: var(--orange); font-weight: 700; display: block; }
.img-row { display: flex; gap: 10px; align-items: flex-start; }
.img-row .inp { flex: 1; }
.img-preview { width: 50px; height: 50px; border-radius: 8px; overflow: hidden; flex-shrink: 0; border: 2px solid rgba(34,34,34,0.06); }
.img-preview img { width: 100%; height: 100%; object-fit: cover; }
.toggle-row { display: flex; justify-content: space-between; align-items: center; flex-direction: row; cursor: pointer; }
.switch { position: relative; display: inline-block; width: 40px; height: 22px; cursor: pointer; }
.switch input { opacity: 0; width: 0; height: 0; }
.slider {
    position: absolute; inset: 0; background: rgba(34,34,34,0.15); border-radius: 22px; transition: 0.2s;
}
.slider::before {
    content: ""; position: absolute; width: 18px; height: 18px; left: 2px; bottom: 2px;
    background: #fff; border-radius: 50%; transition: 0.2s;
}
.switch input:checked + .slider { background: var(--red); }
.switch input:checked + .slider::before { transform: translateX(18px); }
.allerg-checkboxes { display: flex; flex-wrap: wrap; gap: 8px; }
.allerg-checkbox { display: flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 600; cursor: pointer; padding: 4px 10px; border: 2px solid rgba(34,34,34,0.1); border-radius: 8px; transition: 0.15s; }
.allerg-checkbox input { accent-color: var(--red); }
.allerg-checkbox:has(input:checked) { border-color: var(--red); background: rgba(214,40,40,0.06); }
.modifiers-section { border-top: 2px solid rgba(34,34,34,0.06); padding-top: 16px; margin-top: 4px; }
.modifiers-section h4 { font-size: 14px; font-weight: 800; margin: 0 0 12px; }
.mod-group { margin-bottom: 16px; }
.mod-group-head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.mod-group-head span { font-size: 13px; font-weight: 700; color: rgba(34,34,34,0.6); }
.mod-group-head small { font-weight: 400; font-size: 11px; color: rgba(34,34,34,0.35); }
.mod-row { display: flex; gap: 6px; align-items: center; margin-bottom: 6px; }
.mod-row .inp--sm { padding: 6px 10px; font-size: 13px; }
.mod-row .inp--num { width: 70px; flex-shrink: 0; }
.mod-empty { font-size: 12px; color: rgba(34,34,34,0.3); padding: 8px 0; }
.cat-list { display: flex; flex-direction: column; gap: 8px; }
.cat-item { display: flex; align-items: center; gap: 12px; padding: 12px 16px; background: rgba(34,34,34,0.02); border-radius: 12px 12px 12px 4px; }
.cat-badge { font-weight: 700; font-size: 14px; }
.cat-id { font-size: 12px; color: rgba(34,34,34,0.35); font-family: monospace; }
.cat-actions { margin-left: auto; display: flex; gap: 2px; }
</style>
