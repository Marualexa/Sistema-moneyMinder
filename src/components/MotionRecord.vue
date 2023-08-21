<template>
  <ModelAdd v-if="!isLoading && errorData" />
  <ModelError v-if="errorData && !isLoading" />
  <div class="container">
    <div class="title-prin">
      <p>Nuevo movimiento</p>
      <img @click="closet" src="../assets/closet.svg" alt="" />
    </div>

    <form @submit.prevent="createMovent">
      <div class="mb-3">
        <label for="" class="form-label">Titulo</label>
        <input
          type="text"
          v-model="registMovent.title"
          class="form-control"
          :class="{ 'is-invalid': hasError('title') }"
        />
        <div v-if="hasError('title')" class="invalid-feedback">
          {{ errorObject.errorMessage }}
        </div>
      </div>

      <div class="mb-3">
        <label for="" class="form-label">Monto</label>
        <input
          type="number"
          v-model="registMovent.amount"
          class="form-control"
          :class="{ 'is-invalid': hasError('amount') }"
        />
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
          :class="{ 'is-invalid': hasError('description') }"
        ></textarea>
        <div v-if="hasError('description')" class="invalid-feedback">
          {{ errorObject.errorMessage }}
        </div>
      </div>

      <div class="mb-3">
        <label for="" class="form-label">Categoria</label>
        <select v-model="registMovent.categoria" class="select-order" id="currency">
          <option v-for="option in options" :key="option.value" :value="option.value">
            {{ option.text }}
          </option>
        </select>
        <div v-if="hasError('categoria')" class="invalid-feedback">
          {{ errorObject.errorMessage }}
        </div>
      </div>

      <div class="mb-3">
        <label for="" class="form-label">Banco</label>
        <select v-model="registMovent.banco" class="select-order" id="currency">
          <option
            v-for="optionBank in optionsBanks"
            :key="optionBank.value"
            :value="optionBank.value"
          >
            {{ optionBank.text }}
          </option>
        </select>
        <div v-if="hasError('banco')" class="invalid-feedback">
          {{ errorObject.errorMessage }}
        </div>
      </div>

      <div class="field">
        <label class="radio-label">
          <input
            type="radio"
            v-model="registMovent.movementType"
            :class="{ 'is-invalid': hasError('movementType') }"
            value="Ingreso"
          />
          <span>Ingreso</span>
        </label>
        <div v-if="hasError('movementType')" class="invalid-feedback">
          {{ errorObject.errorMessage }}
        </div>
      </div>

      <div class="field">
        <label class="radio-label">
          <input
            type="radio"
            v-model="registMovent.movementType"
            :class="{ 'is-invalid': hasError('movementType') }"
            value="Gasto"
          />
          <span>Gasto</span>
        </label>
        <div v-if="hasError('movementType')" class="invalid-feedback">
          {{ errorObject.errorMessage }}
        </div>
      </div>
      <div class="action">
        <button>Agregar movimiento</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useAsync } from "../hooks/useAsync";
import { reactive, computed, ref, onMounted } from "vue";
import { Joi } from "vue-joi-validation";
import ModelAdd from "./Modales/LoadModel.vue";
import ModelError from "./Modales/ModelError.vue";

const router = useRouter();
const { result, makeRequest, isLoading, errorData } = useAsync();

const registMovent = reactive({
  title: "",
  amount: "",
  description: "",
  categoria: "",
  banco: "",
  movementType: "Ingreso",
});

onMounted(async () => {
  await makeRequest("category")
  console.log("result", result);
  options.value = result.value;
  await makeRequest("bank")
  optionsBanks.value = result.value;
});

const options = ref([]);

const optionsBanks = ref([]);

const errorObject = reactive({
  errorName: "",
  errorMessage: "",
});

const data = {
  title: Joi.string().required().max(25),
  amount: Joi.number().positive().precision(2).required(),
  description: Joi.string().required(),
  categoria: Joi.string().required(),
  banco: Joi.string().required(),
  movementType: Joi.string().valid("Ingreso", "Gasto").required(),
};

const hasError = computed(() => {
  return (property) => {
    return errorObject.errorName === property;
  };
});

function createMovent() {
  const resultForm = Joi.validate(registMovent, data, async (err, value) => {
    if (err) {
      let starForm = err.message;
      let starIndex = starForm.indexOf("[") + 1;
      let endIndex = starForm.indexOf("]");
      let element = starForm.substring(starIndex, endIndex);

      let cadena = element;

      const string = cadena.slice(1);
      const string2 = string.indexOf('"');
      const final = string.slice(0, string2);
      let messageIndix = string.slice(string2 + 1);

      errorObject.errorName = final;
      errorObject.errorMessage = final + " " + messageIndix;
      console.log("final", messageIndix);
      console.log("registMovent", registMovent);
    } else {
      isLoading.value = true;
      await makeRequest("movents", {}, "POST", {
        title: registMovent.title,
        amount: registMovent.amount,
        description: registMovent.description,
        categoria: registMovent.categoria,
        banco: registMovent.banco,
        movementType: registMovent.movementType,
      });
      registMovent.title = "";
      registMovent.amount = "";
      registMovent.description = "";
      registMovent.categoria = "";
      registMovent.banco = "";
      registMovent.movementType = "Ingreso";
      isLoading.value = false;
      router.push({ name: "ImportApp", params: { id: result.value.id } });
    }
  });
}

function closet() {
  router.push({ name: "ImportApp" });
}
</script>

<style lang="sass">
@import "../sass/globalStyle.scss"
</style>
