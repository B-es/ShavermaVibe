<template>
  <div class="contacts-page">
    <section class="contacts-hero">
      <div class="wrap">
        <h1>Контакты</h1>
        <p>Свяжитесь с нами любым удобным способом</p>
      </div>
    </section>

    <section class="contacts-content">
      <div class="wrap">
        <div class="contacts-grid">
          <div class="contact-info">
            <h2>Наши контакты</h2>
            
            <div class="contact-item">
              <span class="contact-icon">📞</span>
              <div>
                <h4>Телефон</h4>
                <a href="tel:+79991234567">+7 (999) 123-45-67</a>
              </div>
            </div>
            
            <div class="contact-item">
              <span class="contact-icon">✉️</span>
              <div>
                <h4>Email</h4>
                <a href="mailto:info@shawarma.ru">info@shawarma.ru</a>
              </div>
            </div>
            
            <div class="contact-item">
              <span class="contact-icon">📍</span>
              <div>
                <h4>Адреса ресторанов</h4>
                <p>ул. Пушкина, д. 10</p>
                <p>пр. Ленина, д. 25</p>
              </div>
            </div>
            
            <div class="contact-item">
              <span class="contact-icon">⏰</span>
              <div>
                <h4>Режим работы</h4>
                <p>Ежедневно с 10:00 до 23:00</p>
              </div>
            </div>
          </div>
          
          <div class="contact-form-wrapper">
            <h3>Напишите нам</h3>
            <form class="contact-form" @submit.prevent="submitForm">
              <div class="form-group">
                <label for="name">Ваше имя</label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  placeholder="Иван Иванов"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="phone">Телефон</label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  placeholder="+7 (999) 123-45-67"
                  required
                />
              </div>
              
              <div class="form-group">
                <label for="message">Сообщение</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="4"
                  placeholder="Ваш вопрос или предложение"
                  required
                ></textarea>
              </div>
              
              <button type="submit" class="btn-submit">
                Отправить сообщение
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const form = ref({
  name: '',
  phone: '',
  message: ''
})

const submitForm = () => {
  // Здесь будет логика отправки формы
  alert('Спасибо! Ваше сообщение отправлено.')
  form.value = { name: '', phone: '', message: '' }
}

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.contacts-page {
  min-height: 100vh;
  padding-top: 80px;
}

.contacts-hero {
  background: linear-gradient(135deg, #ff6b35 0%, #feca57 100%);
  color: white;
  padding: 60px 0;
  text-align: center;
}

.contacts-hero h1 {
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.contacts-hero p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.contacts-content {
  padding: 60px 0;
}

.contacts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
}

@media (max-width: 768px) {
  .contacts-grid {
    grid-template-columns: 1fr;
  }
}

.contact-info h2 {
  font-size: 2rem;
  color: #2d3436;
  margin-bottom: 30px;
}

.contact-item {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.contact-icon {
  font-size: 2rem;
}

.contact-item h4 {
  color: #2d3436;
  font-size: 1.1rem;
  margin-bottom: 4px;
}

.contact-item a {
  color: #ff6b35;
  text-decoration: none;
  font-size: 1.1rem;
}

.contact-item a:hover {
  text-decoration: underline;
}

.contact-item p {
  color: #636e72;
  margin: 4px 0;
}

.contact-form-wrapper {
  background: white;
  border: 2px solid #ff6b35;
  border-radius: 16px;
  padding: 32px;
}

.contact-form-wrapper h3 {
  font-size: 1.5rem;
  color: #2d3436;
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  color: #2d3436;
  font-weight: 600;
  margin-bottom: 8px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #ff6b35;
}

.btn-submit {
  width: 100%;
  padding: 14px 24px;
  background: #ff6b35;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-submit:hover {
  background: #e85a2a;
}
</style>
