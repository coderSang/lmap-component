<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  import {findMapObjEL} from "@/util";

  export default {
    name: "DqytTooltip",
    props: {},
    mounted() {
      this.loadTooltip();
    },
    methods: {
      loadTooltip() {
        // 找到地图所在节点
        const mapNode = findMapObjEL(this.$parent)
        // 绑定到上级元素
        this.mapObj = L.tooltip(this.options)
        this.mapObj.setContent(this.content || this.$el || '');
        mapNode.mapObj.bindTooltip(this.mapObj);
        // dom渲染完回调
        this.$nextTick(() => {
          this.$emit('ready', this.mapObj);
        });
      }
    }

  }
</script>

<style scoped>

</style>
