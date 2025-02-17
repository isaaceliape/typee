import "es6-promise/auto";
import { createApp } from "vue";
import VueHead from "vue-head";
import App from "./App.vue";
import "./registerServiceWorker";
import AppStore from "./store/AppStore";

const app = createApp(App);
app.use(AppStore);
app.use(VueHead);
app.mount("#app");
