import React from 'react'
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

export const MyMapComponent = compose(
      withProps({
        googleMapURL: "",
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
            key={marker.id}
            position={{ lat: marker.latitude, lng: marker.longitude }}
            />))}
      </GoogleMap>
    )
