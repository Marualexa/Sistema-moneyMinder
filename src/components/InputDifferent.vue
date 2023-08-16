<template>
  <div class="input">
    <input type="text" v-model="filters.nameMov" class="input-search" placeholder="Buscar Movimiento" />

    <input type="date" v-model="filters.date" class="date" />

    <select class="select-money" v-model="filters.money" id="currency">
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.text }}</option>
    </select>

    <select class="select-order" v-model="filters.order" id="currency">
      <option value="asc">Ascedente</option>
      <option value="desc">Descendente</option>
    </select>
    <button type="button" @click="searchFilt" class="btn btn-info">Buscar</button>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useCartStore } from "../store/cartContainer"; 

const store = useCartStore();

const filters = reactive({
  nameMov: "",
  date: "",
  money: "",
  order: ""
});

const options = ref([
  { text: "USD - Dólares estadounidenses", value: "1" },
  { text: "COP - Pesos colombianos", value: "2" },
  { text: "VEF - Bolívares venezolanos", value: "3" },
]);

function searchFilt() {
  store.setFilter(filters);
  store.addInputMovents(true);
}
</script>

<style lang="sass">
@import "../sass/globalStyle.scss"
</style>
