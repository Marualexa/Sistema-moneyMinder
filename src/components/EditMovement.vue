<template>
  <div class="container">
    <div class="title-prin">
      <p>Editar movimiento</p>
      <img @click="closet" src="../assets/closet.svg" alt="" />
    </div>
    <form @submit.prevent="editMovent">
      <div class="mb-3">
        <label for="" class="form-label">Titulo</label>
        <input type="text" v-model="registMovent.title" class="form-control" />
        <div v-if="hasError('title')" class="invalid-feedback">
          {{ errorObject.errorMessage }}
        </div>
      </div>

      <div class="mb-3">
        <label for="" class="form-label">Monto</label>
        <input type="number" v-model="registMovent.amount" class="form-control" />
        <div v-if="hasError('amount')" class="invalid-feedback">
          {{ errorObject.errorMessage }}
        </div>
      </div>

      <div class="mb-3">
        <label for="" class="form-label">Descripción</label>
        <textarea
          class="form-control"
          rows="3"
          v-model="registMovent.description"
        ></textarea>
        <div v-if="hasError('description')" class="invalid-feedback">
          {{ errorObject.errorMessage }}
        </div>
      </div>

      <div class="field">
        <label class="radio-label">
          <input type="radio" v-model="registMovent.movementType" value="Ingreso" />
          <span>Ingreso</span>
        </label>
        <div v-if="hasError('movementType')" class="invalid-feedback">
          {{ errorObject.errorMessage }}
        </div>
      </div>

      <div class="field">
        <label class="radio-label">
          <input type="radio" v-model="registMovent.movementType" value="Gasto" />
          <span>Gasto</span>
        </label>
        <div v-if="hasError('movementType')" class="invalid-feedback">
          {{ errorObject.errorMessage }}
        </div>
      </div>
      <div class="action">
        <button>Guardar cambio</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useAsync } from "../hooks/useAsync";
import { reactive, onMounted, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Joi } from "vue-joi-validation";

const router = useRouter();
const { result, makeRequest } = useAsync();

const registMovent = reactive({
  title: "",
  amount: "",
  description: "",
  movementType: "",
});

const errorObject = reactive({
  errorName: "",
  errorMessage: "",
});

const data = {
  title: Joi.string().required().max(5),
  amount: Joi.number().positive().precision(2).required(),
  description: Joi.string().required(),
  movementType: Joi.string().valid("Ingreso", "Gasto").required(),
};

function closet() {
  router.push({ name: "ImportApp" });
}
</script>

<style lang="sass">
@import "../sass/globalStyle.scss"
</style>
