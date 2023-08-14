<template>
  <section class="modal-style">
    <div class="modal__container">
      <h2>Deseas eliminar este movimiento del registro</h2>
      <div class="button-container">
        <button @click="deletePost" type="button" class="btn btn-success">Si</button>
        <button @click="closetModall" type="button" class="btn btn-danger">No</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useAsync } from "../../hooks/useAsync";
import { defineEmits, defineProps, toRefs, inject } from "vue";
import { useRouter } from "vue-router";

const { makeRequest } = useAsync();
const { movements } = inject("restart");

const props = defineProps({
  id: {
    type: Number,
  },
});
const { id } = toRefs(props);

const emit = defineEmits(["closetModal"]);

function closetModall() {
  emit("closetModal");
}

async function deletePost() {
    await makeRequest(`moments/${id.value}`, {}, "delete")
    movements(true);
}
</script>
