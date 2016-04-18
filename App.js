import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      markers: [{
        position: {
          lat: -15.1756207,
          lng: -47.4374355,
        },
        key: `Deputado`,
        defaultAnimation: 2,
      }],
    };
  }

  render() {
    const markers = this.state.markers.map((marker, index) => {
      return (
        <Marker
          {...marker} />
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
              defaultZoom={3}
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
