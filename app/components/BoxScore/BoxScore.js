import React, { PropTypes } from 'react'
import { formatBoxScoreTableHead, formatBoxScoreTableBodyRow } from 'helpers/boxScoreFns'
import { boxScoreContainer, boxScoreTable, boxScoreTableHead, boxScoreTableBody, boxScoreTableRow } from './styles.css'

const BoxScore = ({ awayTeam, homeTeam, awayScore, homeScore,linescore, periods, totalPeriods, league, overtimes }) => (
  <section className={boxScoreContainer}>
    <table className={boxScoreTable}>
      <thead className={boxScoreTableHead} dangerouslySetInnerHTML={formatBoxScoreTableHead(periods, totalPeriods, league, overtimes)}></thead>
      <tbody className={boxScoreTableBody}>
        <tr className={boxScoreTableRow} dangerouslySetInnerHTML={formatBoxScoreTableBodyRow(awayTeam, awayScore, 'away', linescore, periods, totalPeriods, league)}></tr>
        <tr className={boxScoreTableRow} dangerouslySetInnerHTML={formatBoxScoreTableBodyRow(homeTeam, homeScore, 'home', linescore, periods, totalPeriods, league)}></tr>
      </tbody>
    </table>
  </section>
)

export default BoxScore
