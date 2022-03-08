<template>
  <div class="displayNone"></div>
</template>

<script>
  import { findMapObjEL } from '../util/index'
  import { MiniMap } from 'leaflet-control-mini-map'
  L.control.MiniMap = function (TileLayer, options) {
    return new MiniMap(TileLayer, options)
  }
  export default {
    name: "DqytControlMiniMap",
    props: {
      url: {
        type: String,
        default: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      },
      options: {
        type: Object,
        default: ()=>({})
      }
    },
    mounted() {
      this.addMiniMap()
    },
    methods: {
      addMiniMap(){
        const mapNode = findMapObjEL(this.$parent)
        const tileLayer = new L.TileLayer(this.url);
        this.mapObj = new  L.control.MiniMap(tileLayer, this.options).addTo(mapNode.mapObj);
        this.$nextTick(() => {
          this.$emit('ready', this.mapObj );
        });
      }
    }
  }
</script>

<style scoped>

</style>
