import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

window.initMap = () => {
  ReactDOM.render(<App />, document.getElementById('map'));
};
