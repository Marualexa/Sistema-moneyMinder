<template>
  <div class="movements">
    <h2 class="title">
      Hostorial Registrado <span><img src="../../assets/mas.png" alt="" /></span>
    </h2>
    <div class="content">
      <Operacion
        v-for="{ id, title, description, amount } in concMovement.result"
        :key="id"
        :id="id"
        :title="title"
        :description="description"
        :amount="amount"
        @remove="remove"
      />
      <button type="button" class="btn btn-info" @click="pageMas">Cargar +</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, onMounted, ref, reactive } from "vue";
import Operacion from "./OperationMoven.vue";
import { useAsync } from "../../hooks/useAsync";

const { result, makeRequest } = useAsync();
const page = ref("1");
const limit = ref("5");

const concMovement = reactive({
  result: [],
});

const movements = async () => {
  await makeRequest("moments", {
    _page: page.value,
    _limit: limit.value,
  });
  concMovement.result = [...result.value, ...concMovement.result];

  return result;
};

const pageMas = async () => {
  page.value++;
  await movements();
};

onMounted(() => {
  movements();
});

const props = defineProps({
  movements: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["remove"]);

const remove = (id) => {
  emit("remove", id);
};
</script>

<style lang="sass">
@import "../../sass/globalStyle.scss"
</style>
