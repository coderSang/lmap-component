<template>
  <div class="displayNone"></div>
</template>

<script>
  import { findMapObjEL } from '../util/index'
  export default {
    name: "DqytImageOverlay",
    props: {
      url: {
        type: String,
        default: ''
      },
      options: {
        type: Object,
        default: () => ({})
      },
    },
    mounted() {
      this.loadLayer()
    },
    methods:{
      loadLayer(){
        const mapNode = findMapObjEL(this.$parent)
        if (this.url === '') {
          return
        }
        this.mapObj = L.imageOverlay(this.url, this.options.imageBounds, this.options).addTo(mapNode.mapObj);
        this.$nextTick(() => {
          this.$emit('ready', this.mapObj);
        });
      }
    }
  }
</script>

<style scoped>

</style>
