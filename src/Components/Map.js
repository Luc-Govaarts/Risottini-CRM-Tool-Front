import React from 'react'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

export const MyMapComponent = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyCorJd0dH9Tv2ZvXGyZecaKa911rjfP0Do&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ width: 'auto', 
                                        height: `800px`,
                                        margin: '25px',
                                        padding: `10px`,}} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap
    )((props) =>
      <GoogleMap
        defaultZoom={9}
        defaultCenter={{ lat: 52.379189, lng: 4.899431 }}
      >
       {props.markers.map(marker => (
            <Marker
            position={{ lat: marker.latitude, lng: marker.longitude }}
            key={marker.id}
            />))}
      </GoogleMap>
    )
