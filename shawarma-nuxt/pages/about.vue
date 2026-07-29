<template>
  <div class="about-page">
    <section class="about-hero">
      <div class="wrap">
        <span class="kicker">Наша история</span>
        <h1>Мы жарим мясо,<br /><em>а не маркетинг</em></h1>
        <p class="lead">
          Всё началось в 2015-м с одного гриля, одного лаваша и огромного желания делать шаурму, за
          которой возвращаются. С тех пор изменилось всё — кроме рецепта фирменного соуса.
        </p>
      </div>
    </section>

    <div class="wrap">
      <div class="numbers">
        <div class="number" v-for="n in numbers" :key="n.label">
          <b>{{ n.value }}</b><span>{{ n.label }}</span>
        </div>
      </div>

      <div class="sec-head">
        <h2>Наш <em>путь</em></h2>
        <p>От ларька у метро до любимой шаурмечной района</p>
      </div>
      <div class="timeline">
        <div class="tl-item" v-for="t in timeline" :key="t.year">
          <div class="tl-dot">{{ t.year }}</div>
          <h3>{{ t.title }}</h3>
          <p>{{ t.text }}</p>
        </div>
      </div>

      <div class="sec-head">
        <h2>Как <em>это выглядит</em></h2>
        <p>Кухня, гриль и команда — без фильтров</p>
      </div>
      <div class="photo-grid">
        <div v-for="ph in photos" :key="ph.label" class="ph" :style="{ background: ph.bg }">
          <span>{{ ph.emoji }}</span><small>{{ ph.label }}</small>
        </div>
      </div>

      <div class="sec-head">
        <h2>Сертификаты <em>и качество</em></h2>
        <p>Всё официально, всё проверяемо</p>
      </div>
      <div class="certs">
        <div class="cert" v-for="c in certs" :key="c.title">
          <span class="cert__ico"><SvgIcon :name="c.ico" :size="22" /></span>
          <div>
            <b>{{ c.title }}</b>
            <p>{{ c.text }}</p>
          </div>
        </div>
      </div>

      <div class="sec-head">
        <h2>Из чего <em>готовим</em></h2>
        <p>Продукты, за которые не стыдно</p>
      </div>
      <div class="sourcing">
        <div class="src" v-for="s in sourcing" :key="s.title">
          <span class="src__ico"><SvgIcon :name="s.ico" :size="22" /></span>
          <b>{{ s.title }}</b>
          <p>{{ s.text }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const numbers = [
  { value: "11 лет", label: "готовим на огне" },
  { value: "120 000+", label: "заказов приготовлено" },
  { value: "4.9 ★", label: "средняя оценка гостей" },
  { value: "15", label: "человек в команде" },
];

const timeline = [
  { year: "'15", title: "Первый гриль", text: "Открылись у метро с одним вертелом и секретным рецептом чесночного соуса. Очередь выстроилась в первый же день." },
  { year: "'18", title: "Запустили доставку", text: "Купили первый скутер и начали возить шаурму горячей за 30 минут. Спойлер: скутеров стало пять." },
  { year: "'21", title: "100 000-й заказ", text: "Юбилейный заказ отдали бесплатно — и завели традицию радовать постоянных гостей комбо за счёт заведения." },
  { year: "'26", title: "Онлайн-заказы", text: "Запустили сайт с оформлением за 3 клика. Теперь шаурма приезжает ещё быстрее — а ты можешь собрать её сам." },
];

const photos = [
  { emoji: "🔥", bg: "#ffd9b3", label: "Гриль" },
  { emoji: "🥬", bg: "#d9f0d9", label: "Овощи" },
  { emoji: "👨‍🍳", bg: "#ffe0cc", label: "Команда" },
  { emoji: "🏪", bg: "#d9e6f2", label: "Интерьер" },
  { emoji: "🚗", bg: "#f2e0d9", label: "Доставка" },
  { emoji: "🧂", bg: "#f0e6d9", label: "Соусы" },
  { emoji: "🥙", bg: "#f2d9d9", label: "Готовка" },
  { emoji: "⭐", bg: "#e6f0d9", label: "Отзывы" },
];

const certs = [
  { ico: "clipboard", title: "Декларация соответствия", text: "Продукция сертифицирована по ТР ТС 021/2011" },
  { ico: "check", title: "СанПиН", text: "Кухня проходит проверку каждые 3 месяца" },
  { ico: "heart", title: "Ветеринарные справки", text: "Мясо только от проверенных фермерских хозяйств" },
];

const sourcing = [
  { ico: "star", title: "Фермерская курица", text: "Охлаждённое филе с подмосковных ферм. Никакой заморозки — привозят каждое утро." },
  { ico: "burger", title: "Лаваш из тандыра", text: "Печём сами в тандыре каждые 2 часа. Тонкий, с дымком, не размокает от соуса." },
  { ico: "heart", title: "Овощи день в день", text: "Томаты, огурцы и зелень закупаем утром на рынке. Вечером — уже не используем." },
];

definePageMeta({ layout: "default" });
</script>