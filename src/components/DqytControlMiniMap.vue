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
        default: 'GaoDe.Normal.Map'
      },
      options: {
        type: Object,
        default: ()=>({})
      }
    },
    data() {
      return {
        mapInherent:[
          'TianDiTu.Normal.Map',
          'TianDiTu.Normal.Annotion',
          'TianDiTu.Satellite.Map',
          'TianDiTu.Satellite.Annotion',
          'TianDiTu.Terrain.Map',
          'TianDiTu.Terrain.Annotion',
          'GaoDe.Normal.Map',
          'GaoDe.Satellite.Map',
          'GaoDe.Satellite.Annotion',
          'OSM.Normal.Map',
          'Baidu.Normal.Map',
          'Baidu.Satellite.Map',
          'Baidu.Satellite.Annotion'
        ],
      }
    },
    mounted() {
      this.addMiniMap()
    },
    methods: {
      addMiniMap(){
        const mapNode = findMapObjEL(this.$parent)
        if (this.mapInherent.includes(this.url)) {
          let chinaLayer = L.tileLayer.chinaProvider(this.url, this.options)
          this.mapObj = new L.control.MiniMap(chinaLayer, this.options).addTo(mapNode.mapObj);
        }
        else {
          const tileLayer = new L.TileLayer(this.url);
          this.mapObj = new L.control.MiniMap(tileLayer, this.options).addTo(mapNode.mapObj);
        }
        this.$nextTick(() => {
          this.$emit('ready', this.mapObj );
        });
      }
    }
  }
</script>

<style scoped>

</style>
