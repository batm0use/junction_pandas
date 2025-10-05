import React, { useState, useEffect } from 'react'
import MapView from './components/MapView'
import Assistant from './components/Assistant'
import Leaderboard from './components/Leaderboard'
import Controls from './components/Controls'
import Notifications from './components/Notifications'

import Carousel from './components/Carousel'
import api from './api'


const DEFAULT_LOCATION = { lat: 51.9995, lng: 4.3625 } // Delft
const BREAK_MESSAGE = "Hey, we noticed you have been working hard! Would you like to take a short break?"
// Configurable timings (change these values as needed)
const NOTIFICATION_WAIT_MS = 6000 // default notification auto-dismiss in milliseconds (6s)
const BREAK_INTERVAL_MS = 5 * 60 * 1000 // auto-trigger break every 5 minutes

/**
 * Try to get the user's current location from the browser Geolocation API.
 * Returns a Promise that resolves with an object { lat, lng } on success.
 * Rejects with an Error when geolocation is unavailable or the request times out.
 * @param {number} [timeout=5000] - milliseconds before the request is considered failed
 * @returns {Promise<{lat:number,lng:number}>}
 */
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

export default function App(){
  const [myLocation, setMyLocation] = useState(null)
  const [nearby, setNearby] = useState([])
  const [deliveries, setDeliveries] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [selectedDelivery, setSelectedDelivery] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [confirmOpen, setConfirmOpen] = useState(false)
  // loading state is not currently used in UI; keep internal lifecycle handling
  const [summary, setSummary] = useState({ remaining: 0, percentile: 0 })

  useEffect(() => {
    let mounted = true

    async function determineInitialLocation(){
          // Prefer browser-provided location, otherwise use default.
          try{
            const location = await getBrowserLocation(5000)
            return location
          }catch(err){
            console.warn('Browser geolocation failed — using default location', err)
          }
          return DEFAULT_LOCATION

    async function fetchSummary() {
    try {
      const userId = 'E10000' // Replace with actual logic
      const data = await api.getLeaderboardSummary(userId)
      setSummary(data)
    } catch (e) {
      console.error('Failed to fetch leaderboard summary', e)
    }
  }

  fetchSummary()
    }

    async function init(){
      try{
        const location = await determineInitialLocation()
        await fetchSummary()
        if(!mounted) return
        setMyLocation(location)

        // Do NOT fetch nearby places automatically — wait for user to click Refresh Nearby

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

  // Auto-trigger break confirmation every BREAK_INTERVAL_MS
  useEffect(() => {
    const id = setInterval(() => {
      // open confirmation modal periodically
      setConfirmOpen(true)
    }, BREAK_INTERVAL_MS)
    return () => clearInterval(id)
  }, [])

  /**
   * Fetch nearby places for the current `myLocation` by POSTing to the backend.
   * On success updates `nearby` state and shows a notification.
   * If there is no known `myLocation`, this function is a no-op.
   * @returns {Promise<void>}
   */
  async function refreshNearby(){
    if(!myLocation) return
    try{
      const places = await api.sendNearbyPlacesRequest(myLocation)
      setNearby(Array.isArray(places) ? places.map(p => ({ id: p.id, lat: p.lat ?? p.y ?? p[1], lng: p.lng ?? p.x ?? p[0], name: p.name })) : [])
      showNotification('Nearby updated', `Found ${places.length} places near you`)
    }catch(e){
      console.warn('Refresh nearby failed', e)
      showNotification('Nearby failed', 'Could not fetch nearby places')
    }
  }

  /**
   * Fetch delivery options from backend for current location.
   */
  async function fetchDeliveries(){
    if(!myLocation) return
    try{
      const list = await api.sendDeliveriesRequest(myLocation)
      setDeliveries(Array.isArray(list) ? list : [])
      // Show the result in the chat area as a message containing the carousel
      showNotification('Deliveries', `Found ${list.length} delivery options`)
    }catch(e){
      console.warn('Fetch deliveries failed', e)
      showNotification('Deliveries failed', 'Could not fetch deliveries')
    }
  }

  /**
   * Re-run browser geolocation to refresh `myLocation` and show a notification.
   * @returns {Promise<void>}
   */
  async function refreshLocation(){
    try{
      const loc = await getBrowserLocation(5000)
      setMyLocation(loc)
      showNotification('Location updated', `Lat ${loc.lat.toFixed(4)}, Lng ${loc.lng.toFixed(4)}`)
    }catch(e){
      console.warn('Refresh location failed', e)
      showNotification('Location failed', 'Could not update location')
    }
  }

  /**
   * Open the 'take a break' confirmation modal.
   * If the user confirms, it triggers refreshNearby().
   */
  function triggerBreak(){
    setConfirmOpen(true);
    api.playTTS(BREAK_MESSAGE).then();
  }

  /**
   * Called when the confirmation modal is answered.
   * @param {boolean} confirmed - true if user clicked Yes, false if No
   */
  function handleConfirm(confirmed){
    setConfirmOpen(false)
    if(confirmed){
      refreshNearby()
    }
  }

  /**
   * Push a new notification into the notifications list.
   * @param {{title:string,message:string}} item - notification payload
   * @returns {string} id - unique id for the created notification
   */
  function pushNotification(item){
    const id = `${Date.now()}-${Math.random().toString(36).slice(2,9)}`
    setNotifications(prev => [...prev, { id, ...item }])
    // schedule auto-dismiss
    setTimeout(() => {
      closeNotification(id)
    }, NOTIFICATION_WAIT_MS)
    return id
  }

  /**
   * Convenience wrapper to push a simple title/message notification.
   * @param {string} title
   * @param {string} message
   */
  function showNotification(title, message){
    pushNotification({ title, message })
  }

  /**
   * Remove a notification by id.
   * @param {string} id
   */
  function closeNotification(id){
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="app-root dark">
      <aside className="sidebar">
        <h2>Your Progress</h2>
        <Leaderboard summary={summary} />
      </aside>

      <div className="topbar">
    <h1>Junction Dashboard</h1>
  <Controls onRefreshNearby={refreshNearby} onRefreshLocation={refreshLocation} onTriggerBreak={triggerBreak} onGetDeliveries={fetchDeliveries} />
      </div>

      <div className="main">
          <div className="map-area">
          <MapView myLocation={myLocation} points={nearby} selectedDelivery={selectedDelivery} />
        </div>
      </div>

      <div className="assistant-area">
        <Assistant extraContent={deliveries && deliveries.length > 0 ? (
          <>
            <div className="msg assistant full-width">
              <div className="msg-text">
                <Carousel items={deliveries} selectedId={selectedDelivery?.id} onSelect={(it) => setSelectedDelivery(it)} />
              </div>
            </div>

            {selectedDelivery && (
              <div className="msg assistant full-width" style={{ marginTop: 8 }}>
                <div className="msg-text">
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>{selectedDelivery.name} — selected</div>
                  <div>Pickup: TODO FIX</div>
                  <div>Drop: {selectedDelivery.lat_drop.toFixed(6)}, {selectedDelivery.lng_drop.toFixed(6)}</div>
                  <div style={{ marginTop: 8, fontSize: 13, color: '#cfe9d6' }}>{selectedDelivery.extra_info}</div>
                </div>
              </div>
            )}
          </>
        ) : null} />
      </div>
      <Notifications items={notifications} onClose={closeNotification} />

      {confirmOpen && (
        <div className="confirm-overlay">
          <div className="confirm-modal">
            <div className="confirm-title">{BREAK_MESSAGE}</div>
            <div className="confirm-actions">
              <button className="btn" onClick={() => handleConfirm(true)}>Yes</button>
              <button className="btn" onClick={() => handleConfirm(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
