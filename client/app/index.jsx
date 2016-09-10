import React from 'react';
var map = window.Map;

// const HACK_REACTOR = {
//   lat: 37.783654,
//   lng: -122.408945
// };

// const WAYPOINTS = [
//   {
//     location: '757 Leavenworth San Francisco, CA',
//     stopover: true
//   },
//   {
//     location: 'Civic Center, SF',
//     stopover: true
//   },
//   {
//     location: 'Union Square, SF',
//     stopover: true
//   }
// ];

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startLoc: this.props.startLoc || 'SF',
      waypoints: []
    };
    this.visited = {};
  }
  
  // make use of React Software Component Lifecycle 
  componentDidMount() {
    this.initMap();
    this.handleNextBar();
  }

  initMap() {
    this.map = new google.maps.Map(this.refs.map, {
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();

    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(this.refs.panel);

    this.geocoder = new google.maps.Geocoder();
    this.placesService = new google.maps.places.PlacesService(this.map);
    this.stepDisplay = new google.maps.InfoWindow();
  }

  componentDidUpdate() {
    if (this.state.waypoints.length > 0) {
      var request = this.getRouteRequest();
      this.directionsService.route(request, (response, status) => {
        if (status == google.maps.DirectionsStatus.OK) {
          this.directionsDisplay.setDirections(response);
        }
      });
    }
  }

  getRouteRequest() {
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
  }

  handleNextBar(e) {
    if (e) {
      e.preventDefault();
    }

    var address;
    if (this.state.waypoints[this.state.waypoints.length - 1]) {
      address = this.state.waypoints[this.state.waypoints.length - 1].location;
    } else if (this.refs.location.value) {
      address = this.refs.location.value;
    } else {
      address = this.state.startLoc;
    }
    
    this.getWaypoints(address, (waypoints) => {
      waypoints = waypoints.slice(0, 7);
      this.setState({
        waypoints: waypoints
      });
    });
    
  }

  handleLocationSubmit(e) {
    e.persist();
    var startLoc = this.refs.location.value;
    this.setState({
      startLoc: startLoc,
      waypoints: [],
    }, () => {
      this.visited = {};
      this.handleNextBar(e);
    });
  }

  handleChangeBar(e) {
    e.persist();
    this.setState({
      waypoints: this.state.waypoints.slice(0, -1)
    }, () => {
      this.handleNextBar(e);
    });
  }

  getWaypoints(address, callback) {
    //geocode address into google.maps.LatLng object
    this.geocodeAddress(address, (latLng) => {
      var request = {
        location: latLng,
        keyword: 'bar',
        rankBy: google.maps.places.RankBy.DISTANCE
      }
      //nearby search of coordinates of address
      this.placesService.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          //set new waypoint equal to first unvisited bar
          var i = 0;
          while (this.visited[results[i].vicinity]) {
            console.log(results[i].vicinity);
            i++;
          }

          var waypoint = {
            location: results[i].vicinity,
            stopover: true
          };

          this.visited[waypoint.location] = true;

          callback(this.state.waypoints.concat(waypoint));
        }
      });
    });
  }

  geocodeAddress(address, callback) {
    this.geocoder.geocode({
      address: address
    }, (results, status) => {
      if (status === 'OK') {
        callback(results[0].geometry.location);
      }
    });
  }

  render() {
    const mapStyle = {
      width: 500,
      height: 300,
    };
    
    const mapDivStyle = {
      border: '1px solid black',
      display: 'table',
      margin: '0 auto'
    }

    return (
    	<div>
        <div>
          <button onClick={this.handleNextBar.bind(this)}>Next Bar</button>
        </div>
        <div>
          <button onClick={this.handleChangeBar.bind(this)}>Change Current Bar</button>
        </div>
        <div>
          <form onSubmit={this.handleLocationSubmit.bind(this)}>
            <input placeholder="Your location" type="text" ref="location"/>
          </form>
        </div>
  	      <div style={mapDivStyle}>
  	        <div ref="map" style={mapStyle}>I should be a map!</div>
  	      </div>
  	      <div>
  					<div id="directions-panel" ref="panel">Hack Reactor to Tempest!!! Drink on my hacking drunkards!</div>
  				</div>
      </div>
    );
  }
}

module.exports = Map;