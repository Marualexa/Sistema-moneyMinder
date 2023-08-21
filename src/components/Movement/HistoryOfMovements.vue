<template>
  <div class="movements">
    <h2 class="title">
      Hostorial Registrado
      <span><img @click="newMovil" src="../../assets/mas.png" alt="" /></span>
    </h2>
    <div class="content">
      <Operacion
        v-for="{ id, title, description, amount, movementType, banco } in concMovement.result"
        :key="id"
        :id="id"
        :title="title"
        :description="description"
        :movementType="movementType"
        :amount="amount"
        :banco="banco"
      />
      <LoadModel v-if="errorData && !isLoading" />
      <ModelError v-if="!errorData && isLoading" />
      <button type="button" class="btn button btn-info" @click="pageMas">Cargar +</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref, reactive, provide, watch } from "vue";
import Operacion from "./OperationMoven.vue";
import { useAsync } from "../../hooks/useAsync";
import { useRouter } from "vue-router";
import LoadModel from "../Modales/LoadModel.vue";
import ModelError from "../Modales/ModelError.vue";
import { useCartStore } from "../../store/cartContainer";

const router = useRouter();
const { result, makeRequest, isLoading, errorData } = useAsync();
const page = ref("1");
const limit = ref("5");
const store = useCartStore();

watch(
  () => store.getMovements,
  (val) => {
    if (val == true) {
      movements(true);
    }
    store.addInputMovents(false);
  },
  { deep: true }
);

const concMovement = reactive({
  result: [],
});

const movements = async (reload = false) => {
  console.log("filtros", store.getFilterMov);
  const { nameMov, date, money, order } = store.getFilterMov;
  await makeRequest("movents", {
    _page: page.value,
    _limit: limit.value,
    _nameMov: nameMov,
    _date: date,
    _money: money,
    _order: order,
  });

  if (!reload) {
    concMovement.result = [...concMovement.result, ...result.value];
  } else {
    concMovement.result = [...[], ...result.value];
  }

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

function newMovil() {
  router.push({ name: "MotionRecord" });
}

provide("restart", {
  movements,
});
</script>

<style lang="sass">
@import "../../sass/globalStyle.scss"
</style>
