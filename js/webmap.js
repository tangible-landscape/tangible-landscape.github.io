// Mapbox map id
var mapId = 'baharmon.019h4lm1';

// Mapbox access token
var accessToken = 'pk.eyJ1IjoiYmFoYXJtb24iLCJhIjoiY2lnaXFwbmE2MDAyaXJxbTAxZGMwcmZneCJ9.M-KRxEOrjKct0rl8hxHJug';

// Map object with map id and access token
L.mapbox.accessToken = accessToken;
var map = L.mapbox.map('map', mapId);

// Set the initial view
map.fitWorld().zoomIn(2);;

var dataFileToAdd = 'data/tangible-landscape-systems.geojson';

var featureLayer = L.mapbox.featureLayer();
	featureLayer.loadURL(dataFileToAdd);
	featureLayer.addTo(map);

featureLayer.on('ready', function(){
	this.eachLayer(function(layer){
    	layer.setIcon(L.mapbox.marker.icon({
          "marker-color": "#333",
          "marker-size": "large",
          "marker-symbol": "marker"
        }))
    })
    //map.fitBounds(featureLayer.getBounds());
})

// Sidebar
var clickHandler = function(e){
	$('#info').empty();

  var feature = e.target.feature;

  $('#sidebar').fadeIn(400, function(){
  	var info = '';
  	info += '<div>';
  	info += '<h2>'+ feature.properties.name + '<h2>';
    if(feature.properties.institution){
      info += '<p>' + feature.properties.institution + '</p>';
    }
    if(feature.properties.department){
      info += '<p>' + feature.properties.department + '</p>';
    }
    if(feature.properties.website){
			info += '<p><a href="' + feature.properties.website + '">' + feature.properties.website + '</a></p>';
    }
		if(feature.properties.team){
      info += '<p>' + feature.properties.team + '</p>';
    }
    info += '</div>';
    $('#info').append(info);
  })
}

// On click
featureLayer.on('ready', function(){
  this.eachLayer(function(layer){
  	layer.on('click', clickHandler);
  })
})

map.on('click',function(){
	$('#sidebar').fadeOut(200);
});
