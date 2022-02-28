<template>
  <div class="displayNone"></div>
</template>

<script>
  import { findMapObjEL } from '../util/index'
  export default {
    name: "DqytBoundaryTileLayer",
    props: {
      url: {
        type: String,
        default: ''
      },
      options: {
        type: Object,
        default: () => ({})
      }
    },
    mounted() {
      this.loadLayer()
    },
    methods:{
      loadLayer(){
        const mapNode = findMapObjEL(this.$parent)
        this.mapObj = L.TileLayer.boundaryCanvas(this.url, this.options).addTo(mapNode.mapObj);
        this.$nextTick(() => {
          this.$emit('ready', this.mapObj );
        });
      }
    }
  }
</script>

<style scoped>

</style>
