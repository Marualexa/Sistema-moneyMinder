<template>
  <div class="login">
    <div>
      <img src="../../assets/logo-principal.png" alt="logo" />
      <h1>Bienvenido a MoneyMinder</h1>
      <p>Ingresa tus datos para disfrutar una maravillosa experiencia</p>
    </div>

    <form @submit.prevent="confirmData">
      <div class="mb-3">
        <label for="" class="form-label">Nombres</label>
        <input
          type="text"
          v-model="user.firstName"
          class="form-control"
          :class="{ 'is-invalid': hasError('firstName') }"
        />
        <div v-if="hasError('firstName')" class="invalid-feedback">
          {{ errorObject.errorMessage }}
        </div>
      </div>

      <div class="mb-3">
        <label for="" class="form-label">Apellidos</label>
        <input
          type="text"
          v-model="user.lastName"
          class="form-control"
          :class="{ 'is-invalid': hasError('lastName') }"
        />
        <div v-if="hasError('lastName')" class="invalid-feedback">
          {{ errorObject.errorMessage }}
        </div>
      </div>

      <div class="mb-3">
        <label for="" class="form-label">Email</label>
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
      </div>

      <div class="mb-3">
        <label for="" class="form-label">Contraseña</label>
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

      <div class="mb-3">
        <label for="" class="form-label">Re-enter Contraseña</label>
        <input
          type="password"
          v-model="user.passwordVerif"
          placeholder="*********"
          class="form-control"
          :class="{ 'is-invalid': hasError('passwordVerif') }"
        />
        <div v-if="hasError('passwordVerif')" class="invalid-feedback">
          {{ errorObject.errorMessage }}
        </div>
      </div>

      <button type="submit" class="btn btn-success">Confirmar</button>
    </form>
  </div>
</template>

<script setup>
import { Joi } from "vue-joi-validation";
import { reactive, computed } from "vue";
import { useRouter } from "vue-router";
import { useAsync } from "../../hooks/useAsync";

const { makeRequest } = useAsync();

const router = useRouter();

const user = reactive({
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  passwordVerif: "",
});

const errorObject = reactive({
  errorName: "",
  errorMessage: "",
});

const userJoi = {
  firstName: Joi.string()
    .min(2)
    .max(50)
    .required()
    .regex(/^[A-Za-z\s]+$/),
  lastName: Joi.string()
    .min(2)
    .max(50)
    .required()
    .regex(/^[A-Za-z\s]+$/),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  passwordVerif: Joi.ref("password"),
};

const hasError = computed(() => {
  return (property) => {
    return errorObject.errorName === property;
  };
});

function confirmData() {
  console.log("error")
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
      await makeRequest("users", {}, "POST", {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        passwordVerif: user.passwordVerif,
      });
      user.firstName = "";
      user.lastName = "";
      user.email = "";
      user.password = "";
      user.passwordVerif = "";
      router.push({ name: "login" });
      console.log('entra')
    }
  });
};
</script>

<style lang="sass">
@import "../../sass/globalStyle.scss"
</style>
