var iconStyle = new ol.style.Style({
      image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        scale: 0.1,
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: 'data/images/map-icon.png'
      }))
    });

    var layerJSONUnits = new ol.layer.Vector({
        source: new ol.source.Vector({
        url: 'data/geojson/units.geojson',
        format: new ol.format.GeoJSON({
            defaultDataProjection :'EPSG:4326', 
            projection: 'EPSG:3857'

          })
        }),
        style : iconStyle
    });

/*    var layerJSONComplaints = new ol.layer.Vector({
        source: new ol.source.Vector({
        url: 'data/geojson/ceps1_mapped.geojson',
        format: new ol.format.GeoJSON({
            defaultDataProjection :'EPSG:4326', 
            projection: 'EPSG:3857'

          })
        })
    }); */

 var layerJSONComplaints = new ol.source.Vector({
    url: 'data/geojson/ceps1_mapped.geojson',
    format: new ol.format.GeoJSON(),
    style : iconStyle
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
   layers: [raster, clusters],
   renderer: 'canvas',
   target: 'map',
   view: new ol.View({
     center: ol.proj.fromLonLat([-45.475006, -5.801333]),
     zoom: 6.3
   })
}); 