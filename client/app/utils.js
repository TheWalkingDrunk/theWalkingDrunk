module.exports = {

  //Form a request that is sent to the mapping API:
  //Tests:
  //The destination is the furthest location in the waypoints array.
  getRouteRequest: function() {
    //need to calculate farthest away waypoint and set to endLoc
    var endLoc = this.state.waypoints[this.state.waypoints.length - 1];

    var request = {
      origin: this.state.startLoc,
      destination: endLoc.location,
      travelMode: google.maps.DirectionsTravelMode.WALKING,
      //last waypoint already the destination
      waypoints: this.state.waypoints.slice(0, -1),
      optimizeWaypoints: false
    }

    return request;
  },

  //Finds an array of waypoints and passes them to a callback:
  //Tests:
  //Passes results to the callback.
  //No item is in the waypoint array more than once.
  getWaypoints: function(address, callback) {
    //geocode address into google.maps.LatLng object
    this.geocodeAddress(address, (latLng) => {
      //Construct the request object:
      var request = {
        location: latLng,
        types: ['bar'],
        rankBy: google.maps.places.RankBy.DISTANCE
      }
      //Search for bars near the geocoded location:
      this.placesService.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          //set new waypoint equal to first unvisited bar
          var i = 0;
          while (this.visited[results[i].vicinity]) {
            i++;
            if (!results[i]) {
              break;
            }
          }

          var current = results[i] ? results[i] : this.state.current;

          var waypoint = {
            location: current.vicinity,
            stopover: true
          };

          this.visited[waypoint.location] = true;

          var waypoints = this.state.waypoints.concat(waypoint);

          var results = {
            waypoints: waypoints,
            current: current
          };

          callback(results);
        }
      });
    });
  },
  //Geocodes an address and passes the associated latitude and longitude
  //to a callback.
  //Tests:
  // Geocache Hack Reactor's website, verify that it finds the correct longitude and latitude.
  geocodeAddress: function(address, callback) {
    this.geocoder.geocode({
      address: address
    }, (results, status) => {
      if (status === 'OK') {
        callback(results[0].geometry.location);
      }
    });
  }
}



