<template>
  <div id="app">
    <AppMenu />
    <TextRenderer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TextRenderer from "./components/TextRenderer.vue";
import AppMenu from "./components/AppMenu.vue";

export default defineComponent({
  name: "App",
  components: {
    AppMenu,
    TextRenderer,
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
