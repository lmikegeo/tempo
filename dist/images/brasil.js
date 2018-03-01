	window.onload=initialize;
    var map;
	var altitude;
	var coords;
	var llGrat;

    function initialize() {
      if (GBrowserIsCompatible()) {
        map = new GMap2(document.getElementById('map_canvas')); 
		map.setMapType(G_PHYSICAL_MAP);
        map.setCenter(new GLatLng(-10.333333,-53.200000), 4);
        map.setUIToDefault();
		GEvent.addListener(map, 'click', onMapClick);
		llGrat = new LatLonGraticule(false);
		map.addOverlay(llGrat);
      }
    } 

    function onMapClick(overlay,latlng) {

		if (latlng) {
			coords = latlng;
			request = 'http://api.geonames.org/astergdemJSON?lat=' + latlng.y + '&lng=' + latlng.x + '&username=geodivagar&callback=showAltitude'; 		
			aObj = new JSONscriptRequest(request);
			aObj.buildScriptTag();
			aObj.addScriptTag();			
        }
    }
		
	function showAltitude(jData) {
			altitude = jData.astergdem;
			if (altitude==-9999) {altitude=0;}
			var myHtml = 'Coords: ' + coords + '<br />  Altitude: ' + altitude + ' metros';
            map.openInfoWindow(coords, myHtml);
	}