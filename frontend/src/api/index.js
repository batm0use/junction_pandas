import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000/'

export async function getHealth(){
  const res = await axios.get(`${API_BASE}/health`)
  return res.data
}

export async function sendMessageToAssistant(message){
  // placeholder - POST to your FastAPI endpoint when implemented
  const res = await axios.post(`${API_BASE}/assistant`, { message })
  return res.data
}

export default { getHealth, sendMessageToAssistant }
