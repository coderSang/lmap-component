<template>
  <div class="displayNone"></div>
</template>

<script>
  import { findMapObjEL } from '../util/index'
  export default {
    name: "DqytTileLayer",
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
      this.loadLayer()
    },
    methods:{
      loadLayer(){
        const mapNode = findMapObjEL(this.$parent)
        // 默认天地图
        if (this.url === '') {
          this.url = 'TianDiTu.Normal.Map'
        }
        // 如果在列表内，则用chinaLayer方法加载
        if (this.mapInherent.includes(this.url)) {
          let chinaLayer = L.tileLayer.chinaProvider(this.url)
          this.mapObj = chinaLayer.addTo(mapNode.mapObj)
        }
        else { // 自定义图层
          this.mapObj = L.tileLayer(this.url, this.options)
            .addTo(mapNode.mapObj);
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
