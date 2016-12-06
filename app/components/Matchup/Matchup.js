import React, { PropTypes } from 'react'
import { formatDateStr } from 'helpers/utils'
import { matchupContainer, who, when, where } from './styles.css'

const propTypes = {
  awayTeam: PropTypes.string.isRequired,
  homeTeam: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  venue: PropTypes.string.isRequired
}

export default function Matchup({ awayTeam, homeTeam, date, location, venue}) {
  return (
    <div className={matchupContainer}>
      <span className={who}>{`${awayTeam} v. ${homeTeam}`}</span>
      <span className={when} dangerouslySetInnerHTML={formatDateStr(date)}></span>
      <span className={where}>{`${venue} • ${location}`}</span>
    </div>
  )
}

Matchup.propTypes = propTypes
