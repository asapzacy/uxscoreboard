import React, { PropTypes } from 'react'
import { nbaStatsProps } from 'helpers/props/statsProps'
import { formatStatsTableHead, formatStatsTableBody } from 'helpers/statsFns'
import { statsContainer, statsTable, statsTableHead, statsTableBody } from './styles.css'

export default function Stats({ Teams, ...stats }) {
  const statsHead = formatStatsTableHead(Teams)
  const statsBody = formatStatsTableBody(stats)
  return (
    <section className={statsContainer}>
      <table className={statsTable}>
        <thead className={statsTableHead} dangerouslySetInnerHTML={statsHead}></thead>
        <tbody className={statsTableBody} dangerouslySetInnerHTML={statsBody}></tbody>
      </table>
    </section>
  )
}
