var initialLocation;
var marker;
var siberia = new google.maps.LatLng(60, 105);
var newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
var supportFlag = new Boolean();     
var directionDisplay;
var geocoder;
var map;
var curMarker = new google.maps.Marker;
function initialize()
	{
		geocoder = new google.maps.Geocoder();
		directionDisplay = new google.maps.DirectionsRenderer();
		var myOptions = {
			zoom: 6,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById('map-canvas'), myOptions);
		directionDisplay.setMap(map);
  
  
		// Try W3C Geolocation (Preferred)
		if(navigator.geolocation) 
		{
			supportFlag = true;
			navigator.geolocation.getCurrentPosition(function(position) 
			{
				initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
				marker = new google.maps.Marker
				({
						position: initialLocation,
						map: map,
						title: 'You Started Here!'
		
				});
				map.setCenter(initialLocation);
			}, function() 
			{
				handleNoGeolocation(supportFlag);
			});
			
		}
	// Browser doesn't support Geolocation
	else
	{
		supportFlag = false;
		handleNoGeolocation(supportFlag);
	}

	function handleNoGeolocation(errorFlag) 
	{
		if (errorFlag == true) 
		{
			alert("Geolocation service failed.");
			initialLocation = newyork;
		} else 
		{
			alert("Your browser doesn't support geolocation. We've placed you in Siberia.");
			initialLocation = siberia;
		}
		marker = new google.maps.Marker(
		{
			position: initialLocation,
			map: map,
			title: 'You Started Here!'
		});
		map.setCenter(initialLocation);
	
  }
}


google.maps.event.addDomListener(window, 'load', initialize);
google.maps.event.trigger(map, 'resize');