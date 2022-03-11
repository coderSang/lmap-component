<template>
  <div class="displayNone"></div>
</template>

<script>
  import {findMapObjEL} from "@/util";

  export default {
    name: "DqytHeatLayer",
    props: {
      data: {
        type: Array,
        default: () => ([])
      },
      options: {
        type: Object,
        default: ()=>({})
      }
    },
    mounted() {
      this.addHeat()
    },
    methods: {
      addHeat(){
        const mapNode = findMapObjEL(this.$parent)
        this.mapObj = L.heatLayer(
          this.data, ).addTo(mapNode.mapObj);
      }
    }
  }
</script>

<style scoped>

</style>
