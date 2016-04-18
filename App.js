import React from 'react';
// import getJson from './request';
// getJson("https://raw.githubusercontent.com/schweller/mapa-impeachment/master/mapa-congresso.json", () => {});

import GoogleMap from "react-google-maps/lib/GoogleMap";
import GoogleMapLoader from "react-google-maps/lib/GoogleMapLoader";
import Marker from "react-google-maps/lib/Marker";
import InfoWindow from "react-google-maps/lib/InfoWindow";

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      markers: [{
        position: {
          lat: -15.1756207,
          lng: -47.4374355,
        },
        title: `Deputado`,
        state: `RR`,
        defaultAnimation: 2,
        showInfo: false
      }],
    };
  }

  //Toggle to 'true' to show InfoWindow and re-renders component
  handleMarkerClick(marker) {
    marker.showInfo = true;
    this.setState(this.state);
  }

  handleMarkerClose(marker) {
    marker.showInfo = false;
    this.setState(this.state);
  }

  renderInfoWindow(ref, marker) {
    return (
      <InfoWindow
        key={`${ref}_info_window`}
        onCloseclick={this.handleMarkerClose.bind(this, marker)}>

        <div>
          {marker.title} - {marker.state}
        </div>

      </InfoWindow>
    );
  }

  render() {
    const markers = this.state.markers.map((marker, index) => {
      const ref = `marker_${index}`;

      return ( <Marker
          key={index}
          ref={ref}
          {...marker}
          onClick={this.handleMarkerClick.bind(this, marker)}>
          {marker.showInfo ? this.renderInfoWindow(ref, marker) : null}
        </Marker>
      );
    });

    return (
      <section style={{width: "100%", height: "100%", position: "absolute", left: 0}}>
        <GoogleMapLoader
          containerElement={
            <div
              {...this.props}
              style={{
                height: "100%",
              }}
            />
          }
          googleMapElement={
            <GoogleMap
              ref={(map) => this.map = map}
              defaultZoom={4}
              title='Mapa do impeachment (17/04/2016)'
              defaultCenter={{lat: -15.1756207, lng: -47.4374355}}>
                {markers}
            </GoogleMap>
          }
        />
      </section>
    );
  }
}

export default App;
