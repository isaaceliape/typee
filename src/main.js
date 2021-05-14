import 'es6-promise/auto'
import { createApp } from 'vue';
import VueHead from 'vue-head'
import App from './App.vue'
import AppStore from './store/AppStore.js'

const app = createApp(App)
window.store = AppStore
app.use(AppStore)
app.use(VueHead)
app.mount('#app')
