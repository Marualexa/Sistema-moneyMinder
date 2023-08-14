<template>
  <div class="movement">
    <DelectModel :id="id" v-if="showDelect" @closet-modal="modelEvet" />
    <div class="content">
      <h4>{{ title }}</h4>
      <p>{{ description }}</p>
      <p>{{ movementType }}</p>
    </div>
    <div class="action">
      <img class="edi" @click="moventEdit" src="../../assets/edictar.png" alt="" />
      <img class="eli" src="../../assets/eliminar.png" alt="" @click="remove" />
      <p :class="{ red: isNegative, green: !isNegative }">{{ amountCurrency }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, toRefs, ref } from "vue";
import { useRouter } from "vue-router";
import DelectModel from "../Modales/DelectModel.vue";

const router = useRouter();
const showDelect = ref(false);

function remove() {
  showDelect.value = true;
}

function modelEvet(arg) {
  showDelect.value = false;
}

const currencyFormater = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

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
  movementType: {
    type: String,
  },
  amount: {
    type: Number,
  },
});

const formatAmount = (value) => currencyFormater.format(value);

const { id, title, description, movementType, amount } = toRefs(props);

const amountCurrency = computed(() => {
  if (movementType.value === "Gasto") {
    return "-" + formatAmount(amount.value);
  } else {
    return formatAmount(amount.value);
  }
});

const isNegative = computed(() => {
  if (movementType.value === "Ingreso") {
    return false;
  } else {
    return true;
  }
});

function moventEdit() {
  router.push({ name: "editMovement", params: { id: id.value } });
}
</script>

<style lang="sass">
@import "../../sass/globalStyle.scss"
</style>
