<template>
    <div>
    <Suspense>
      <template #default>
          <HomeMain />
      </template>
      <template #fallback>
        <StartingMode />
      </template>
    </Suspense>
  </div>
</template>

<script setup>
import StartingMode from "./StartingMode.vue";
import { defineAsyncComponent } from "vue";

const HomeMain = defineAsyncComponent(() =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(import("./HomeMain.vue"));
      }, 2500);
    })
);
</script>
