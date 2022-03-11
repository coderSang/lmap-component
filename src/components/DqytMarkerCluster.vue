<template>
  <div class="displayNone"></div>
</template>

<script>
  import { findMapObjEL } from '../util/index'
  export default {
    name: "DqytMarkerCluster",
    props: {
      data: {
        type: Array,
        default: ()=>([])
      },
      options: {
        type: Object,
        default: ()=>({})
      },
      config: {
        type: Object,
        default: ()=>({})
      },
    },
    mounted() {
      this.addMarkerCluster();
    },
    methods: {
      getRandomLatLng(map) {
        let bounds = map.getBounds(),
        southWest = bounds.getSouthWest(),
        northEast = bounds.getNorthEast(),
        lngSpan = northEast.lng - southWest.lng,
        latSpan = northEast.lat - southWest.lat;
        return [southWest.lat + latSpan * Math.random(),
        southWest.lng + lngSpan * Math.random()]
      },
      addMarkerCluster() {
        const mapNode = findMapObjEL(this.$parent)
        const markers = L.markerClusterGroup();
        const iconDefault = {
          iconUrl: require("@/assets/images/markerIconDefault.png"),
          iconSize: [38, 38],
          iconAnchor: [22, 38],
        }
        for (let i = 0 ; i < this.data.length; i++){
          let iconGroup = null
          if (this.data[i].constructor=== Object) {
          //  [{},{},{}]
            iconGroup = L.icon({
              ...iconDefault,
              ...this.options.icon,
              ...this.data[i].icon,
            });
          } else{
            iconGroup = L.icon({
              ...iconDefault,
              ...this.options.icon,
            });
          }
          const marker = L.marker(this.data[i], {icon: iconGroup,})
          markers.addLayer(marker);
          for(const key in this.config){
            if (this.config.hasOwnProperty(key)) {
              marker.on(key, this.config[key]);
            }
          }
        }
        this.mapObj = markers.addTo(mapNode.mapObj);
        this.$nextTick(() => {
          this.$emit('ready', this.mapObj);
        });
      }
    }
  }
</script>

<style scoped>

</style>
