<template>
  <div class="movements">
    <h2 class="title">
      Hostorial Registrado
      <span><img @click="newMovil" src="../../assets/mas.png" alt="" /></span>
    </h2>
    <div class="content">
      <Operacion
        v-for="{ id, title, description, amount, movementType } in concMovement.result"
        :key="id"
        :id="id"
        :title="title"
        :description="description"
        :movementType="movementType"
        :amount="amount"
      />
      <button type="button" class="btn btn-info" @click="pageMas">Cargar +</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref, reactive } from "vue";
import Operacion from "./OperationMoven.vue";
import { useAsync } from "../../hooks/useAsync";
import { useRouter } from "vue-router";

const router = useRouter();
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
  concMovement.result = [...concMovement.result, ...result.value];

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
</script>

<style lang="sass">
@import "../../sass/globalStyle.scss"
</style>
