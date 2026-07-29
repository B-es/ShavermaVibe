<template>
  <div class="addresses-page">
    <h2>Адреса доставки</h2>

    <div class="addresses-list">
      <div v-for="address in sessionStore.addresses" :key="address.id" class="address-card" :class="{ 'address-card--default': address.def }">
        <div class="address-main">
          <span class="address-ico"><SvgIcon name="map-pin" :size="20" /></span>
          <div class="address-details">
            <b>{{ address.address }}</b>
            <span>{{ address.ent ? `подъезд ${address.ent} · ` : '' }}{{ address.floor ? `этаж ${address.floor} · ` : '' }}{{ address.apt ? `кв. ${address.apt}` : '' }}</span>
          </div>
        </div>
        <div class="address-actions">
          <button @click="setDefault(address.id)" class="btn btn--sm" :class="address.def ? 'btn--yellow' : 'btn--ghost'">
            {{ address.def ? 'Основной' : 'Сделать основным' }}
          </button>
          <button @click="deleteAddress(address.id)" class="btn btn--sm btn--ghost" style="color:var(--red)">✕</button>
        </div>
      </div>
    </div>

    <div class="add-address">
      <h3>Добавить адрес</h3>
      <form @submit.prevent="addAddress">
        <div class="form-row">
          <div class="form-group fg--wide">
            <label>Улица, дом</label>
            <input v-model="newAddress.street" type="text" placeholder="ул. Пушкина, д. 10" required />
          </div>
          <div class="form-group">
            <label>Подъезд</label>
            <input v-model="newAddress.ent" type="text" placeholder="1" />
          </div>
          <div class="form-group">
            <label>Этаж</label>
            <input v-model="newAddress.floor" type="text" placeholder="2" />
          </div>
          <div class="form-group">
            <label>Квартира</label>
            <input v-model="newAddress.apt" type="text" placeholder="5" />
          </div>
        </div>
        <button type="submit" class="btn btn--red btn--sm">Добавить адрес</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSessionStore } from '~/stores/session'

const sessionStore = useSessionStore()
onMounted(() => { sessionStore.load() })

const newAddress = ref({ street: '', ent: '', floor: '', apt: '' })

const addAddress = () => {
  sessionStore.addAddress({
    id: Date.now(),
    address: newAddress.value.street.trim(),
    ent: newAddress.value.ent,
    floor: newAddress.value.floor,
    apt: newAddress.value.apt,
    def: !sessionStore.addresses.length,
  })
  newAddress.value = { street: '', ent: '', floor: '', apt: '' }
}

const setDefault = (id) => { sessionStore.setDefaultAddress(id) }

const deleteAddress = (id) => {
  if (sessionStore.addresses.length <= 1) return
  sessionStore.removeAddress(id)
}
</script>

<style scoped>
.addresses-page h2 {
  font-size: 24px; font-weight: 900; letter-spacing: -0.02em;
  text-transform: uppercase; margin-bottom: 24px;
}
.addresses-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
.address-card {
  display: flex; justify-content: space-between; align-items: center; gap: 16px;
  padding: 18px 20px; border-radius: 16px 16px 16px 4px;
  border: 2px solid rgba(34,34,34,0.07); background: #fff; transition: 0.2s;
}
.address-card:hover { border-color: rgba(214,40,40,0.2); }
.address-card--default { border-color: var(--orange); background: rgba(247,127,0,0.04); }
.address-main { display: flex; align-items: center; gap: 12px; flex: 1; }
.address-ico { font-size: 20px; }
.address-details b { display: block; font-size: 15px; font-weight: 700; margin-bottom: 2px; }
.address-details span { font-size: 13px; color: rgba(34,34,34,0.55); }
.address-actions { display: flex; gap: 8px; flex-shrink: 0; }
.add-address {
  background: #fff; border-radius: 20px 20px 20px 6px;
  border: 2px dashed rgba(214,40,40,0.3); padding: 24px;
}
.add-address h3 { font-size: 16px; font-weight: 800; margin-bottom: 16px; }
.form-row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 16px; }
.form-group { flex: 1; min-width: 100px; }
.fg--wide { flex: 2; min-width: 200px; }
.form-group label { display: block; font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.06em; color: rgba(34,34,34,0.5); margin-bottom: 6px; }
.form-group input {
  width: 100%; padding: 10px 12px; border: 2px solid rgba(34,34,34,0.14);
  border-radius: 10px; font-size: 14px; font-family: inherit;
  background: var(--cream); transition: 0.2s; box-sizing: border-box;
}
.form-group input:focus { outline: none; border-color: var(--orange); }
</style>
