import React from 'react';
import ReactDOM from 'react-dom';

// Get main React component.
var App = require('./index.jsx');


if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    var pos = position.coords.latitude + ', ' + position.coords.longitude;
    ReactDOM.render(<App startLoc={pos}/>, document.getElementById('app'));
  });
} else {
	console.log('Geolocation not enabled by browser');
	ReactDOM.render(<App />, document.getElementById('app'));
}


