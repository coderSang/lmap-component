<template>
  <div></div>
</template>

<script>
  import { findMapObjEL } from '../util/index'

  export default {
    name: "DqytControlDraw",
    props: {
      options: {
        type: Object,
        default: () => ({})
      },
      config: {
        type: Object,
        default: () => ({})
      }
    },
    mounted() {
      this.controlAdd()
    },
    methods: {
      controlAdd(){
        const mapNode = findMapObjEL(this.$parent)
        const editableLayers = new L.FeatureGroup();
        mapNode.mapObj.addLayer(editableLayers);
        const drawControl = new L.Control.Draw({
          edit: {
            featureGroup: editableLayers
          },
          ...this.options,
        });
        this.mapObj = drawControl.addTo(mapNode.mapObj);
        let ctx = this
        mapNode.mapObj.on(L.Draw.Event.CREATED, function (event) {
          const layer = event.layer;
          editableLayers.addLayer(layer);
          if (ctx.config.created) {
            ctx.config.created(event.layer)
          }
        });
        for(const key in this.config){
          if (this.config.hasOwnProperty(key) && key!=='created') {
            this.mapObj.on(key, this.config[key]);
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
