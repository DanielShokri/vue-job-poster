<template>
  <Navbar />
  <RouterView />
</template>
<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import {RouterView } from "vue-router";

</script>

<style scoped>
/* global styles here */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
