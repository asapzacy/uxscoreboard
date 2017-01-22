import React, { PropTypes } from 'react'
import { formatDateStr } from 'helpers/utils'
import { matchupContainer, matchupTeams, matchupDate, matchupLocation } from './styles.css'

const propTypes = {
  awayTeam: PropTypes.string.isRequired,
  homeTeam: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  venue: PropTypes.string.isRequired
}

export default function Matchup({ awayTeam, homeTeam, date, location, venue }) {
  return (
    <div className={matchupContainer}>
      <span className={matchupTeams}>{`${awayTeam} v. ${homeTeam}`}</span>
      <span className={matchupDate} dangerouslySetInnerHTML={formatDateStr(date)}></span>
      <span className={matchupLocation}>{`${venue} • ${location}`}</span>
    </div>
  )
}

Matchup.propTypes = propTypes
