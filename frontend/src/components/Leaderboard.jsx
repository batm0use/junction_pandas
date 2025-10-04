import React from 'react'
import PropTypes from 'prop-types'

export default function Leaderboard({ items }){
  const list = Array.isArray(items) ? items : []
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

Leaderboard.propTypes = {
  items: PropTypes.array,
}


