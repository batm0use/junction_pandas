import React from 'react'
import PropTypes from 'prop-types'

export default function Controls({ onRefreshNearby }){
  return (
    <div className="controls">
      <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center', marginLeft: 8 }}>
        <button className="btn" onClick={onRefreshNearby}>Refresh Nearby</button>
      </div>
      <button className="btn">Toggle Theme</button>
    </div>
  )
}

Controls.propTypes = {
  onRefreshNearby: PropTypes.func,
}

