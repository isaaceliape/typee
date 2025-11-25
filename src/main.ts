import 'es6-promise/auto'
import { createApp } from 'vue'
import type { App as VueApp } from 'vue'
import { createPinia } from 'pinia'
import VueHead from 'vue-head'
import App from './App.vue'

const app: VueApp = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(VueHead)
app.mount('#app')
