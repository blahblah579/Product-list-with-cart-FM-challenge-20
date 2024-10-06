<template>
  <v-app>
    <v-main class="main">
      <HomePage />
    </v-main>
  </v-app>
</template>

<script setup>
import HomePage from "./components/HomePage.vue";
</script>

<style scoped>
.main {
  background-color: hsl(26, 54%, 97%);
}
</style>