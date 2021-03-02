// create map
var map = L.map('map').setView([35.7818,-78.6764], 3);
L.tileLayer.provider('Stamen.TonerLite').addTo(map);

// create system markers
var markerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
// load GeoJSON from an external file
$.getJSON("data/tangible-landscape-systems.geojson",function(data){
  // add popups
  function onEachFeature(feature, layer) {
      layer.bindPopup("<b> Name: </b>" + feature.properties.name + "<br>" + "<b>Location: </b>" + feature.properties.location + "<br>" + "<b>Link: </b>" + "<a href=" + feature.properties.website + ">"+ feature.properties.website +"</a>");
  }
  // add GeoJSON layer to the map once the file is loaded
  geojson = L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
			return L.marker(latlng, {icon: markerIcon});
		},
    onEachFeature: onEachFeature
  }).addTo(map)
  map.fitBounds(geojson.getBounds());
});

// create demo markers
var demoIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
// load GeoJSON from an external file
$.getJSON("data/tangible-landscape-demos.geojson",function(data){
  // add popups
  function onEachFeature(feature, layer) {
      layer.bindPopup("<b> Name: </b>" + feature.properties.name + "<br>" + "<b>Location: </b>" + feature.properties.location + "<br>" + "<b>Link: </b>" + "<a href=" + feature.properties.website + ">"+ feature.properties.website +"</a>");
  }
  // add GeoJSON layer to the map once the file is loaded
  demos = L.geoJSON(data, {
    pointToLayer: function (feature, latlng) {
			return L.marker(latlng, {icon: demoIcon});
		},
    onEachFeature: onEachFeature
  }).addTo(map)
  map.fitBounds(demos.getBounds());
});

// // Legend
// var legend = L.control({position: 'topright'});
//
// legend.onAdd = function (map) {
//
// 	var div = L.DomUtil.create('div', 'legend');
//
// 	div.innerHTML += 'Systems';
// 	div.innerHTML += 'Demos';
//
// 	return div;
// };
//
// legend.addTo(map);

// // Sidebar
// var clickHandler = function(e){
// 	$('#info').empty();
//
//   var feature = e.target.feature;
//
//   $('#sidebar').fadeIn(400, function(){
//   	var info = '';
//   	info += '<div>';
// 		// info += '<h3 class="map">'+ feature.properties.name + '</h3>';
//     if(feature.properties.name){
//       info += '<h3 class="map">' + feature.properties.name + '</h3>';
//     }
//     if(feature.properties.title){
//       info += '<h3 class="map">' + feature.properties.title + '</h3>';
//     }
//     if(feature.properties.event){
//       info += '<p>' + feature.properties.event + '</p>';
//     }
//     if(feature.properties.institution){
//       info += '<p>' + feature.properties.institution + '</p>';
//     }
//     if(feature.properties.department){
//       info += '<p>' + feature.properties.department + '</p>';
//     }
//     if(feature.properties.host){
//       info += '<p>' + feature.properties.host + '</p>';
//     }
//     if(feature.properties.authors){
//       info += '<p>' + feature.properties.authors + '</p>';
//     }
//     if(feature.properties.location){
//       info += '<p>' + feature.properties.location + '</p>';
//     }
//     if(feature.properties.date){
//       info += '<p>' + feature.properties.date + '</p>';
//     }
//     if(feature.properties.website){
// 			info += '<p><a href="' + feature.properties.website + '">' + feature.properties.website + '</a></p>';
//     }
// 		if(feature.properties.team){
//       info += '<br/><p>' + feature.properties.team + '</p>';
//     }
//     info += '</div>';
//     $('#info').append(info);
//   })
// }

// // On click
// featureLayerSystems.on('ready', function(){
//   this.eachLayer(function(layer){
//   	layer.on('click', clickHandler);
//   })
// })
//
// // On click
// featureLayerDemos.on('ready', function(){
//   this.eachLayer(function(layer){
//   	layer.on('click', clickHandler);
//   })
// })
//
// map.on('click',function(){
// 	$('#sidebar').fadeOut(200);
// });
