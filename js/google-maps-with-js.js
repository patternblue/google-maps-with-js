var googleMapsForm = (function(){

	// my methods
	function initMap(){

		// set my map properties and create a map
		var mapProp = {
			center: {lat: 60, lng: 22},
			zoom: 5,
			mapTypeId:google.maps.MapTypeId.ROADMAP
		}
		return new google.maps.Map(document.getElementById('map'), mapProp);
	}

	function addMarkerAndMessage(map, latitude, longitude, message){

		// set a marker
		var markerCenter = new google.maps.LatLng(latitude, longitude);
		var marker = new google.maps.Marker({
			position: markerCenter,
			animation: google.maps.Animation.BOUNCE

		});
		marker.setMap(map);

		// set the message window (info window)
		var messageWindow = new google.maps.InfoWindow({
			content: message
		});

		// jump to marker
		map.setZoom(7);
		map.setCenter(marker.getPosition());

		// when marker is clicked, display the message on the marker and jump to that position
		google.maps.event.addListener(marker, 'click', function(){
			messageWindow.open(map, marker);
			map.setZoom(4);
			map.setCenter(marker.getPosition());
		});
	}

	function main(){
		$mapForm = $('#mapForm');
		$mapForm.validation();
		var map1 = initMap();

		// if submitted form is valid, get inputted data in the fields for Google Maps
		$mapForm.on('submit', function(event){
			if($mapForm.validate()){
				event.preventDefault();
				var latitude = parseInt($mapForm.find('#latitude').val());
				var longitude = parseInt($mapForm.find('#longitude').val());
				var message = $mapForm.find('#message').val();
				addMarkerAndMessage(map1, latitude, longitude, message);
			}
		});
	}

	return {
		main: main
	}
})();
