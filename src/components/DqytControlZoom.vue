<template>
  <div class="displayNone">
    <slot></slot>
  </div>
</template>

<script>
  import { findMapObjEL } from "../util/index"

  export default {
    name: "DqytControlZoom",
    props: {
      options: {
        type: Object,
        default: () =>({})
      },
      config: {
        type: Object,
        default: () =>({})
      },
    },
    mounted() {
      this.addZoomControl()
    },
    methods: {
      addZoomControl() {
        // 找到地图所在节点
        const mapNode = findMapObjEL(this.$parent)
        if (mapNode.mapObj['zoomControl'] !== undefined) {
          mapNode.mapObj['zoomControl'].remove();
        }
        this.mapObj = L.control.zoom(this.options).addTo(mapNode.mapObj)
        for(const key in this.config){
          if (this.config.hasOwnProperty(key)) {
            this.mapObj.on(key, this.config[key]);
          }
        }
        this.$nextTick(() => {
          this.$emit('ready', this.mapObj);
        });
      }
    }
  }
</script>

<style scoped>

</style>
