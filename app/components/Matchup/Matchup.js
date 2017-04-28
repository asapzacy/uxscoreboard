import React from 'react'
import { formatDateStr } from 'helpers/utils'
import { matchupContainer, matchupTeams, matchupDate, matchupLocation } from './styles.css'

const Matchup = ({ awayTeam, homeTeam, date, location, venue }) => (
  <header className={matchupContainer}>
    <h1 className={matchupTeams}>{`${awayTeam} v. ${homeTeam}`}</h1>
    <h2 className={matchupDate}>{formatDateStr(date)}</h2>
    <h3 className={matchupLocation}>{`${venue} • ${location}`}</h3>
  </header>
)

export default Matchup
