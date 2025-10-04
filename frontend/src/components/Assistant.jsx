import React, { useState } from 'react'
import api from '../api'

export default function Assistant(){
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  async function send(){
    if(!input) return
    setLoading(true)
    setMessages(prev => [...prev, { role: 'user', text: input }])
    try{
      const resp = await api.sendMessageToAssistant(input)
      setMessages(prev => [...prev, { role: 'assistant', text: resp.reply || 'ok' }])
    }catch(e){
      setMessages(prev => [...prev, { role: 'assistant', text: 'Error' }])
    }finally{
      setLoading(false)
      setInput('')
    }
  }

  async function fetchMyLocation(){
    try{
      const loc = await api.getMyLocation()
      setMessages(prev => [...prev, { role: 'assistant', text: `My location: ${loc.x}, ${loc.y}` }])
    }catch(e){
      setMessages(prev => [...prev, { role: 'assistant', text: 'Failed to fetch location' }])
    }
  }

  async function fetchNearby(){
    try{
      const places = await api.getNearbyPlaces()
      setMessages(prev => [...prev, { role: 'assistant', text: `Nearby: ${JSON.stringify(places)}` }])
    }catch(e){
      setMessages(prev => [...prev, { role: 'assistant', text: 'Failed to fetch nearby places' }])
    }
  }

  return (
    <div className="assistant">
      <div className="messages">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.role}`}><span>{m.text}</span></div>
        ))}
      </div>
      <div className="compose">
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask the assistant..." />
        <button onClick={send} disabled={loading}>{loading? '...' : 'Send'}</button>
        <button onClick={fetchMyLocation} className="btn">My Location</button>
        <button onClick={fetchNearby} className="btn">Nearby</button>
      </div>
    </div>
  )
}
