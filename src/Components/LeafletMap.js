import React from 'react'
import { Map, Marker, TileLayer } from 'react-leaflet'

export default function LeafletMap(props) {
    const lat = props.lat
    const lng = props.lng

    return (
            <Map center={[lat, lng]} zoom={14}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> 
                    contributors' 
                /> 

                <Marker key={props.id}
                        position={[lat, lng]}/>
            </Map>
    )
}
