// 动态图层设置，一般不改
export default {
  props: {
    // 如果false，该层将不会发出鼠标事件，并将充当底层地图的一部分。
    interactive: {
      type: Boolean,
      default: true
    },
    // 图层鼠标事件将冒泡到地图上，通过 L.DomEvent.stopPropagation阻止
    bubblingMouseEvents: {
      type: Boolean,
      default: true
    }
  },
  mounted () {
    this.interactiveLayerOptions = {
      interactive: this.interactive,
      bubblingMouseEvents: this.bubblingMouseEvents
    };
  }
};
