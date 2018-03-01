	window.onload=initialize;
    var map_canvas;
	var altitude;
	var coords;
	var llGrat;

    function initialize() {
      if (GBrowserIsCompatible()) {
        map_canvas = new GMap2(document.getElementById('map_canvas')); 
		map_canvas.setMapType(G_PHYSICAL_MAP);
        map_canvas.setCenter(new GLatLng(-10.333333,-53.200000), 4);
        map_canvas.setUIToDefault();
		GEvent.addListener(map, 'click', onMapClick);
		llGrat = new LatLonGraticule(false);
		map_canvas.addOverlay(llGrat);
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
            map_canvas.openInfoWindow(coords, myHtml);
	}
