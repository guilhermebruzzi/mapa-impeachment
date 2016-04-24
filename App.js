import React from 'react';
import update from 'react-addons-update';

import GoogleMap from "react-google-maps/lib/GoogleMap";
import GoogleMapLoader from "react-google-maps/lib/GoogleMapLoader";
import Marker from "react-google-maps/lib/Marker";
import InfoWindow from "react-google-maps/lib/InfoWindow";

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    const isMobile = (window.innerWidth < 768) ? true : false;

    this.state = {
      initialMarkers: props.markers,
      defaultZoom: (isMobile) ? 4 : 5,
      markers: update(props.markers, {$merge: {}}),
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

  handleMapClick() {
    this.state.markers.forEach((marker) => {
      marker.showInfo = false;
    });

    this.setState(this.state);
  }

  renderInfoWindow(ref, marker) {
    return (
      <InfoWindow
        key={`${ref}_info_window`}
        onCloseclick={this.handleMarkerClose.bind(this, marker)}>

        <div>
          Deputado: {marker.title} - {marker.state} <br /> Voto: {marker.vote}
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
              defaultZoom={this.state.defaultZoom}
              title='Mapa do impeachment (17/04/2016)'
              onClick={this.handleMapClick.bind(this)}
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
