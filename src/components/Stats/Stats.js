import React from 'react'
import { formatStatsTableHead, formatStatsTableBody } from 'utils/statsFns'
import s from './Stats.scss'

const Stats = ({ teams, ...stats }) => (
  <section className={s.container}>
    <table className={s.table}>
      <thead className={s.head} dangerouslySetInnerHTML={formatStatsTableHead(teams)}></thead>
      <tbody className={s.body} dangerouslySetInnerHTML={formatStatsTableBody(stats)}></tbody>
    </table>
  </section>

)

export default Stats
