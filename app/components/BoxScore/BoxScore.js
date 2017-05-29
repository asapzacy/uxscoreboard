import React from 'react'
import { formatBoxScoreTableHead, formatBoxScoreTableBodyRow } from 'helpers/boxScoreFns'
import s from './boxscore.scss'

const BoxScore = ({ awayTeam, homeTeam, awayScore, homeScore, linescore, periods, totalPeriods, league, overtimes, children }) => (
  <section className={s.container}>
    <table className={s.table}>
      <thead className={s.tableHead} dangerouslySetInnerHTML={formatBoxScoreTableHead(periods, totalPeriods, league, overtimes)}></thead>
      <tbody className={s.tableBody}>
        <tr dangerouslySetInnerHTML={formatBoxScoreTableBodyRow(awayTeam, awayScore, 'away', linescore, periods, totalPeriods, league)}></tr>
        <tr dangerouslySetInnerHTML={formatBoxScoreTableBodyRow(homeTeam, homeScore, 'home', linescore, periods, totalPeriods, league)}></tr>
      </tbody>
    </table>
    {children}
  </section>
)

export default BoxScore
