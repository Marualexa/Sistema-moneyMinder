<template>
  <div class="login">
    <div>
      <img src="../../assets/logo-principal.png" alt="logo" />
      <h1>Bienvenido a MoneyMinder</h1>
    </div>

    <form @submit.prevent="loginAdd">
      <div class="mb-3">
        <label for="email">Email</label>
        <input
          type="text"
          v-model="user.email"
          class="form-control"
          placeholder="email.23@gmail.com"
          :class="{ 'is-invalid': hasError('email') }"
        />
        <div v-if="hasError('email')" class="invalid-feedback">
          {{ errorObject.errorMessage }}
        </div>

        <div class="mb-3">
          <label for="password">Contraseña</label>
          <input
            type="password"
            v-model="user.password"
            placeholder="*********"
            class="form-control"
            :class="{ 'is-invalid': hasError('password') }"
          />
          <div v-if="hasError('password')" class="invalid-feedback">
            {{ errorObject.errorMessage }}
          </div>
        </div>

        <button type="submit" class="btn btn-success">Entrar</button>

        <a href="/">Forgot my password</a>
      </div>
    </form>

    <button type="button" @click="registMain" class="btn btn-secondary">
      Registrarme
    </button>
  </div>
</template>

//
<script setup>
import { Joi } from "vue-joi-validation";
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useAsync } from "../../hooks/useAsync";

const { makeRequest, result } = useAsync();
const router = useRouter();

const user = reactive({
  email: "",
  password: "",
});

const errorObject = reactive({
  errorName: "",
  errorMessage: "",
});

const userJoi = {
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
};

const hasError = computed(() => {
  return (property) => {
    return errorObject.errorName === property;
  };
});

function loginAdd() {
  const resultFrom = Joi.validate(user, userJoi, async (err, value) => {
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
    } else {
      await makeRequest("users", {
        email: result.email,
        password: result.password,
      });
      // router.push({ name: "ImportApp" });
    }
  });
};

function registMain() {
  router.push({ name: "register" });
}
</script>

<style lang="sass">
@import "../../sass/globalStyle.scss"
</style>
