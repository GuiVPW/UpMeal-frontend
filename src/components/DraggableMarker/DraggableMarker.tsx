import { useRef } from 'react'

import Leaflet, { LeafletEventHandlerFnMap } from 'leaflet'
import { Marker, MarkerProps } from 'react-leaflet'

import mapIcon from '../../lib/markerIcon'
import { PositionProps } from '../Map/Map'

export interface DraggableMarkerProps extends MarkerProps {
	position: PositionProps
	// eslint-disable-next-line no-unused-vars
	handleChangePosition: (position: PositionProps) => void
}

export const DraggableMarker = ({
	position,
	handleChangePosition,
	...rest
}: DraggableMarkerProps) => {
	const markerRef = useRef<Leaflet.Marker<any>>(null)

	const eventHandlers: LeafletEventHandlerFnMap = {
		dragend() {
			const marker = markerRef.current

			if (marker !== null) {
				const { lat, lng } = marker.getLatLng()
				handleChangePosition({ lat, lng })
			}
		}
	}

	return (
		<Marker
			draggable
			eventHandlers={eventHandlers}
			position={position}
			ref={markerRef}
			icon={mapIcon}
			{...rest}
		/>
	)
}

export default DraggableMarker
