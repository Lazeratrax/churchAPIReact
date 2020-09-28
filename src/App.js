import React, { Component } from 'react';
import { GoogleMap, LoadScript, MarkerClusterer, Marker } from '@react-google-maps/api';
import './App.css';

const url = `https://apiv4.updateparishdata.org/Churchs/?lat=40.730610&long=-73.935242&pg=1`;

const containerStyle = {
  width: '1000px',
  height: '700px'
};

const center = {
  lat: 40.730610,
  lng: -73.935242
};

async function getCoord(){
    const response = await fetch(url);
    const data = await response.json();
    const coordinates = await data
    .map( e => ({ 
      lat: e.latitude,
      long: e.longitude }));
    console.log('coordinates', coordinates);
    return coordinates
}

 getCoord().then((value) => {
   function createKey(coordinates) {
    return coordinates.lat + coordinates.long
    }
 })
 console.log('coordinates', this.coordinates);

const options = {
  imagePath:
    'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
}

class App extends Component {
  render() {
    return (
      <LoadScript
        googleMapsApiKey="AIzaSyBYV7oryNHsHRTiHBhTAhAJAgkkN7-RsnI"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={3}
        >
         <MarkerClusterer options={options}>
          {(clusterer) =>
            coordinates.map((location) => (
              <Marker key={createKey(location)} position={location} clusterer={clusterer} />
            ))
          }
        </MarkerClusterer>
          <></>
        </GoogleMap>
      </LoadScript>
    )
  }
}

export default App;



