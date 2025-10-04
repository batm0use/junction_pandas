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

      <main className="main">
        <header className="topbar">
          <h1>Junction Dashboard</h1>
          <Controls />
        </header>

        <section className="map-area">
          <MapView />
        </section>

        <section className="assistant-area">
          <Assistant />
        </section>
      </main>
    </div>
  )
}
