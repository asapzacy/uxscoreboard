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
    <header className={matchupContainer}>
      <h1 className={matchupTeams}>{`${awayTeam} v. ${homeTeam}`}</h1>
      <h2 className={matchupDate}>{formatDateStr(date)}</h2>
      <h3 className={matchupLocation}>{`${venue} • ${location}`}</h3>
    </header>
  )
}

Matchup.propTypes = propTypes
