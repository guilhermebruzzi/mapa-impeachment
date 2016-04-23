import getJson from './request';

const geoUFLocation = {
  AC: {lat: -9.975377, lng: -67.82489770000001},
  RR: {lat: 2.8235098, lng: -60.67583309999998},
  RJ: {lat: -22.9068467, lng: -43.17289649999998},
};

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
  getGeoLocation(uf) {
    const sign = (getRandomInt(0, 2) === 0) ? -1 : 1;
    const minDiff = 0.001;
    const randomDiff = sign * minDiff * getRandomInt(1, 1001);
    if (uf !== "AC" && uf !== "RR") {
      uf = "RJ";
    }
    return {lat: geoUFLocation[uf].lat + randomDiff, lng: geoUFLocation[uf].lng + randomDiff};
  },
  getMarkersFromJsonUrl(jsonUrl, callback) {
    getJson(jsonUrl, (json) => {
      let markers = [];
      const pinUpImage = getPinImage(pinUpColor);
      const pinDownImage = getPinImage(pinDownColor);
      json.forEach((vote) => {
        markers.push({
          position: utils.getGeoLocation(vote.UF),
          title: vote.Nome,
          icon: (vote.Voto === "A favor") ? pinUpImage : pinDownImage,
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
