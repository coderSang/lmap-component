// Layer基类

export default {
  props: {
    // pane是用来更改图层顺序的
    pane: {
      type: String,
      default: 'overlayPane'
    },
    attribution: {
      type: String,
      default: null
    }
  },
  mounted() {
    // // 设置图层默认层级为0，若不设置则将按照加载顺序排列
    // this.mapObj.getPane('overlayPane').style.zIndex = '0'
    // 设置选项
    this.layerOptions = {
      attribution: this.attribution,
      pane: this.pane,
    };
  },
  beforeDestroy() {
    // 图层销毁之前需要去除绑定
    this.unbindTooltipAPopup();
  },
  methods: {
    // 设置层级
    setPaneZIndex(layerName, zIndex){
      this.mapObj.getPane(layerName).style.zIndex = zIndex
    },
    // 获取层级
    getPaneZIndex(layerName){
     return this.mapObj.getPane(layerName).style.zIndex
    },
    unbindTooltipAPopup() {
      // this.mapObj.getTooltip() 返回绑定到该层的tooltip
      const tooltip = this.mapObj ? this.mapObj.getTooltip() : null;
      const popup = this.mapObj ? this.mapObj.getPopup() : null;
      // 删除图层之前去除tooltip和popUp
      if (tooltip) {
        tooltip.unbindTooltip();
      }
      if (popup) {
        popup.unbindPopup();
      }
    }
  }
}
