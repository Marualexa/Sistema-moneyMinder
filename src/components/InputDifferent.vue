<template>
  <div class="input">
    <input type="text" class="input-search" placeholder="Buscar Movimiento" />
    <input type="date" class="date" />

    <select class="select-money" v-model="currencyMoney" id="currency">
      <option v-for="{ text, value } in options" :key="value">{{ text }}</option>
    </select>

    <select class="select-order" id="currency">
      <option value="text">Orden de movimientos</option>
      <option value="text">Ascedente</option>
      <option value="text">Descendente</option>
    </select>
    <button type="button" class="btn btn-info">Buscar</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

const currencyMoney = ref("");

const options = ref([
  { text: "USD - Dólares estadounidenses", value: "1" },
  { text: "COP - Pesos colombianos", value: "2" },
  { text: "VEF - Bolívares venezolanos", value: "3" },
]);
</script>

<style lang="sass">
@import "../sass/globalStyle.scss"
</style>
