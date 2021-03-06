import Vue from "vue";

import * as L from 'leaflet'
import 'leaflet.chinatmsproviders'
import 'leaflet-draw'
import 'leaflet-boundary-canvas'
import 'leaflet-side-by-side'
import 'leaflet.markercluster'
import 'leaflet.heat'

import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import './style/common.css'
Vue.L = Vue.prototype.$L = L

import DqytMap from "@/components/DqytMap.vue"
import DqytTileLayer from "@/components/DqytTileLayer.vue"
import DqytWMSTileLayer from "@/components/DqytWMSTileLayer"
import DqytImageOverlay from "@/components/DqytImageOverlay"
import DqytVideoOverlay from "@/components/DqytVideoOverlay"
import DqytMarker from "@/components/DqytMarker"
import DqytMarkerCluster from '@/components/DqytMarkerCluster'
import DqytPopup from "@/components/DqytPopup"
import DqytTooltip from "@/components/DqytTooltip"
import DqytControl from "@/components/DqytControl"
import DqytControlZoom from "@/components/DqytControlZoom"
import DqytControlAttribution from "@/components/DqytControlAttribution"
import DqytControlScale from "@/components/DqytControlScale"
import DqytControlSideBySide from "@/components/DqytControlSideBySide"
import DqytControlMiniMap from "@/components/DqytControlMiniMap"
import DqytControlLegend from "@/components/DqytControlLegend"
import DqytVectorLayer from "@/components/DqytVectorLayer"
import DqytControlDraw from "@/components/DqytControlDraw"
import DqytBoundaryTileLayer from "@/components/DqytBoundaryTileLayer";
import DqytHeatLayer from "@/components/DqytHeatLayer";

const install = (Vue) => {
  Vue.component(DqytMap.name, DqytMap);
  Vue.component(DqytTileLayer.name, DqytTileLayer);
  Vue.component('dqyt-wms-tile-layer', DqytWMSTileLayer);
  Vue.component(DqytImageOverlay.name, DqytImageOverlay);
  Vue.component(DqytVideoOverlay.name, DqytVideoOverlay);
  Vue.component(DqytMarker.name, DqytMarker);
  Vue.component(DqytMarkerCluster.name, DqytMarkerCluster);
  Vue.component(DqytPopup.name, DqytPopup);
  Vue.component(DqytTooltip.name, DqytTooltip);
  Vue.component(DqytControl.name, DqytControl);
  Vue.component(DqytControlZoom.name, DqytControlZoom);
  Vue.component(DqytControlAttribution.name, DqytControlAttribution);
  Vue.component(DqytControlDraw.name, DqytControlDraw);
  Vue.component(DqytControlMiniMap.name, DqytControlMiniMap);
  Vue.component(DqytControlScale.name, DqytControlScale);
  Vue.component(DqytControlSideBySide.name, DqytControlSideBySide);
  Vue.component(DqytControlLegend.name, DqytControlLegend);
  Vue.component(DqytVectorLayer.name, DqytVectorLayer);
  Vue.component(DqytBoundaryTileLayer.name, DqytBoundaryTileLayer);
  Vue.component(DqytHeatLayer.name, DqytHeatLayer);
}
// ????????????????????????script?????????????????????
// <script src="dqyt-ui">
if (typeof window.Vue !== 'undefined') {
  install(Vue); // ??????????????????script??????????????????????????????install??????????????????
}
export default {
  install,
}
