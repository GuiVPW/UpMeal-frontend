/* eslint-disable indent */

import { useState } from 'react'

import { LatLngExpression } from 'leaflet'
import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet'

import { Shop } from '../../services/entities'
import { DraggableMarker } from '../DraggableMarker/DraggableMarker'

export interface PositionProps {
	lat: number
	lng: number
}

export interface MapProps {
	location: Pick<Shop, 'latitude' | 'longitude'>
	initialPosition: Pick<Shop, 'latitude' | 'longitude'>
	// eslint-disable-next-line no-unused-vars
	handleChangePosition: (position: PositionProps) => void
}

function MapEvents({ handleChangePosition }: Pick<MapProps, 'handleChangePosition'>) {
	// eslint-disable-next-line
	const map = useMapEvent('click', e => {
		const { lat, lng } = e.latlng
		handleChangePosition({ lat, lng })
	})

	return null
}

export const Map = ({ handleChangePosition, initialPosition, location }: MapProps) => {
	const [mapBoxToken] = useState(process.env.mapBoxToken)

	const centerCalc = (): LatLngExpression => {
		const latitudeCalc = location.latitude - location.latitude <= 0.2

		const longitudeCalc = location.longitude - location.longitude >= 0.2

		if (latitudeCalc || longitudeCalc) {
			return [location.latitude, location.longitude]
		}

		return [initialPosition.latitude, initialPosition.longitude]
	}

	return (
		<MapContainer
			center={centerCalc()}
			style={{ width: '100%', height: '350px' }}
			zoom={14}
			scrollWheelZoom={false}
			preferCanvas
		>
			<TileLayer
				url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${mapBoxToken}`}
			/>
			<MapEvents handleChangePosition={handleChangePosition} />
			{location.latitude &&
				location.longitude &&
				location.latitude !== 0 &&
				location.longitude !== 0 && (
					<DraggableMarker
						position={{ lat: location.latitude, lng: location.longitude }}
						handleChangePosition={handleChangePosition}
					/>
				)}
		</MapContainer>
	)
}

export default Map
