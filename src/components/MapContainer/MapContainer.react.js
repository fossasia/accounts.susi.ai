import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
// eslint-disable-next-line
import { InfoWindow } from 'google-maps-react';

const styles = {
  mapWrapperStyle: {
    width: '100%',
    height: '300px',
  },
};

class MapContainer extends Component {
  static propTypes = {
    centerLat: PropTypes.number,
    centerLng: PropTypes.number,
    mapData: PropTypes.array,
    devicenames: PropTypes.array,
    rooms: PropTypes.array,
    macids: PropTypes.array,
    google: PropTypes.object,
  };

  componentDidUpdate() {
    this.loadMap();
  }

  loadMap() {
    const {
      google,
      centerLat,
      centerLng,
      mapData,
      devicenames,
      rooms,
      macids,
    } = this.props;
    if (google) {
      const maps = google.maps;

      // eslint-disable-next-line
      const mapRef = this.refs.map;
      // eslint-disable-next-line
      const node = ReactDOM.findDOMNode(mapRef);

      const mapConfig = {
        center: { lat: centerLat, lng: centerLng },
        zoom: 2,
        mapTypeId: 'roadmap',
      };

      this.map = new maps.Map(node, mapConfig);
      let infoWindow = new google.maps.InfoWindow();

      // Add markers to map
      mapData.forEach((location, index) => {
        // eslint-disable-next-line
        const marker = new google.maps.Marker({
          position: { lat: location.location.lat, lng: location.location.lng },
          map: this.map,
          title: 'Click to see device information.',
          devicename: devicenames[index],
          room: rooms[index],
          macid: macids[index],
        });

        google.maps.event.addListener(marker, 'click', function() {
          infoWindow.setContent(
            `Mac Address: ${marker.macid}<br/>Room: ${
              marker.room
            }<br/>Device name: ${marker.devicename}`,
          );
          infoWindow.open(this.map, marker);
        });
      });
    }
  }

  render() {
    const { mapWrapperStyle } = styles;

    return (
      // eslint-disable-next-line
      <div ref="map" style={mapWrapperStyle}>
        loading map...
      </div>
    );
  }
}

export default MapContainer;
