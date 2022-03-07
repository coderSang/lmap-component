<template>
  <div></div>
</template>

<script>
  import { findMapObjEL } from '../util/index'

  export default {
    name: "DqytControlSideBySide",
    props: {
      urls: {
        type: Object,
        default: ()=>({})
      },
      options: {
        type: Object,
        default: ()=>({})
      },
      configs: {
        type: Object,
        default: ()=>({
          config1: {},
          config2: {}
        })
      }
    },
    mounted() {
      this.addSideBySide();
    },
    methods: {
      addSideBySide() {
        const mapNode = findMapObjEL(this.$parent)
        const layer1 = L.tileLayer(this.urls.url1, this.options.options1).addTo(mapNode.mapObj);
        const layer2 = L.tileLayer(this.urls.url2, this.options.options2).addTo(mapNode.mapObj);
        this.mapObj = L.control.sideBySide(layer1, layer2).addTo(mapNode.mapObj);
        for(const key in this.configs.config1){
          if (this.configs.config1.hasOwnProperty(key)) {
            layer1.on(key, this.configs.config1[key]);
          }
        }
        for(const key in this.configs.config2){
          if (this.configs.config2.hasOwnProperty(key)) {
            layer2.on(key, this.configs.config2[key]);
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
