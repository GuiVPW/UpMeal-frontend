import { useRef } from 'react'

import Leaflet, { LeafletEventHandlerFnMap } from 'leaflet'
import { Marker } from 'react-leaflet'

import { PositionProps } from '../Map'
import mapIcon from '../icon'

export interface MarkerProps {
	position: PositionProps
	handleChangePosition: (position: PositionProps) => void
}

export const DraggableMarker = ({ position, handleChangePosition }: MarkerProps) => {
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
		/>
	)
}
