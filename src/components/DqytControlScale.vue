<template>
  <div class="displayNone">
    <slot></slot>
  </div>
</template>

<script>
  import { findMapObjEL } from "../util/index"

  export default {
    name: "DqytControlScale",
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
      this.addScaleControl()
    },
    methods: {
      addScaleControl() {
        // 找到地图所在节点
        const mapNode = findMapObjEL(this.$parent)
        if (mapNode.mapObj['scaleControl'] !== undefined) {
          mapNode.mapObj['scaleControl'].remove();
        }
        this.mapObj = L.control.scale(this.options).addTo(mapNode.mapObj)
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
