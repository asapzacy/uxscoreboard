import React from 'react'
import {
  formatBoxScoreTableHead,
  formatBoxScoreTableBodyRow
} from 'helpers/boxScoreFns'
import s from './BoxScore.scss'

const BoxScore = ({
  awayTeam,
  homeTeam,
  awayScore,
  homeScore,
  linescore,
  periods,
  totalPeriods,
  league,
  overtimes,
  children
}) => (
  <section className={s.container}>
    <table className={s.table}>
      <thead
        className={s.head}
        dangerouslySetInnerHTML={formatBoxScoreTableHead(
          periods,
          totalPeriods,
          league,
          overtimes
        )}
      />
      <tbody className={s.body}>
        <tr
          dangerouslySetInnerHTML={formatBoxScoreTableBodyRow(
            awayTeam,
            awayScore,
            'away',
            linescore,
            periods,
            totalPeriods,
            league
          )}
        />
        <tr
          dangerouslySetInnerHTML={formatBoxScoreTableBodyRow(
            homeTeam,
            homeScore,
            'home',
            linescore,
            periods,
            totalPeriods,
            league
          )}
        />
      </tbody>
    </table>
    {children}
  </section>
)

export default BoxScore
