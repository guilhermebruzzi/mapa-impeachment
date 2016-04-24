import getJson from './request';
import geoUFLocation from './brazil-uf-location';

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const pinUpColor = "488214";
const pinDownColor = "cc0000";

const getPinImage = (pinColor) => {
  return new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34));
};

const utils = {
  getRandomDiff() {
    const minDiff = 0.002;
    const sign = (getRandomInt(0, 2) === 0) ? -1 : 1;
    return sign * minDiff * getRandomInt(1, 1001);
  },
  getGeoLocation(uf) {
    const randomLatDiff = this.getRandomDiff();
    const randomLngDiff = this.getRandomDiff();
    if (typeof geoUFLocation[uf] === "undefined") {
      uf = "RJ";
    }
    return {lat: geoUFLocation[uf].lat + randomLatDiff, lng: geoUFLocation[uf].lng + randomLngDiff};
  },
  getMarkersFromJsonUrl(jsonUrl, callback) {
    getJson(jsonUrl, (json) => {
      let markers = [];
      const pinUpImage = getPinImage(pinUpColor);
      const pinDownImage = getPinImage(pinDownColor);
      json.forEach((vote) => {
        markers.push({
          position: this.getGeoLocation(vote.UF),
          title: vote.Nome,
          icon: (vote.Voto === "A favor") ? pinUpImage : pinDownImage,
          vote: vote.Voto,
          state: vote.UF,
          region: vote.Regiao,
          defaultAnimation: 2,
          showInfo: false,
        });
      });
      callback(markers);
    });
  }
};

export default utils;
