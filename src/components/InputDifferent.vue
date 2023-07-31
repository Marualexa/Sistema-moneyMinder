<template>
  <div class="input">
    <input type="text" class="input-search" placeholder="Buscar Movimiento" />
    <input type="date" class="date" />
    <select class="select-money" id="currency">
      <option value="">Seleciona la moneda</option>
      <option value="USD">USD - Dólares estadounidenses</option>
      <option value="COP">COP - Pesos colombianos</option>
      <option value="VEF">VEF - Bolívares venezolanos</option>
    </select>
    <select class="select-order" id="currency">
      <option value="text">Orden de movimientos</option>
      <option value="text">Ascedente</option>
      <option value="text">Descendente</option>
    </select>
    <button type="button" class="btn btn-info">Buscar</button>
  </div>
</template>

<script setup></script>

<style lang="sass">
@import "../sass/globalStyle.scss"
</style>
