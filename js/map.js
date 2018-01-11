// Mapbox map id
var mapId = 'baharmon.019h4lm1';

// Mapbox access token
var accessToken = 'pk.eyJ1IjoiYmFoYXJtb24iLCJhIjoiY2lnaXFwbmE2MDAyaXJxbTAxZGMwcmZneCJ9.M-KRxEOrjKct0rl8hxHJug';

// Map object with map id and access token
L.mapbox.accessToken = accessToken;
var map = L.mapbox.map('map', mapId, {scrollWheelZoom: false});

// Set the initial view
map.setView([35.7818,-78.6764], 3);
//map.fitWorld().zoomIn(2);

//map.on('resize', function(e) {
//    map.fitWorld({reset: true}).zoomIn();

map.on('click', function() {
  if (map.scrollWheelZoom.enabled()) {
    map.scrollWheelZoom.disable();
    }
    else {
    map.scrollWheelZoom.enable();
    }
  });

var systems = 'data/tangible-landscape-systems.geojson';

var demos = 'data/tangible-landscape-demos.geojson';

var featureLayerSystems = L.mapbox.featureLayer();
	featureLayerSystems.loadURL(systems);
	featureLayerSystems.addTo(map);

var featureLayerDemos = L.mapbox.featureLayer();
	featureLayerDemos.loadURL(demos);
	featureLayerDemos.addTo(map);

featureLayerSystems.on('ready', function(){
	this.eachLayer(function(layer){
    	layer.setIcon(L.mapbox.marker.icon({
          "marker-color": "#111",
          "marker-size": "medium",
          "marker-symbol": "marker"
        }))
    })
    map.fitBounds(featureLayerSystems.getBounds());
})

featureLayerDemos.on('ready', function(){
	this.eachLayer(function(layer){
    	layer.setIcon(L.mapbox.marker.icon({
          "marker-color": "#888",
          "marker-size": "medium",
          "marker-symbol": "marker"
        }))
    })
    // map.fitBounds(featureLayerDemos.getBounds());
})

// // Cluster markers
// var markers = L.markerClusterGroup();
// markers.addLayer(featureLayerSystems);
// map.addLayer(markers);

// Sidebar
var clickHandler = function(e){
	$('#info').empty();

  var feature = e.target.feature;

  $('#sidebar').fadeIn(400, function(){
  	var info = '';
  	info += '<div>';
  	// info += '<h3 class="map">'+ feature.properties.name + '</h3>';
    if(feature.properties.name){
      info += '<h3 class="map">' + feature.properties.name + '</h3>';
    }
    if(feature.properties.title){
      info += '<h3 class="map">' + feature.properties.title + '</h3>';
    }
    if(feature.properties.event){
      info += '<p>' + feature.properties.event + '</p>';
    }
    if(feature.properties.institution){
      info += '<p>' + feature.properties.institution + '</p>';
    }
    if(feature.properties.department){
      info += '<p>' + feature.properties.department + '</p>';
    }
    if(feature.properties.host){
      info += '<p>' + feature.properties.host + '</p>';
    }
    if(feature.properties.authors){
      info += '<p>' + feature.properties.authors + '</p>';
    }
    if(feature.properties.location){
      info += '<p>' + feature.properties.location + '</p>';
    }
    if(feature.properties.date){
      info += '<p>' + feature.properties.date + '</p>';
    }
    if(feature.properties.website){
			info += '<p><a href="' + feature.properties.website + '">' + feature.properties.website + '</a></p>';
    }
		if(feature.properties.team){
      info += '<br/><p>' + feature.properties.team + '</p>';
    }
    info += '</div>';
    $('#info').append(info);
  })
}

// On click
featureLayerSystems.on('ready', function(){
  this.eachLayer(function(layer){
  	layer.on('click', clickHandler);
  })
})

// On click
featureLayerDemos.on('ready', function(){
  this.eachLayer(function(layer){
  	layer.on('click', clickHandler);
  })
})

map.on('click',function(){
	$('#sidebar').fadeOut(200);
});
