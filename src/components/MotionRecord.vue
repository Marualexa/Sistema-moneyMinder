<template>
  <div class="container">
    <div class="title-prin">
      <p>Nuevo movimiento</p>
      <img src="../assets/closet.svg" alt="" />
    </div>
    <form @submit.prevent="submit">
      <div class="mb-3">
        <label for="" class="form-label">Titulo</label>
        <input type="text" v-model="title" class="form-control" />
      </div>

      <div class="mb-3">
        <label for="" class="form-label">Monto</label>
        <input type="number" v-model="amount" class="form-control" />
      </div>

      <div class="mb-3">
        <label for="" class="form-label">Descripción</label>
        <textarea
          class="form-control"
          rows="3"
          v-model="description"
        ></textarea>
      </div>

      <div class="field">
        <label class="radio-label">
          <input type="radio" v-model="movementType" value="Ingreso" />
          <span>Ingreso</span>
        </label>
      </div>

      <div class="field">
        <label class="radio-label">
          <input type="radio" v-movel="movementType" value="Gasto" />
          <span>Gasto</span>
        </label>
      </div>
      <div class="action">
        <button @click="removeMovent">Agregar movimiento</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function removeMovent() {
  router.push({ name: "Home" });
}
</script>

<style lang="sass">
@import "../sass/globalStyle.scss"
</style>
