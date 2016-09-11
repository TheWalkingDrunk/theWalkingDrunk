import React from 'react';
import ReactDOM from 'react-dom';

// Get main React component.
const App = require('./index.jsx');


if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
  	const pos = position.coords.latitude + ', ' + position.coords.longitude;
    ReactDOM.render(<App startLoc={pos}/>, document.getElementById('app'));
  });
} else {
	console.log('Geolocation not enabled by browser');
	ReactDOM.render(<App />, document.getElementById('app'));
}


