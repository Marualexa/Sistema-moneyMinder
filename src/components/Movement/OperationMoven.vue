<template>
  <div class="movement">
    <div class="content">
      <h4>{{ title }}</h4>
      <p>{{ description }}</p>
    </div>
    <div class="action">
      <img class="edi" @click="moventEdit" src="../../assets/edictar.png" alt="" />
      <img class="eli" src="../../assets/eliminar.png" alt="" @click="remove" />
      <p :class="{ red: isNegative, green: !isNegative }">{{ amountCurrency }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits, toRefs } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();


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
  amount: {
    type: Number,
  },
});

const { id, title, description, amount } = toRefs(props);

const amountCurrency = computed(() => currencyFormater.format(amount.value));

const emit = defineEmits(["remove"]);

const remove = () => {
  emit("remove", id.value);
};

const isNegative = computed(() => amount.value < 0);

function moventEdit() {
  router.push({ name: "editMovement", params: { id: id.value } });
}
</script>

<style lang="sass">
@import "../../sass/globalStyle.scss"
</style>
