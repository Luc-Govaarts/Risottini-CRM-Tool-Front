import React, { useState} from 'react'
import { useHistory } from 'react-router-dom'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Typography, Button} from '@material-ui/core'

export default function HomePageMap(props) {
    const [activeLead, setActiveLead] = useState(null)
    const leads = props.leads
    const history = useHistory()

    const handleMoreInfo = () => {
        history.push(`/leads/${activeLead.id}`)
      }

    return (
            <Map center={[52.370216, 4.895168]} zoom={14}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> 
                    contributors' 
                /> 
                {leads.map(lead => {
                    return <Marker
                            key={lead.id}
                            position={[lead.lat, lead.lng]}
                            onClick={() => {
                                setActiveLead(lead)
                            }}/>})}
                {activeLead && (  
                    <Popup 
                        position={[activeLead.lat, activeLead.lng]}
                        onClose={() => {setActiveLead(null)}}>
                        <div>                  
                                <Typography variant="h5">{activeLead.company_name}</Typography>
                                <Button onClick={handleMoreInfo}>Meer info</Button>                           
                        </div>
                    </Popup>

                )}
            </Map>
    )
}
