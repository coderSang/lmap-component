<template>
  <div class="displayNone"></div>
</template>

<script>
  import {findMapObjEL} from "@/util";

  export default {
    name: "DqytVector",
    props: {
      options: {
        type: Object,
        default: () =>({})
      },
      config: {
        type: Object,
        default: () =>({})
      },
      data: {
        type: Array,
        default: []
      }
    },
    mounted() {
      this.addVector()
    },
    methods: {
      addVector() {
        const mapNode = findMapObjEL(this.$parent)
        // 矢量图形
        this.mapObj = L[this.options.type](this.data, {...this.options}).addTo(mapNode.mapObj);
        for(const key in this.config){
          if (this.config.hasOwnProperty(key)) {
            this.mapObj.on(key, this.config[key]);
          }
        }
        if (this.options.fitBounds) {
          mapNode.mapObj.fitBounds(this.mapObj.getBounds());
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
