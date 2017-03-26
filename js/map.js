var layerJSONComplaints = new ol.source.Vector({
  url: 'data/geojson/ceps_locations_repeated.geojson',
  format: new ol.format.GeoJSON()
});

var layerProcons = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'data/geojson/procons_ma.geojson',
    format: new ol.format.GeoJSON()
  }),
  style : new ol.style.Style({
    image: new ol.style.Circle({
      radius: 8,
      stroke: new ol.style.Stroke({
        color: '#fff'
      }),
      fill: new ol.style.Fill({
        color: '#FFA500'
      })
    })
  })
});

var clusterSource = new ol.source.Cluster({
  distance: 40,
  source: layerJSONComplaints
});

var styleCache = {};

var clusters = new ol.layer.Vector({
  source: clusterSource,
  style: function(feature, resolution) {
    var size = feature.get('features').length;
    var style = styleCache[size];
    if (!style) {
      style = [new ol.style.Style({
        image: new ol.style.Circle({
          radius: 10,
          stroke: new ol.style.Stroke({
            color: '#fff'
          }),
          fill: new ol.style.Fill({
            color: '#3399CC'
          })
        }),
        text: new ol.style.Text({
          text: size.toString(),
          fill: new ol.style.Fill({
            color: '#fff'
          })
        })
      })];
      styleCache[size] = style;
    }
    return style;
  }
});


var raster = new ol.layer.Tile({
  source: new ol.source.OSM({})
});


var map = new ol.Map({
  layers: [raster, clusters, layerProcons],
  renderer: 'canvas',
  target: 'map',
  view: new ol.View({
    center: ol.proj.fromLonLat([-45.475006, -5.801333]),
    zoom: 6.3
  })
}); 
