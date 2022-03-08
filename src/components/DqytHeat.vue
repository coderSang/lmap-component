<template>
  <div class="displayNone"></div>
</template>

<script>
  import {findMapObjEL} from "@/util";

  export default {
    name: "DqytHeat",
    props: {

    },
    mounted() {
      this.addHeat()
    },
    methods: {
      addHeat(){
        const mapNode = findMapObjEL(this.$parent)
        const heat = L.heatLayer([
          [30.52, 119.98, 1.2], // lat, lng, intensity
          [30.52, 119.99, 11.5],
        ], {radius: 25}).addTo(mapNode.mapObj);
      }
    }
  }
</script>

<style scoped>

</style>
