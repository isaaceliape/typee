import 'es6-promise/auto'
import { createApp } from 'vue';
import { createStore } from 'vuex'
import VueHead from 'vue-head'
// import createPersistedState from "vuex-persistedstate";
import App from './App.vue'
import store from './Store.js'

const appAstore = new createStore(store);
const app = createApp(App)

app.use(appAstore)
app.use(VueHead)
app.mount('#app')
