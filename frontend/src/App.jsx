import React from 'react'
import MapView from './components/MapView'
import Assistant from './components/Assistant'
import Leaderboard from './components/Leaderboard'
import Controls from './components/Controls'

export default function App(){
  return (
    <div className="app-root dark">
      <aside className="sidebar">
        <h2>Leaderboard</h2>
        <Leaderboard />
      </aside>

      <div className="topbar">
        <h1>Junction Dashboard</h1>
        <Controls />
      </div>

      <div className="main">
        <div className="map-area">
          <MapView />
        </div>
      </div>

      <div className="assistant-area">
        <Assistant />
      </div>
    </div>
  )
}
