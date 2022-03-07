import Vue from 'vue'
import App from './App.vue'
import * as L from 'leaflet'
import 'leaflet.chinatmsproviders'
import 'leaflet-draw'
import 'leaflet-boundary-canvas'
import 'leaflet-side-by-side'
import 'leaflet.markercluster'

import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import './style/common.css'


Vue.config.productionTip = false

Vue.L = Vue.prototype.$L = L
new Vue({
  render: h => h(App),
}).$mount('#app')
