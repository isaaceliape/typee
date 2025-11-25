import 'es6-promise/auto'
import { createApp } from 'vue'
import type { App as VueApp } from 'vue'
import VueHead from 'vue-head'
import App from './App.vue'
import AppStore from './store/AppStore'

declare global {
  interface Window {
    store: typeof AppStore
  }
}

const app: VueApp = createApp(App)
window.store = AppStore
app.use(AppStore)
app.use(VueHead)
app.mount('#app')
