<template>
  <div>
    <slot></slot>
  </div>
</template>
<script>
  import {findMapObjEL} from "@/util";

  export default {
    name: "DqytPopup",
    props: {
      data: {
        type: [Object, Array],
        default: () => [],
      },
      options: {
        type: Object,
        default: () => ({}),
      },
      config: {
        type: Object,
        default: () => ({}),
      },
    },
    mounted() {
      this.loadPopup();
    },
    methods: {
      loadPopup() {
        // 找到地图所在节点
        const mapNode = findMapObjEL(this.$parent)
        // 定义弹出层
        const popup = L.popup(this.options)
        // 弹出层的经纬度为自身上传或者父节点的
        if (this.data.length!==0 ||this.$parent.data.length!==0) {
          popup.setLatLng(this.data.length>0?this.data:this.$parent.data);
        }
        // option设置优先，slot中的为后，addTo可以加载多个
        this.mapObj = popup.setContent(this.options.content||this.$el||'')
        // 绑定到上级元素
        mapNode.mapObj.bindPopup(this.mapObj);
        // dom渲染完回调
        this.$nextTick(() => {
          this.$emit('ready', this.mapObj);
        });
      }
    },
    beforeDestroy() {
    },
  }
</script>

<style scoped>

</style>
