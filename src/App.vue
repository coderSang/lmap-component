<template>
  <div id="app">
    <dqyt-map :config="map.config" :options="map.options">
      <dqyt-tile-layer :url="tileLayer.url" :options="tileLayer.options"></dqyt-tile-layer>
      <dqyt-wms-tile-layer :url="WMSTileLayer.url" :options="WMSTileLayer.options"></dqyt-wms-tile-layer>
      <dqyt-image-overlay :url="imageOverlay.url" :options="imageOverlay.options"></dqyt-image-overlay>
      <dqyt-video-overlay :url="videoOverlay.url" :options="videoOverlay.options"></dqyt-video-overlay>
      <dqyt-marker :data="marker.data" :options="marker.options" :config="marker.config">
        <dqyt-popup>
          <p>ssss</p>
        </dqyt-popup>
        <dqyt-tooltip>
          <p>ssss</p>
        </dqyt-tooltip>
      </dqyt-marker>
<!--      <dqyt-control :options="control.options" :config="control.config"></dqyt-control>-->
      <dqyt-zoom :options="zoom.options"></dqyt-zoom>
      <dqyt-attribution :options="attribution.options"></dqyt-attribution>
      <dqyt-legend></dqyt-legend>
      <dqyt-vector :options="vector.options" :config="vector.config" :data="vector.data"></dqyt-vector>
    </dqyt-map>
    <img src="/src/assets/logo.png" style="width: 200px;height: 200px" alt="">
  </div>
</template>

<script>
  import DqytMap from "@/components/DqytMap"
  import DqytTileLayer from "@/components/DqytTileLayer"
  import DqytWMSTileLayer from "@/components/DqytWMSTileLayer"
  import DqytImageOverlay from "@/components/DqytImageOverlay"
  import DqytVideoOverlay from "@/components/DqytVideoOverlay"
  import DqytMarker from "@/components/DqytMarker"
  import DqytPopup from "@/components/DqytPopup"
  import DqytTooltip from "@/components/DqytTooltip"
  import DqytControl from "@/components/DqytControl"
  import DqytZoom from "@/components/DqytZoom"
  import DqytAttribution from "@/components/DqytAttribution"
  import DqytLegend from "@/exterPlugin/DqytLegend"
  import DqytVector from "@/components/DqytVector"

  export default {
    name: 'App',
    components: {
      DqytMap,
      DqytTileLayer,
      "dqyt-wms-tile-layer": DqytWMSTileLayer,
      DqytImageOverlay,
      DqytVideoOverlay,
      DqytMarker,
      DqytPopup,
      DqytTooltip,
      DqytControl,
      DqytAttribution,
      DqytZoom,
      DqytLegend,
      DqytVector
    },
    data() {
      return {
        map: {
          config: {
            'click': function (event) {
              // console.log(event)
            }
          },
          options: {
            center: [30.52, 119.98],
            zoom: 14
          }
        },
        tileLayer: {
          url: 'TianDiTu.Normal.Map',
          config: {
          },
          options: {
            foo: 'bar',
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
        },
        WMSTileLayer: {
          url: 'http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi',
          config: {
          },
          options: {
            layers: 'nexrad-n0r-900913',
            format: 'image/png',
            transparent: true,
            attribution: "Weather data © 2012 IEM Nexrad"
          }
        },
        imageOverlay: {
          url: require("@/assets/temp/imageLayer.png"),
          options: {
            imageBounds: [[30.52, 119.98], [30.55, 120]],
          },
          config: {
          }
        },
        videoOverlay: {
          url: 'https://www.mapbox.com/bites/00188/patricia_nasa.webm',
          options: {
            videoBounds: [[30.52, 119.98], [30.55, 120]],
          },
          config: {
          }
        },
        marker: {
          data: [30.52, 119.98],
          // data: [[30.52, 119.98], [30.53, 120]],
          // data: { lat: 30.52, lng: 119.98, icon: {
          //     iconUrl: require("@/assets/images/markerIconDefault.png"),
          //     iconSize: [38, 38],
          //     iconAnchor: [22, 38],
          //   }},
          // data: [{ lat: 30.52, lng: 119.98, icon: {
          //     iconUrl: require("@/assets/images/markerIconDefault.png"),
          //     iconSize: [38, 38],
          //     iconAnchor: [22, 38],
          //   }},{ lat: 30.53, lng: 119.99, icon: {
          //     iconUrl: require("@/assets/images/markerUser.png"),
          //     iconSize: [38, 38],
          //     iconAnchor: [22, 38],
          //   }}],
          config: {
            'dragend': function (event) {
              console.log(event)
            }
          },
          options: {
            draggable: true,
            icon: {
              iconUrl: require("@/assets/images/markerUser.png"),
              iconSize: [38, 38],
              iconAnchor: [22, 38],
            }
          }
        },
        control: {
          options: {
            zoom: {
              zoomInText: 'add'
            },
            scale: {
              maxWidth:200,
              metric:true,
              imperial:false
            }
          },
          config: {

          }
        },
        zoom: {
          options: {
            zoomInText: 'add'
          },
          config: {
          }
        },
        attribution: {
          options: {
            prefix: 'dqyt'
          },
          config: {
          }
        },
        popup: {
          data: [30.51, 119.98],
          config: {
          },
          options: {
          }
        },
        vector: {
          data: [[
            [30.52, 119.98],
            [30.53, 119.98],
            [30.54, 119.98],
          ],[
            [30.52, 119.99],
            [30.53, 119.99],
            [30.54, 119.99],
          ]],
          options: {
            type: 'polyline',
            color: 'red',
            fitBounds: true,
          },
          config: {
            'click': function (event) {
              console.log(event)
            }
          }
        },
      }
    },
    methods: {
    },
    mounted() {
    }
  }
</script>

<style>

</style>
