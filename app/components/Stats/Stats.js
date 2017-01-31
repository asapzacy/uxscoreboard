import React from 'react'
import { formatStatsTableHead, formatStatsTableBody } from 'helpers/statsFns'
import { statsContainer, statsTable, statsTableHead, statsTableBody } from './styles.css'

export default function Stats({ teams, ...stats }) {
  const statsHead = formatStatsTableHead(teams)
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
