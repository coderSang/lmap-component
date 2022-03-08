import Vue from 'vue'
import App from './App.vue'

import DqytMapComponent from './index.js';
Vue.config.productionTip = false
Vue.use(DqytMapComponent);
new Vue({
  render: h => h(App),
}).$mount('#app')
