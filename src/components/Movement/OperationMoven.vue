<template>
  <div class="movement">
    <div class="content">
      <h4>{{ title }}</h4>
      <p>{{ description }}</p>
    </div>
    <div class="action">
      <img class="edi" src="../../assets/edictar.png" alt="" />
      <img class="eli" src="../../assets/eliminar.png" alt="" @click="remove" />
      <p :class="{ red: isNegative, green: !isNegative }">{{ amount }}</p>
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
    type: String,
  },
});

const { id, title, description, amount } = toRefs(props);

const emit = defineEmits(["remove"]);

const remove = () => {
  emit("remove", id.value);
};

const isNegative = computed(() => amount.value < 0);
</script>

<style lang="sass">
@import "../../sass/globalStyle.scss"
</style>
