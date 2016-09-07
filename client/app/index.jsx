import React from 'react';
var map = window.Map;

const HACK_REACTOR = {
  lat: 37.783654,
  lng: -122.408945
};

const GOOGLEPLEX = {
  lat: 37.421957,
  lng: -122.084036
};

class Map extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   startLoc: HACK_REACTOR,
    //   waypoints: []
    // };
    this.panToLoc = this.panToLoc.bind(this);
  }
  
  // make use of React Software Component Lifecycle
  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    console.log(this.map);
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();

    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(this.refs.panel);

    var request = {
	     origin: 'Hack Reactor, SF', 
	     destination: 'Tempest, 431 Natoma St, San Francisco, CA 94103',
	     travelMode: google.maps.DirectionsTravelMode.WALKING
	   };

	   this.directionsService.route(request, function(response, status) {
	     if (status == google.maps.DirectionsStatus.OK) {
	       this.directionsDisplay.setDirections(response);
	     }
	   }.bind(this));
  }

  // renderRoute() {
  //   //need to calculate farthest away waypoint and set to endLoc
  //   var endLoc = waypoints[0];

  //   var request = {
  //     origin: this.state.startLoc,
  //     destination: endLoc.location,
  //     travelMode: 'WALKING',
  //     waypoints: this.state.waypoints,
  //     optimizeWaypoints: true
  //   }

  //   this.directionsService.route(request, function(response, status) {
  //     if (status == google.maps.DirectionsStatus.OK) {
  //       this.directionsDisplay.setDirections(response);
  //     }
  //   });
  // }

  panToLoc(location) {
    console.log(this.map);
    this.map.panTo(location);
  }

  render() {

    console.log(this);
    console.log(this.state);
    // if (this.state.waypoints.length > 0) {
    //   this.renderRoute();
    // }

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
          <button onClick={this.panToLoc(HACK_REACTOR).bind(this)}>Go to Hack Reactor</button>
          <button onClick={this.panToLoc(GOOGLEPLEX).bind(this)}>Go to Googleplex</button>
	      </div>
	      <div style={mapDivStyle}>
	        <div ref="map" style={mapStyle}>I should be a map!</div>
	      </div>
	      <div>
					<div ref="panel">Hack Reactor to Tempest!!! Drink on my hacking drunkards!</div>
				</div>
      </div>
    );
  }
}

module.exports = Map;

