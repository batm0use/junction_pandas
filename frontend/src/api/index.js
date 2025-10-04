import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api'

export async function getHealth(){
  const res = await axios.get(`${API_BASE}/health`)
  return res.data
}

export async function sendMessageToAssistant(message){
  // placeholder - POST to your FastAPI endpoint when implemented
  const res = await axios.post(`${API_BASE}/assistant`, { message })
  return res.data
}

// New API placeholders
export async function getMyLocation(){
  const res = await axios.get(`${API_BASE}/my_location`)
  return res.data
}

export async function getNearbyPlaces(){
  const res = await axios.get(`${API_BASE}/nearby_places`)
  return res.data
}

export default { getHealth, sendMessageToAssistant, getMyLocation, getNearbyPlaces }
