<template>
  <div class="movement">
    <div class="content">
      <h4>Ingreso</h4>
      <p>Saldo actual del mes de agosto 23</p>
    </div>
    <div class="action">
      <img src="../../assets/eliminar.png" alt="" @click="remove" />
      <p :class="{ red: isNegative, green: !isNegative }">100.000,00</p>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits, toRefs } from "vue";

const props = defineProps({
  id: {
    type: Number,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  amount: {
    type: Number,
  },
});

const { id, title, description, amount } = toRefs(props);

// const amountCurrency = computed(() => currencyFormater.format(amount.value));

const emit = defineEmits(["remove"]);

const remove = () => {
  emit("remove", id.value);
};

const isNegative = computed(() => amount.value < 0);
</script>

<style lang="sass">
@import "../../sass/globalStyle.scss"
</style>
