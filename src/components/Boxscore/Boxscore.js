import React from 'react'
import { formatBoxscoreTableHead, formatBoxscoreTableBodyRow } from 'utils/boxscoreFns'
import s from './Boxscore.scss'

const Boxscore = ({ awayTeam, homeTeam, awayScore, homeScore, linescore, periods, totalPeriods, league, overtimes, children }) => (
  <section className={s.container}>
    <table className={s.table}>
      <thead className={s.head} dangerouslySetInnerHTML={formatBoxscoreTableHead(periods, totalPeriods, league, overtimes)} />
      <tbody className={s.body}>
        <tr dangerouslySetInnerHTML={formatBoxscoreTableBodyRow(awayTeam, awayScore, 'away', linescore, periods, totalPeriods, league)} />
        <tr dangerouslySetInnerHTML={formatBoxscoreTableBodyRow(homeTeam, homeScore, 'home', linescore, periods, totalPeriods, league)} />
      </tbody>
    </table>
    {children}
  </section>
)

export default Boxscore
