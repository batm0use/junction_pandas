import React from 'react'

const sample = [
  { id: 1, name: 'Alice', score: 120 },
  { id: 2, name: 'Bob', score: 100 },
  { id: 3, name: 'Carol', score: 90 },
]

export default function Leaderboard(){
  return (
    <div className="leaderboard">
      {sample.map(p => (
        <div key={p.id} className="player">
          <div className="name">{p.name}</div>
          <div className="score">{p.score}</div>
        </div>
      ))}
    </div>
  )
}
