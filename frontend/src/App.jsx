import React, { useState, useEffect } from 'react'
import MapView from './components/MapView'
import Assistant from './components/Assistant'
import Leaderboard from './components/Leaderboard'
import Controls from './components/Controls'
import api from './api'

const DEFAULT_LOCATION = { lat: 51.9995, lng: 4.3625 } // Delft

export default function App(){
  const [myLocation, setMyLocation] = useState(null)
  const [nearby, setNearby] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  // loading state is not currently used in UI; keep internal lifecycle handling

  useEffect(() => {
    let mounted = true
    async function init(){
      try{
        const loc = await api.getMyLocation()
        const location = loc?.lat && loc?.lng ? { lat: loc.lat, lng: loc.lng } : DEFAULT_LOCATION
        if(!mounted) return
        setMyLocation(location)

        const places = await api.getNearbyPlaces()
        if(mounted) setNearby(Array.isArray(places) ? places.map(p => ({ id: p.id, lat: p.lat ?? p.y ?? p[1], lng: p.lng ?? p.x ?? p[0], name: p.name })) : [])

        const lb = await api.getLeaderboard()
        if(mounted) setLeaderboard(Array.isArray(lb) ? lb : [])
      }catch(e){
        console.error('Failed to initialize app data', e)
        if(mounted) setMyLocation(DEFAULT_LOCATION)
      }
    }
    init()
    return () => { mounted = false }
  }, [])

  return (
    <div className="app-root dark">
      <aside className="sidebar">
        <h2>Leaderboard</h2>
        <Leaderboard items={leaderboard} />
      </aside>

      <div className="topbar">
        <h1>Junction Dashboard</h1>
        <Controls setMyLocation={setMyLocation} />
      </div>

      <div className="main">
        <div className="map-area">
          <MapView myLocation={myLocation} points={nearby} />
        </div>
      </div>

      <div className="assistant-area">
        <Assistant />
      </div>
    </div>
  )
}
