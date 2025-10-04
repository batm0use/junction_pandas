import React from 'react'
import PropTypes from 'prop-types'

/**
 * Leaderboard summary component.
 * @param {{items: Array<{id:number,name:string,score:number}>}} props
 * @returns {JSX.Element}
 */
export default function Leaderboard({ summary }) {
  const { remaining, percentile } = summary ?? {}

  return (
    <div className="leaderboard-summary">
      <p>You are better than <strong>{percentile}%</strong> of users.</p>
      <p>You have <strong>{remaining}</strong> trips remaining to get a bonus.</p>
    </div>
  )
}

Leaderboard.propTypes = {
  summary: PropTypes.shape({
    remaining: PropTypes.number,
    percentile: PropTypes.number,
  }),
}

Leaderboard.propTypes = {
  items: PropTypes.array,
}


