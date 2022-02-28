import Vue from 'vue'
import App from './App.vue'
import * as L from 'leaflet'
import 'leaflet.chinatmsproviders'
import 'leaflet-draw'
import 'leaflet-boundary-canvas'

import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import './style/common.css'

Vue.config.productionTip = false

Vue.L = Vue.prototype.$L = L
new Vue({
  render: h => h(App),
}).$mount('#app')
