import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { MapContainer, TileLayer, Popup, useMap, CircleMarker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const DELFT_CENTER = [51.9995, 4.3625]

function FlyToLocation({ location }){
  const map = useMap()

  useEffect(() => {
    if (!location || !map) return
    const { lat, lng } = location
    map.flyTo([lat, lng], 15, { duration: 0.8 })
  }, [location, map])

  return null
}

FlyToLocation.propTypes = {
  location: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }),
}

export default function MapView({ myLocation, points }){
  const center = myLocation ? [myLocation.lat, myLocation.lng] : DELFT_CENTER

  const renderPoints = points?.length ? points : []

  return (
    <div className="map-wrapper">
      <MapContainer center={center} zoom={15} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {renderPoints.map(p => (
          <CircleMarker key={p.id} center={[p.lat, p.lng]} radius={8} pathOptions={{ color: 'red', fillColor: 'red', fillOpacity: 0.85 }}>
            <Popup>{p.name}</Popup>
          </CircleMarker>
        ))}

        {myLocation && (
          <CircleMarker center={[myLocation.lat, myLocation.lng]} radius={10} pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.95 }}>
            <Popup>Your location</Popup>
          </CircleMarker>
        )}

        <FlyToLocation location={myLocation} />
      </MapContainer>
    </div>
  )
}

MapView.propTypes = {
  myLocation: PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }),
  points: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), lat: PropTypes.number, lng: PropTypes.number, name: PropTypes.string })),
}

MapView.defaultProps = {
  myLocation: null,
  points: null,
}
