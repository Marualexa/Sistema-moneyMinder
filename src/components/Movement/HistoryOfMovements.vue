<template>
  <div class="movements">
    <h2 class="title">Hostorial Registrado</h2>
    <div class="content">
      <Operacion
        v-for="{ id, title, description, amount } in movements"
        :key="id"
        :id="id"
        :title="title"
        :description="description"
        :amount="amount"
        @remove="remove"
      />
    </div>
  </div>
</template>

<script setup>
import { toRefs, defineProps, defineEmits } from "vue";
import Operacion from "./OperationMoven.vue";

const props = defineProps({
  movements: {
    type: Array,
    default: () => [],
  },
});

const movements = [
  {
    title: ["Ingreso de mes"],
    description: ["Sueldo del mes de agosto"],
    amount: "10.000,00",
  },
];

const emit = defineEmits(["remove"]);

const remove = (id) => {
  emit("remove", id);
};
</script>

<style lang="sass">
@import "../../sass/globalStyle.scss"
</style>
