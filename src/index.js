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
import DqytLegend from "@/exterPlugin/DqytLegend"
import DqytVector from "@/components/DqytVector"
import DqytControlDraw from "@/components/DqytControlDraw"
import DqytBoundaryTileLayer from "@/components/DqytBoundaryTileLayer";

const install = (Vue) => {
  Vue.component(DqytMap.name, DqytMap);
  Vue.component(DqytTileLayer.name, DqytTileLayer);
}
// 组件有可能会通过script标签的方式引入
// <script src="dqyt-ui">
if (typeof window.Vue !== 'undefined') {
  install(Vue); // 全局直接通过script引用的方式会默认调用install方法注册组件
}
export default {
  install,
}
