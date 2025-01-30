<template>
  <router-view />
</template>

<script setup>
import { useGlobal } from "stores/global";

const global = useGlobal();

defineOptions({
  name: "App",
});
</script>

<style lang="scss"></style>
