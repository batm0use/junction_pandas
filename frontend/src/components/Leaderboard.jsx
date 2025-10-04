import React from 'react'

const sample = [
  { id: 1, name: 'Alice', score: 120 },
  { id: 2, name: 'Bob', score: 100 },
  { id: 3, name: 'Carol', score: 90 },
]

export default function Leaderboard({ items }){
  const list = Array.isArray(items) && items.length ? items : sample
  return (
    <div className="leaderboard">
      {list.map(p => (
        <div key={p.id} className="player">
          <div className="name">{p.name}</div>
          <div className="score">{p.score ?? p.points ?? ''}</div>
        </div>
      ))}
    </div>
  )
}

