<template>
  <div class="displayNone">
    <slot></slot>
  </div>
</template>

<script>
  import { findMapObjEL } from "../util/index"
  import Control from "@/mixin/Control"

  export default {
    name: "DqytControl",
    mixins: [Control],
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
      this.addControl()
    },
    methods: {
      addControl() {
        // 找到地图所在节点
        const mapNode = findMapObjEL(this.$parent)
        for (let key in this.options) {
          // 移除原有自带的control
          if (mapNode.mapObj[key + 'Control'] !== undefined) {
            mapNode.mapObj[key + 'Control'].remove();
          }
          if (this.options.hasOwnProperty(key)){
            L.control[key](this.options[key]).addTo(mapNode.mapObj)
          }
        }
        // 无发射事件
        // this.$nextTick(() => {
        //   this.$emit('ready', mapNode.mapObj);
        // });
      }
    }
  }
</script>

<style scoped>

</style>
