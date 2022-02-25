<template>
  <div
    v-show="show"
    :style="{width:width+'vw', height:height+'vh'}"
  >
    <slot v-if="ready"></slot>
  </div>
</template>

<script>
  export default {
    name: "DqytMap",
    props: {
      width: {
        type: Number,
        default: 100
      },
      height: {
        type: Number,
        default: 100
      },
      options: {
        type: Object,
        default: () =>({})
      },
      config: {
        type: Object,
        default: () => ({})
      },
      show: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        mapObj: null,
        ready: false,
        optionDefault: {
          center: [30.52, 119.98],
          zoom: 13,
          crs: L.CRS.EPSG3857,
          minZoom: 3,
          maxZoom: 18,
          layers: [],
        },
      }
    },
    mounted() {
      // 创建地图
      this.createMap()
    },
    methods: {
      createMap() {
        // 挂载
        this.mapObj = L.map(this.$el, {
          ...this.optionDefault,
          ...this.options,
        });
        // 渲染子组件
        this.ready = true
        // 挂载事件
        for(const key in this.config){
          if (this.config.hasOwnProperty(key)) {
            this.mapObj.on(key, this.config[key]);
          }
        }
        // dom未更新，发射leaflet:load
        this.$emit('leaflet:load');
        this.$nextTick(() => {
          // dom更新后，发射ready事件
          this.$emit('ready', this.mapObj);
        });
      },
    }
  }
</script>

<style scoped>

</style>
