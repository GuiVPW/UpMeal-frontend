import { MapContainer, Marker, TileLayer } from 'react-leaflet'

import mapIcon from '../../lib/markerIcon'
import { Shop } from '../../services/entities'

export interface MapProps {
	location: Pick<Shop, 'latitude' | 'longitude'>
}

export const StaticMap = ({ location }: MapProps) => {
	const mapBoxToken = process.env.mapBoxToken

	return (
		<MapContainer
			center={[location.latitude, location.longitude]}
			style={{ width: '100%', height: '280px' }}
			zoom={16}
			scrollWheelZoom={false}
			preferCanvas
			dragging={false}
			touchZoom={false}
			zoomControl={false}
			doubleClickZoom={false}
			attributionControl={false}
			tap={false}
		>
			<TileLayer
				url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${mapBoxToken}`}
			/>
			<Marker
				interactive={false}
				icon={mapIcon}
				position={[location.latitude, location.longitude]}
			/>
		</MapContainer>
	)
}

export default StaticMap
