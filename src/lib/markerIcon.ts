import Leaflet from 'leaflet'

import mapMarkerImg from '../assets/marker.png'

export const mapIcon = Leaflet.icon({
	iconUrl: mapMarkerImg.src,
	iconSize: [58, 58],
	iconAnchor: [29, 68],
	popupAnchor: [0, -60]
})

export default mapIcon
