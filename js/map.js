var iconStyle = new ol.style.Style({
      image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        scale: 0.1,
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

    var layerJSONComplaints = new ol.layer.Vector({
        source: new ol.source.Vector({
        url: 'data/geojson/complaints.geojson',
        format: new ol.format.GeoJSON({
            defaultDataProjection :'EPSG:4326', 
            projection: 'EPSG:3857'

          })
        }),
        style : iconStyle
    });

    var layerTile = new ol.layer.Tile({
    source: new ol.source.OSM({})
    });

    var map = new ol.Map({
      target: 'map',
      layers: [layerTile, layerJSONComplaints, layerJSONUnits],
      view: new ol.View({
        center: ol.proj.fromLonLat([-45.475006, -5.801333]),
        zoom: 3.3
      })
    });