import '../leaflet.css'
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet'
import L from 'leaflet'
import icon from '../images/icon-location.svg'
import React, { useContext } from 'react'
import { LocalizationContext } from './context/localizationProvider'

function Mapp() {
	const {  result } = useContext(LocalizationContext)

	let DefaultIcon = L.icon({
		iconUrl: icon,
		// iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
		// shadowUrl: iconShadow,
	})
	L.Marker.prototype.options.icon = DefaultIcon

	function FlyToPos() {
		const map = useMap()
		map.flyTo(result.ipok ? [result.lat, result.lng] : [50, 0], result.ipok ? 13 : 2)
	}

	return (
		<MapContainer center={[50, 0]} zoom={10} scrollWheelZoom={false} style={{ width: '100vw', height: '65vh' }}>
			<TileLayer
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			/>
			{result.ipok && <Marker position={[result.lat, result.lng]}></Marker>}
			<FlyToPos />
		</MapContainer>
	)
}

export default Mapp
