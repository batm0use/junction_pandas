import React, { useState, useEffect } from 'react'
import MapView from './components/MapView'
import Assistant from './components/Assistant'
import Leaderboard from './components/Leaderboard'
import Controls from './components/Controls'
import api from './api'

const DEFAULT_LOCATION = { lat: 51.9995, lng: 4.3625 } // Delft

// Try to get location from browser geolocation (promise)
function getBrowserLocation(timeout = 5000){
  if (!navigator?.geolocation) return Promise.reject(new Error('Geolocation not available'))

  return new Promise((resolve, reject) => {
    const onSuccess = (pos) => {
      clearTimeout(timer)
      resolve({ lat: pos.coords.latitude, lng: pos.coords.longitude })
    }

    const onError = (err) => {
      clearTimeout(timer)
      reject(err)
    }

    const timer = setTimeout(() => onError(new Error('Geolocation timeout')), timeout)
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { enableHighAccuracy: true, maximumAge: 10000, timeout })
  })
}

async function fetchBackendLocation(){
  try{
    const loc = await api.getMyLocation()
    if (loc?.lat && loc?.lng) return { lat: loc.lat, lng: loc.lng }
  }catch(e){
    console.warn('Backend my_location failed', e)
  }
  return null
}

export default function App(){
  const [myLocation, setMyLocation] = useState(null)
  const [nearby, setNearby] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  // loading state is not currently used in UI; keep internal lifecycle handling

  useEffect(() => {
    let mounted = true

    async function determineInitialLocation(){
      // Prefer browser-provided location, then backend, then default
      try{
        const location = await getBrowserLocation(5000)
        return location
      }catch(err){
        console.warn('Browser geolocation failed, falling back to backend', err)
        try{
          const loc = await api.getMyLocation()
          if (loc?.lat && loc?.lng) return { lat: loc.lat, lng: loc.lng }
        }catch(apiErr){
          console.warn('Backend my_location failed', apiErr)
        }
      }
      return DEFAULT_LOCATION
    }

    async function fetchNearbyForLocation(location){
      try{
        const places = await api.sendNearbyPlacesRequest(location)
        return Array.isArray(places) ? places : []
      }catch(e){
        console.warn('Failed to fetch nearby places with POST, falling back to GET', e)
        try{
          const places = await api.getNearbyPlaces()
          return Array.isArray(places) ? places : []
        }catch(inner){
          console.warn('Fallback GET nearby failed', inner)
          return []
        }
      }
    }

    async function init(){
      try{
        const location = await determineInitialLocation()
        if(!mounted) return
        setMyLocation(location)

        const places = await fetchNearbyForLocation(location)
        if(mounted) setNearby(places.map(p => ({ id: p.id, lat: p.lat ?? p.y ?? p[1], lng: p.lng ?? p.x ?? p[0], name: p.name })))

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

  // refresh handler to request nearby places again using current myLocation
  async function refreshNearby(){
    if(!myLocation) return
    try{
      const places = await api.sendNearbyPlacesRequest(myLocation)
      setNearby(Array.isArray(places) ? places.map(p => ({ id: p.id, lat: p.lat ?? p.y ?? p[1], lng: p.lng ?? p.x ?? p[0], name: p.name })) : [])
    }catch(e){
      console.warn('Refresh nearby failed', e)
    }
  }

  return (
    <div className="app-root dark">
      <aside className="sidebar">
        <h2>Leaderboard</h2>
        <Leaderboard items={leaderboard} />
      </aside>

      <div className="topbar">
        <h1>Junction Dashboard</h1>
  <Controls setMyLocation={setMyLocation} onRefreshNearby={refreshNearby} />
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
