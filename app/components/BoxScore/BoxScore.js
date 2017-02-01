import React, { PropTypes } from 'react'
import { formatBoxScoreTableHead, formatBoxScoreTableBodyRow } from 'helpers/boxScoreFns'
import { boxScoreContainer, boxScoreTable, boxScoreTableHead, boxScoreTableBody,
  boxScoreTableRow } from './styles.css'

export default function BoxScore({ awayTeam, homeTeam, awayScore, homeScore,
  linescore, periods, totalPeriods, league, overtimes }) {
  const boxScoreHead = formatBoxScoreTableHead(periods, totalPeriods, league, overtimes)
  const awayTeamRow = formatBoxScoreTableBodyRow(awayTeam, awayScore, 'away', linescore, periods, totalPeriods, league)
  const homeTeamRow = formatBoxScoreTableBodyRow(homeTeam, homeScore, 'home', linescore, periods, totalPeriods, league)
  return (
    <section className={boxScoreContainer}>
      <table className={boxScoreTable}>
        <thead className={boxScoreTableHead} dangerouslySetInnerHTML={boxScoreHead}></thead>
        <tbody className={boxScoreTableBody}>
          <tr className={boxScoreTableRow} dangerouslySetInnerHTML={awayTeamRow}></tr>
          <tr className={boxScoreTableRow} dangerouslySetInnerHTML={homeTeamRow}></tr>
        </tbody>
      </table>
    </section>
  )
}
