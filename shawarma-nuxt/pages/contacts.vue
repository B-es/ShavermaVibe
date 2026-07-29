<template>
  <div class="contacts-page">
    <section class="contacts">
      <div class="wrap">
        <div class="sec-head">
          <h2>Как нас <em>найти</em></h2>
          <p>Мы в двух минутах от метро — или в 30 минутах от твоего дома</p>
        </div>
        <div class="contacts__grid">
          <div>
            <div class="c-card">
              <div class="c-card__ico" style="background: #ffe8cc"><SvgIcon name="map-pin" :size="22" color="#e67e22" /></div>
              <div>
                <b>Адрес</b>
                <p>г. Москва, ул. Примерная, д. 1<br />вход со двора, ищи красную вывеску</p>
              </div>
            </div>
            <div class="c-card">
              <div class="c-card__ico" style="background: #ffd9d9"><SvgIcon name="phone" :size="22" color="#e74c3c" /></div>
              <div>
                <b>Телефон</b><a href="tel:+79991234567">+7 999 123-45-67</a>
                <p>принимаем заказы и вопросы</p>
              </div>
            </div>
            <div class="c-card">
              <div class="c-card__ico" style="background: #dff5e1"><SvgIcon name="clock" :size="22" color="#27ae60" /></div>
              <div style="flex: 1">
                <b>Часы работы</b>
                <table class="hours">
                  <tbody>
                    <tr><td>Пн — Пт</td><td>10:00 — 23:00</td></tr>
                    <tr><td>Сб — Вс</td><td>11:00 — 00:00</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="c-card">
              <div class="c-card__ico" style="background: #e5e0f5"><SvgIcon name="message" :size="22" color="#8e44ad" /></div>
              <div>
                <b>Мы на связи</b>
                <div class="socials">
                  <button class="soc" @click="showToast('Telegram: @shawarma')"><SvgIcon name="send" :size="16" /> Telegram</button>
                  <button class="soc" @click="showToast('WhatsApp: +7 999 123-45-67')"><SvgIcon name="message" :size="16" /> WhatsApp</button>
                  <button class="soc" @click="showToast('VK: vk.com/shawarma')"><SvgIcon name="globe" :size="16" /> VK</button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="map">
              <div class="map__pin">
                <SvgIcon name="map-pin" :size="28" color="var(--red)" /><span class="ring"></span>
              </div>
              <div class="map__label">Шаурма · ул. Примерная, 1</div>
              <button class="btn btn--red btn--sm map__btn" @click="showToast('Открываем маршрут…')"><SvgIcon name="map-pin" :size="14" /> Построить маршрут</button>
            </div>
            <div style="margin-top: 22px; background: #fff; border-radius: 18px 18px 18px 5px; border: 2px solid rgba(34,34,34,0.07); padding: 22px;">
              <b style="font-size: 15px; display: block; margin-bottom: 12px;">Напиши нам — ответим за 10 минут</b>
              <div class="f-grid">
                <div class="field">
                  <label>Имя</label><input v-model="feedback.name" placeholder="Твоё имя" />
                </div>
                <div class="field">
                  <label>Телефон</label><input v-model="feedback.phone" placeholder="+7…" />
                </div>
                <div class="field f-full">
                  <label>Сообщение</label><textarea v-model="feedback.msg" rows="2" placeholder="Вопрос, отзыв или идея"></textarea>
                </div>
              </div>
              <button class="btn btn--red" style="margin-top: 12px" @click="sendFeedback">Отправить</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { showToast } from "~/composables/useToast";

const feedback = ref({ name: "", phone: "", msg: "" });

const sendFeedback = () => {
  if (!feedback.value.name || !feedback.value.msg) {
    showToast("Заполни имя и сообщение");
    return;
  }
  showToast("Спасибо! Твоё сообщение отправлено.");
  feedback.value = { name: "", phone: "", msg: "" };
};

definePageMeta({ layout: "default" });
</script>