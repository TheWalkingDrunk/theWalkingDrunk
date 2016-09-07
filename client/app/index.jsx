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

const WAYPOINTS = [
  {
    location: '757 Leavenworth San Francisco, CA',
    stopover: true
  },
  {
    location: 'Civic Center, SF',
    stopover: true
  },
  {
    location: 'Union Square, SF',
    stopover: true
  }
];

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startLoc: HACK_REACTOR,
      waypoints: WAYPOINTS
    };
  }
  
  // make use of React Software Component Lifecycle
  componentDidMount() {
    this.map = new google.maps.Map(this.refs.map, {
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();

    this.directionsDisplay.setMap(this.map);
    this.directionsDisplay.setPanel(this.refs.panel);

    var request = {
       origin: 'Hack Reactor, SF', 
       destination: 'Tempest, 431 Natoma St, San Francisco, CA 94103',
       travelMode: google.maps.DirectionsTravelMode.WALKING
     };

    if (this.state.waypoints.length > 0) {
      console.log(this.getRoute());
      request = this.getRoute();
    }

     this.directionsService.route(request, function(response, status) {
       if (status == google.maps.DirectionsStatus.OK) {
         this.directionsDisplay.setDirections(response);
       }
     }.bind(this));
  }
  
  componentDidUpdate() {
    if (this.state.waypoints.length > 0) {
      console.log('In update:', this.getRoute());
      var request = this.getRoute();

     this.directionsService.route(request, function(response, status) {
       if (status == google.maps.DirectionsStatus.OK) {
         this.directionsDisplay.setDirections(response);
       }
     }.bind(this));
    }
    //this.render();
  }

  panToGoogleplex(){
    this.map.panTo(GOOGLEPLEX);
  }

  panTo() {
    this.map.panTo(this.state.startLoc);
  }

  getRoute() {
    //need to calculate farthest away waypoint and set to endLoc
    var endLoc = this.state.waypoints[0];

    var request = {
      origin: this.state.startLoc,
      destination: endLoc.location,
      travelMode: google.maps.DirectionsTravelMode.WALKING,
      waypoints: this.state.waypoints,
      optimizeWaypoints: true
    }

    return request;
  }

  handleLocationSubmit(e) {
    e.preventDefault();
    this.setState({
      startLoc: this.refs.location.value
    });
    console.log(this.state.startLoc);
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
        <form onSubmit={this.handleLocationSubmit.bind(this)}>
          <input placeholder="Your location" type="text" ref="location"/>
        </form>
      {/*
        <div> 
          <button onClick={this.panTo.bind(this)}>Go to Hack Reactor</button>
          <button onClick={this.panToGoogleplex.bind(this)}>Go to Googleplex</button>
        </div>
      */}
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