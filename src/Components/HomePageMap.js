import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import L from 'leaflet'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import { Typography, Button } from '@material-ui/core'

export default function HomePageMap(props) {
	const [activeLead, setActiveLead] = useState(null)
	const leads = props.leads
	const history = useHistory()

	const getMarkerIcon = (salesCyclePhaseId) => {
		switch (salesCyclePhaseId) {
			case 1:
				return require('../Icons/white.png')
				break
			case 2:
				return require('../Icons/dark_blue.png')
				break
			case 3:
				return require('../Icons/light_blue.png')
				break
			case 4:
				return require('../Icons/turquoise.png')
				break
			case 5:
				return require('../Icons/green.png')
				break
			case 6:
				return require('../Icons/yellow.png')
				break
			case 7:
				return require('../Icons/red.png')
				break
			default:
				return require('../Icons/white.png')
		}
	}

	const getIcon = (lead) => {
		if (!lead) {
			return null
		} else {
			return L.icon({
				iconUrl: getMarkerIcon(lead.salesCyclePhase.id),
				iconSize: 38,
			})
		}
	}

	const handleMoreInfo = () => {
		history.push(`/leads/${activeLead.id}`)
	}

	return (
		<Map center={[52.370216, 4.895168]} zoom={14}>
			<TileLayer
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> 
                    contributors'
			/>
			{leads.map((lead) => {
				console.log('*****LEAD*****:', lead)
				return (
					<Marker
						key={lead.id}
						icon={getIcon(lead)}
						position={[lead.lat, lead.lng]}
						onClick={() => {
							setActiveLead(lead)
						}}
					/>
				)
			})}
			{activeLead && (
				<Popup
					position={[activeLead.lat, activeLead.lng]}
					onClose={() => {
						setActiveLead(null)
					}}>
					<div>
						<Typography variant='h5'>{activeLead.company_name}</Typography>
						<Button onClick={handleMoreInfo}>Meer info</Button>
					</div>
				</Popup>
			)}
		</Map>
	)
}
