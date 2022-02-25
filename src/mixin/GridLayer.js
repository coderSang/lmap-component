import Layer from "@/mixin/Layer";

export default {
  mixins: [Layer],
  props: {
    pane:{
      type: String,
      default: 'tilePane'
    },
    zIndex:{
      type: Number,
      default: 1
    }
  }
}
