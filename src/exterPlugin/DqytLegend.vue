<template>
  <div></div>
</template>

<script>
  import {findMapObjEL} from "@/util";

  export default {
    name: "DqytLegend",
    mounted() {
      const mapNode = findMapObjEL(this.$parent)
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
        constructor(control, container, legend) {
          super(control, container, legend);
          this._img = null;
          this._loadImages();
        }

        _loadImages() {
          var imageLoaded = () => {
            this.rescale();
          };
          var img = L.DomUtil.create("img", null, this._container);
          this._img = img;
          img.onload = imageLoaded;
          img.src = this._legend.url;
        }

        rescale() {
          if (this._img) {
            var _options = this._control.options;
            if (this._img.width > _options.symbolWidth || this._img.height > _options.symbolHeight) {
              var imgW = this._img.width;
              var imgH = this._img.height;
              var scaleW = _options.symbolWidth / imgW;
              var scaleH = _options.symbolHeight / imgH;
              var scale = Math.min(scaleW, scaleH);
              this._img.width = imgW * scale;
              this._img.height = imgH * scale;
            }
            this.center();
          }
        }

        center() {
          var containerCenterX = this._container.offsetWidth / 2;
          var containerCenterY = this._container.offsetHeight / 2;
          var imageCenterX = parseInt(this._img.width) / 2;
          var imageCenterY = parseInt(this._img.height) / 2;

          var shiftX = containerCenterX - imageCenterX;
          var shiftY = containerCenterY - imageCenterY;

          this._img.style.left = shiftX.toString() + "px";
          this._img.style.top = shiftY.toString() + "px";
        }
      }
      L.control.Legend = L.Control.extend({
        options: {
          position: 'bottomleft',
          title: '图例',
          legends: [],
          backgroundColor: 'rgba(255, 255, 255, 1)',
          column: 1,
          symbolWidth: 24,
          symbolHeight: 24,
        },
        initialize(options) {
          // 创建dom元素
          this._createContainer();
          // 保存legend图例的数组
          this._legendSymbols = [];
          // 合并构造函数的和内部的options
          L.Util.setOptions(this, options)
        },
        _createContainer() {
          // 创建dom元素
          this._container = L.DomUtil.create("div", "leaflet-legend leaflet-bar leaflet-control");
          this._container.style.backgroundColor = this.options.backgroundColor;
          // 在容器下创建其他元素
          this._contents = L.DomUtil.create("section", "leaflet-legend-contents", this._container);
          this._link = L.DomUtil.create("a", "leaflet-legend-toggle", this._container);
          this._link.title = "Legend";
          this._link.href = "#";
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
          // 不活跃的
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

          symbolContainer.style.width = this.options.symbolWidth + "px";
          symbolContainer.style.height = this.options.symbolHeight + "px";

          var legendLabel = L.DomUtil.create("span", null, legendItemDiv);
          legendLabel.innerText = legend.label;
          if (legend.layers) {
            L.DomUtil.addClass(legendItemDiv, "leaflet-legend-item-clickable");
            // L.DomEvent.on(
            //   legendItemDiv,
            //   "click",
            //   function () {
            //     this._toggleLegend.call(this, legendItemDiv, legend.layers);
            //   },
            //   this
            // );
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

          if (this.options.collapsed) {
            this._map.on("click", this.collapse, this);

            L.DomEvent.on(
              this._container,
              {
                mouseenter: this.expand,
                mouseleave: this.collapse,
              },
              this
            );
          } else {
            this.expand();
          }
        },
        expand: function () {
          this._link.style.display = "none";
          L.DomUtil.addClass(this._container, "leaflet-legend-expanded");
          for (var legendSymbol of this._legendSymbols) {
            legendSymbol.rescale();
          }
          return this;
        },
        onRemove() {
          this._container.remove()
        }
      });
      L.control.legend = function (options) {
        return new L.control.Legend(options);
      };
      new L.control.Legend({
        position: "bottomright",
        collapsed: false,
        symbolWidth: 24,
        opacity: 1,
        column: 2,
        legends: [{
          label: "Marker1",
          type: "image",
          url: "marker/marker-red.png",
        }]
      })
        .addTo(mapNode.mapObj);
    }
  }
</script>

<style scoped>
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

  .leaflet-legend-toggle {
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTk5MDE0Mjk2NTEwIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE3Nzk4IiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0Ij48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik05MzQuNCA0NzguNzJINzM3LjI4Yy0xNS44NzItMTEwLjA4LTExMS4xMDQtMTk0LjU2LTIyNS4yOC0xOTQuNTZTMzAyLjU5MiAzNjguNjQgMjg2LjcyIDQ3OC43Mkg4OS42djY2LjU2SDI4Ni43MmMxNS44NzIgMTEwLjA4IDExMS4xMDQgMTk0LjU2IDIyNS4yOCAxOTQuNTZzMjA5LjQwOC04NC40OCAyMjUuMjgtMTk0LjU2aDE5Ny4xMnYtNjYuNTZ6IiBmaWxsPSIjNzA3MDcwIiBwLWlkPSIxNzc5OSI+PC9wYXRoPjwvc3ZnPg==");
    background-repeat: no-repeat;
    background-position: 50% 50%;
    box-shadow: none;
    border-radius: 4px;
  }

  .leaflet-legend-contents {
    display: none;
  }

  .leaflet-legend-expanded .leaflet-legend-contents {
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
