import React from 'react'
import { formatBoxscoreTableHead, formatBoxscoreTableBodyRow } from 'helpers/boxScoreFns'
import s from './Boxscore.scss'

const Boxscore = ({ awayTeam, homeTeam, awayScore, homeScore, linescore, periods, totalPeriods, league, overtimes, children }) => (
  <section className={s.container}>
    <table className={s.table}>
      <thead className={s.head} dangerouslySetInnerHTML={formatBoxscoreTableHead(periods, totalPeriods, league, overtimes)}></thead>
      <tbody className={s.body}>
        <tr dangerouslySetInnerHTML={formatBoxscoreTableBodyRow(awayTeam, awayScore, 'away', linescore, periods, totalPeriods, league)}></tr>
        <tr dangerouslySetInnerHTML={formatBoxscoreTableBodyRow(homeTeam, homeScore, 'home', linescore, periods, totalPeriods, league)}></tr>
      </tbody>
    </table>
    {children}
  </section>
)

export default Boxscore
