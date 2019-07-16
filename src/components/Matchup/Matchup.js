import React from 'react'
import { formatDateStr } from 'helpers/utils'
import s from './Matchup.scss'

const Matchup = ({ awayTeam, homeTeam, date, location, venue }) => (
  <header className={s.container}>
    <h1 className={s.teams}>
      {awayTeam}
      <code>{' @ '}</code>
      {homeTeam}
    </h1>
    <h2 className={s.date}>{formatDateStr(date)}</h2>
    <h3 className={s.location}>{`${venue} · ${location}`}</h3>
  </header>
)

export default Matchup
