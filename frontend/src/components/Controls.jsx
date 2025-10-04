import React, { useState } from 'react'

export default function Controls({ setMyLocation }){
  const [lat, setLat] = useState('51.9995')
  const [lng, setLng] = useState('4.3625')

  const setDelft = () => setMyLocation({ lat: 51.9995, lng: 4.3625 })

  const applyCustom = () => {
    const parsedLat = parseFloat(lat)
    const parsedLng = parseFloat(lng)
    if (!isNaN(parsedLat) && !isNaN(parsedLng)) {
      setMyLocation({ lat: parsedLat, lng: parsedLng })
    }
  }

  return (
    <div className="controls">
      <button className="btn" onClick={setDelft}>Set My Location (Delft)</button>
      <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center', marginLeft: 8 }}>
        <input value={lat} onChange={e => setLat(e.target.value)} style={{ width: 110 }} aria-label="latitude" />
        <input value={lng} onChange={e => setLng(e.target.value)} style={{ width: 110 }} aria-label="longitude" />
        <button className="btn" onClick={applyCustom}>Set</button>
      </div>
      <button className="btn">Toggle Theme</button>
    </div>
  )
}

