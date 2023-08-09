<template>
  <div class="container">
    <div class="title-prin">
      <p>Editar movimiento</p>
      <img @click="closet" src="../assets/closet.svg" alt="" />
    </div>
    <form @submit.prevent="editMovent">
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
        <button>Guardar cambio</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { useAsync } from "../hooks/useAsync";
import { reactive, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Joi } from "vue-joi-validation";

const router = useRouter();
const route = useRoute();
const { id } = route.params;
const { result, makeRequest } = useAsync();

const registMovent = reactive({
  title: "",
  amount: "",
  description: "",
  movementType: "Ingreso",
});

const errorObject = reactive({
  errorName: "",
  errorMessage: "",
});

const data = {
  title: Joi.string().required().max(25),
  amount: Joi.number().positive().precision(2).required(),
  description: Joi.string().required(),
  movementType: Joi.string().valid("Ingreso", "Gasto").required(),
};

onMounted(async () => {
  await makeRequest(`moments/${id}`);
  registMovent.title = result.value.title;
  registMovent.amount = result.value.amount;
  registMovent.description = result.value.description;
  registMovent.movementType = result.value.movementType;
});

const hasError = computed(() => {
  return (property) => {
    return errorObject.errorName === property;
  };
});

function editMovent() {
  const resultEdit = Joi.validate(registMovent, data, async (err, value) => {
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

      errorObject.errorMessage = final;
      errorObject.errorMessage = final + " " + messageIndix;
    } else {
      await makeRequest(`moments/${id}`, {}, "put", {
        title: registMovent.title,
        amount: registMovent.amount,
        description: registMovent.description,
        movementType: registMovent.movementType,
      });
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
