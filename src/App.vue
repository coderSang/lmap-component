<template>
  <div id="app">
    <dqyt-map :config="map.config" :options="map.options">
      <dqyt-tile-layer :url="tileLayer.url" :options="tileLayer.options"></dqyt-tile-layer>
      <dqyt-control-mini-map></dqyt-control-mini-map>
      <dqyt-heat></dqyt-heat>
<!--      <dqyt-boundary-tile-layer :url="tileBoundaryLayer.url" :options="tileBoundaryLayer.options"></dqyt-boundary-tile-layer>-->
<!--      <dqyt-wms-tile-layer :url="WMSTileLayer.url" :options="WMSTileLayer.options"></dqyt-wms-tile-layer>-->
<!--      <dqyt-image-overlay :url="imageOverlay.url" :options="imageOverlay.options"></dqyt-image-overlay>-->
<!--      <dqyt-video-overlay :url="videoOverlay.url" :options="videoOverlay.options"></dqyt-video-overlay>-->
<!--      <dqyt-marker :data="marker.data" :options="marker.options" :config="marker.config">-->
<!--        <dqyt-popup>-->
<!--          <p>ssss</p>-->
<!--        </dqyt-popup>-->
<!--        <dqyt-tooltip>-->
<!--          <p>ssss</p>-->
<!--        </dqyt-tooltip>-->
<!--      </dqyt-marker>-->
<!--      <dqyt-marker-cluster :data="markerCluster.data" :config="markerCluster.config"></dqyt-marker-cluster>-->
<!--      <dqyt-control-zoom :options="zoom.options"></dqyt-control-zoom>-->
<!--      <dqyt-control-attribution :options="attribution.options"></dqyt-control-attribution>-->
<!--      <dqyt-control-scale :options="scale.options"></dqyt-control-scale>-->
<!--      <dqyt-legend :options="legend.options"></dqyt-legend>-->
<!--      <dqyt-vector :options="vector.options" :config="vector.config" :data="vector.data"></dqyt-vector>-->
<!--      <dqyt-control-draw :options="draw.options" :config="draw.config"></dqyt-control-draw>-->
<!--      <dqyt-control-side-by-side :urls="sideBySide.urls" :options="sideBySide.options"></dqyt-control-side-by-side>-->
    </dqyt-map>
  </div>
</template>

<script>

  export default {
    name: 'App',
    components: {

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
        tileBoundaryLayer: {
          url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
          options: {
            boundary: {
              "type":"MultiPolygon","coordinates":[
                [
                  [[119,30], [123,31],
                    [124,31], [119,31],
                    [119,30],
                  ]
                ],
                [
                  [[119.1,30.1], [120,30.5],
                    [121,30.5], [119.1,30.1],
                  ],
                ]
              ]
            }
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
        markerCluster: {
          // data: [[30.52, 119.97],[30.52, 119.98]],
          data: [{lat: '30.52', lng: '119.97'}, {lat: '30.52', lng: '119.98'}],
          config: {
            'click': function (event) {
              console.log(event)
            }
          },
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
        scale: {
          options: {
            maxWidth:200,
            metric:true,
            imperial:false
          },
          config: {
          }
        },
        legend: {
          options:{
            // position: "topright",
            selfDefinePosition: {
              left: '10vw',
              top: '10vw'
            },
            collapsed: false,
            // vw, vh级别
            symbolWidth: 2,
            symbolHeight: 3,
            opacity: 1,
            column: 2,
            legends: [{
              label: "Marker1",
              type: "image",
              url: require("@/assets/logo.png"),
              inactive: false,
              on: {
                'click':function(e, a){
                  console.log(e, a)
                }
              },
              layers: ['']
            },{
              label: "Marker1",
              type: "image",
              url: require("@/assets/logo.png"),
              inactive: true,
            },{
              label: "Marker1",
              type: "image",
              url: require("@/assets/logo.png"),
              inactive: true,
            }]
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
        draw: {
          options: {
            position: 'topright',
            draw: {
              polyline: {
                shapeOptions: {
                  color: '#f357a1',
                  weight: 10
                }
              },
              polygon: {
                allowIntersection: false, // Restricts shapes to simple polygons
                shapeOptions: {
                  color: '#bada55'
                }
              },
              circle: false, // Turns off this drawing tool
              rectangle: {
                shapeOptions: {
                  clickable: false
                }
              },
            },
          },
          config: {
            'created': function (layer) {
              console.log(layer)
            }
          }
        },
        sideBySide: {
          urls: {
            url1: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            url2: 'https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png',
          },
          options: {
            options1: {},
            options2:{},
          },
          configs: {
            config1: {},
            config2:{},
          },
        }
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
