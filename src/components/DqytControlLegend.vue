<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  import {findMapObjEL} from "@/util";

  export default {
    name: "DqytControlLegend",
    props: {
      options: {
        type: Object,
        default: () =>({})
      },
      config: {
        type: Object,
        default: () =>({})
      },
    },
    mounted() {
      this.init()
      this.addLegend();
    },
    methods: {
      init(){
        class LegendSymbol {
          constructor(control, container, legend) {
            this._control = control;
            this._container = container;
            this._legend = legend;
            this._width = this._control.options.symbolWidth;
            this._height = this._control.options.symbolHeight;
          }
        }
        class ImageSymbol extends LegendSymbol {
          // 构造函数
          constructor(control, container, legend) {
            super(control, container, legend);
            this._img = null;
            this._loadImages();
          }
          // 添加图片
          _loadImages() {
            const imageLoaded = () => {
              this.rescale();
            };
            // 创建dom
            const img = L.DomUtil.create("img", null, this._container);
            this._img = img;
            img.onload = imageLoaded;
            img.src = this._legend.url;
          }
          // 重新绘制
          rescale() {
            if (this._img) {
              const _options = this._control.options;
              this._img.style.width = _options.symbolWidth + 'vw';
              this._img.style.height = _options.symbolHeight + 'vh';
              this.center();
            }
          }
          // 计算图片位置
          center() {
            const containerCenterX = this._container.offsetWidth / 2;
            const containerCenterY = this._container.offsetHeight / 2;
            const imageCenterX = parseInt(this._img.width) / 2;
            const imageCenterY = parseInt(this._img.height) / 2;

            const shiftX = containerCenterX - imageCenterX;
            const shiftY = containerCenterY - imageCenterY;

            this._img.style.left = shiftX.toString() + "px";
            this._img.style.top = shiftY.toString() + "px";
          }
        }
        L.control.Legend = L.Control.extend({
          options: {
            position: 'topleft',
            title: '图例',
            legends: [],
            backgroundColor: 'rgba(255, 255, 255, 1)',
            column: 1,
            symbolWidth: 2,
            symbolHeight: 2,
          },
          initialize(options) {
            // 合并构造函数的和内部的options
            L.Util.setOptions(this, options)
            // 保存legend图例的数组
            this._legendSymbols = [];
            // 创建dom元素
            this._createContainer();
          },
          _createContainer() {
            // 创建dom元素
            this._container = L.DomUtil.create("div", "leaflet-legend leaflet-bar leaflet-control");
            this._container.style.backgroundColor = this.options.backgroundColor;
            if (this.options.selfDefinePosition!==undefined){
              this._container.style.position = 'absolute';
              this._container.style.left = this.options.selfDefinePosition.left;
              this._container.style.top = this.options.selfDefinePosition.top;
            }
            // 在容器下创建其他元素
            this._contents = L.DomUtil.create("section", "leaflet-legend-contents", this._container);
            let title = L.DomUtil.create("h3", "leaflet-legend-title", this._contents);
            title.innerText = this.options.title || "Legend";
            // 获取legend的长度
            const len = this.options.legends.length
            // 列数
            const colSize = Math.ceil(len / this.options.column);
            let legendContainer = this._contents;
            for (let i = 0; i < len; i++) {
              // 创建n列
              if (i % colSize === 0) {
                legendContainer = L.DomUtil.create("div", "leaflet-legend-column", this._contents);
              }
              // 为每一列创建元素
              let legend = this.options.legends[i];
              this._buildLegendItems(legendContainer, legend);
            }
          },
          _buildLegendItems(legendContainer, legend) {
            const legendItemDiv = L.DomUtil.create("div", "leaflet-legend-item", legendContainer);
            // 不活跃的，暗色
            if (legend.inactive) {
              L.DomUtil.addClass(legendItemDiv, "leaflet-legend-item-inactive");
            }
            // legend图标
            const symbolContainer = L.DomUtil.create("i", null, legendItemDiv);
            let legendSymbol;
            if (legend.type === "image") {
              legendSymbol = new ImageSymbol(this, symbolContainer, legend);
            }
            // else if (legend.type === "circle") {
            //   legendSymbol = new CircleSymbol(this, symbolContainer, legend);
            // } else if (legend.type === "rectangle") {
            //   legendSymbol = new RectangleSymbol(this, symbolContainer, legend);
            // } else if (legend.type === "polygon") {
            //   legendSymbol = new PolygonSymbol(this, symbolContainer, legend);
            // } else if (legend.type === "polyline") {
            //   legendSymbol = new PolylineSymbol(this, symbolContainer, legend);
            // } else {
            //   L.DomUtil.remove(legendItemDiv);
            //   return;
            // }
            this._legendSymbols.push(legendSymbol);
            symbolContainer.style.width = this.options.symbolWidth + "vw";
            symbolContainer.style.height = this.options.symbolHeight + "vh";
            const legendLabel = L.DomUtil.create("span", null, legendItemDiv);
            legendLabel.innerText = legend.label;
            if (legend.layers) {
              L.DomUtil.addClass(legendItemDiv, "leaflet-legend-item-clickable");
              L.DomEvent.on(
                legendItemDiv,
                "click",
                function () {
                  this._toggleLegend.call(this, legendItemDiv, legend.layers);
                },
                this
              );
            }
          },
          _toggleLegend: function (legendDiv, layers) {
            if (L.DomUtil.hasClass(legendDiv, "leaflet-legend-item-inactive")) {
              L.DomUtil.removeClass(legendDiv, "leaflet-legend-item-inactive");
              if (L.Util.isArray(layers)) {
                for (let i = 0, len = layers.length; i < len; i++) {
                  this._map.addLayer(layers[i]);
                }
              } else {
                this._map.addLayer(layers);
              }
            } else {
              L.DomUtil.addClass(legendDiv, "leaflet-legend-item-inactive");
              if (L.Util.isArray(layers)) {
                for (var i = 0, len = layers.length; i < len; i++) {
                  this._map.removeLayer(layers[i]);
                }
              } else {
                this._map.removeLayer(layers);
              }
            }
          },
          onAdd(map) {
            this._map = map;
            // 初始化
            this._initLayout();
            // 返回dom
            return this._container
          },
          _initLayout: function () {
            L.DomEvent.disableClickPropagation(this._container);
            L.DomEvent.disableScrollPropagation(this._container);
          },
          onRemove() {
            this._container.remove()
          }
        });
        L.control.legend = function (options) {
          return new L.control.Legend(options);
        };
      },
      addLegend(){
        const mapNode = findMapObjEL(this.$parent)
        this.mapObj = L.control.legend(this.options)
          .addTo(mapNode.mapObj);
      }
    }
  }
</script>

<style>
  .leaflet-legend-title {
    margin: 3px;
    padding-bottom: 5px;
  }

  .leaflet-legend-column {
    float: left;
    margin-left: 10px;
  }

  .leaflet-legend-item {
    display: table;
    margin: 2px 0;
  }

  .leaflet-legend-item span {
    vertical-align: middle;
    display: table-cell;
    word-break: keep-all;
    white-space: nowrap;
    background-color: transparent;
    text-align: left;
  }

  .leaflet-legend-item-clickable {
    cursor: pointer;
  }

  .leaflet-legend-item-inactive span {
    color: #cccccc;
  }

  .leaflet-legend-item-inactive i img, .leaflet-legend-item-inactive i canvas {
    opacity: 0.3;
  }

  .leaflet-legend-item i {
    display: inline-block;
    padding: 0px 3px 0px 4px;
    position: relative;
    vertical-align: middle;
  }

  .leaflet-legend-contents {
    display: block;
    padding: 6px 15px 6px 6px;
  }

  .leaflet-legend-contents img {
    position: absolute;
  }

  .leaflet-legend-contents:after {
    content: "";
    display: block;
    clear: both;
  }

</style>
