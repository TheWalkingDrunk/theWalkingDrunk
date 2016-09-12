import React from 'react';
import ReactDOM from 'react-dom';

// Get main React component.
var App = require('./index.jsx');

//If the user allowed the site to access geolocation,
//then find the user's location and pass it to the app.
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
  	var pos = position.coords.latitude + ', ' + position.coords.longitude;
    ReactDOM.render(<App startLoc={pos}/>, document.getElementById('app'));
  });
//If the user did not allow the page to access geolocation,
//then default to San Francisco.
} else {
	console.log('Geolocation not enabled by browser');
	ReactDOM.render(<App startLoc="SF"/>, document.getElementById('app'));
}


