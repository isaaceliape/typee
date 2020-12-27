import Vue from 'vue'
import Vuex from 'vuex'
import VueHead from 'vue-head'
// import createPersistedState from "vuex-persistedstate";

import App from './App.vue'
import store from './Store.js'

Vue.use(VueHead)
Vue.use(Vuex)
const app = new Vuex.Store({
  ...store,
});
// const app = new Vuex.Store({
//   ...store,
//   plugins: [createPersistedState()],
// });
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store: app,
}).$mount('#app')
