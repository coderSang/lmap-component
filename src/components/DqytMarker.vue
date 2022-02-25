<template>
  <div class="displayNone">
    <slot v-if="ready"></slot>
  </div>
</template>
<script>
  import { findMapObjEL } from '../util/index'

  export default {
    name: "LeafletMarker",
    props: {
      data: {
        type: [Array, Object],
        default: () => ([])
      },
      options: {
        type: Object,
        default: () =>({})
      },
      config: {
        type: Object,
        default: () =>({})
      },
    },
    data() {
      return {
        ready: false,
      }
    },
    mounted() {
      this.addMarker()
    },
    methods: {
      addMarker() {
        // 找到地图所在节点
        const mapNode = findMapObjEL(this.$parent)
        this.ready = true
        // 默认的标记点图标
        const iconDefault = {
          iconUrl: require("@/assets/images/markerIconDefault.png"),
          iconSize: [38, 38],
          iconAnchor: [22, 38],
        }
        // marker传入
        if(this.data.constructor=== Object) {
          //{ lat: Float||String, lng: Float||String, lat: Object }
          const iconGroup = L.icon({
            ...iconDefault,
            ...this.options.icon,
            ...this.data.icon,
          });
          this.mapObj = L.marker(this.data, {
            ...this.options,
            icon: iconGroup,
          }).addTo(mapNode.mapObj);
          for(const key in this.config){
            if (this.config.hasOwnProperty(key)) {
              this.mapObj.on(key, this.config[key]);
            }
          }
        }
        else if (this.data.length === 0) {
          //  数组为空
        }
        else if (this.data[0].constructor=== String || this.data[0].constructor === Number){
          // [lat, lng],
          const iconGroup = L.icon({
            ...iconDefault,
            ...this.options.icon
          });
          this.mapObj = L.marker(this.data, {
            ...this.options,
            icon: iconGroup}).addTo(mapNode.mapObj);
          for(const key in this.config){
            if (this.config.hasOwnProperty(key)) {
              this.mapObj.on(key, this.config[key]);
            }
          }
        }
        else if (this.data[0].constructor === Array){
          // [[lat, lng], [lat, lng], [lat, lng]]
          // 涉及到多个点，用layerGroup包裹所有marker返回传出去
          // icon样式
          const iconGroup = L.icon({
            ...iconDefault,
            ...this.options.icon
          });
          // 保存所有markers
          const markers = [];
          this.data.forEach(item => {
            const marker = L.marker(item, {
              ...this.options,
              icon: iconGroup
            });
            for(const key in this.config){
              if (this.config.hasOwnProperty(key)) {
                marker.on(key, this.config[key]);
              }
            }
            markers.push(marker)
          })
          this.mapObj = L.layerGroup(markers)
            .addTo(mapNode.mapObj);
        }
        else if (this.data[0].constructor === Object){
          // [{ lat: Float||String, lng: Float||String, lat: Object },{ lat: Float||String, lng: Float||String, lat: Object }]
          const markers = []
          this.data.forEach(item => {
            const marker = L.marker(item, {
              ...this.options,
              icon: L.icon({
                ...iconDefault,
                ...this.options.icon,
                ...item.icon,
              })
            });
            for(const key in this.config){
              if (this.config.hasOwnProperty(key)) {
                marker.on(key, this.config[key]);
              }
            }
            markers.push(marker)
          })
          this.mapObj = L.layerGroup(markers)
            .addTo(mapNode.mapObj);
        }
        else {
        }
        this.$nextTick(() => {
          this.$emit('ready', this.mapObj);
        });
      }
    },
  }
</script>

<style scoped>

</style>
