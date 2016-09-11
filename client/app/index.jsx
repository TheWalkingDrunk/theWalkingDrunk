import React from 'react';
const map = window.Map;

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startLoc: this.props.startLoc || 'SF',
      waypoints: [],
      current: {}
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
      const request = this.getRouteRequest();
      this.directionsService.route(request, (response, status) => {
        if (status == google.maps.DirectionsStatus.OK) {
          this.directionsDisplay.setDirections(response);
        }
      });
    }
  }

  getRouteRequest() {
    //need to calculate farthest away waypoint and set to endLoc
    const endLoc = this.state.waypoints[this.state.waypoints.length - 1];

    const request = {
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

    let address;
    if (this.state.waypoints[this.state.waypoints.length - 1]) {
      address = this.state.waypoints[this.state.waypoints.length - 1].location;
    } else if (this.refs.location.value) {
      address = this.refs.location.value;
    } else {
      address = this.state.startLoc;
    }
    
    this.getWaypoints(address, (results) => {
      this.setState({
        waypoints: results.waypoints.slice(0, 7),
        current: results.current
      });
    });
  }

  handleLocationSubmit(e) {
    e.persist();
    const startLoc = this.refs.location.value;
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
      const request = {
        location: latLng,
        types: ['bar'],
        rankBy: google.maps.places.RankBy.DISTANCE
      }
      //nearby search of coordinates of address
      this.placesService.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          //set new waypoint equal to first unvisited bar
          let i = 0;
          while (this.visited[results[i].vicinity]) {
            i++;
          }

          const waypoint = {
            location: results[i].vicinity,
            stopover: true
          };

          this.visited[waypoint.location] = true;

          const waypoints = this.state.waypoints.concat(waypoint);

          const results = {
            waypoints: waypoints,
            current: results[i]
          };

          callback(results);
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
      height: 500,
      width: 950,
    };
    
    const mapDivStyle = {
      border: '1px solid black',
      display: 'table',
      margin: '0 auto',
    }

    return (      
    	<div className="row">
        <div className="col s12 m4 l3">
          <div> 
            
            <div>
              <button className="btn waves-effect waves-light btn-large red lighten-2 z-depth-5" type="submit" name="action"
              onClick={this.handleNextBar.bind(this)}>Next Bar</button>
            </div>
             
            <div>
              <button className="btn waves-effect waves-light btn-large red lighten-2 z-depth-5" type="submit" name="action" 
              onClick={this.handleChangeBar.bind(this)}>Change Current Bar</button>
            </div>
          
          </div>
          
          <div>
            
            <form onSubmit={this.handleLocationSubmit.bind(this)}>
              <span>
              <input placeholder="Your location" type="text" ref="location"/>
              </span>
              <button className="btn waves-effect waves-light red lighten-2 z-depth-5" type="submit" name="action">Find
                <i className="material-icons right">send</i>
              </button>

            </form>
          
          </div>
        
        </div>

        <div className="col s12 m8 l9">
          
          <div style={mapDivStyle}> 
  	        <div ref="map" style={mapStyle}>I should be a map!</div>
  	      </div>
       
        </div>
  	      
        <div className="col s12 m12 l12">
					<div id="directions-panel" ref="panel"></div>
				</div>
      </div>
    );
  }
}

module.exports = Map;