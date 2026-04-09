import { createApp } from "vue";
import { createHead } from "@vueuse/head";
import App from "./App.vue";
import "./registerServiceWorker";
import AppStore from "./store/AppStore";

const app = createApp(App);
app.use(AppStore);
app.use(createHead());
app.mount("#app");
