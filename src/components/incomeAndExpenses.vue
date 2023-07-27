<template>
  <main>
    <h1 :class="{ red: isNegative, green: !isNegative }">Moneda</h1>
  </main>
</template>

<script setup>
import { computed } from "vue";

const isNegative = computed(() => {
  console.log("amount", amountVisual.value);
  return amountVisual.value < 0;
});
</script>
