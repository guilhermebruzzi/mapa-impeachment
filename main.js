import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import utils from './utils';


window.initMap = () => {
  utils.getMarkersFromJsonUrl("mapa-congresso.json", (markers) => {
    ReactDOM.render(<App markers={markers}/>, document.getElementById('map'));
  });
};
