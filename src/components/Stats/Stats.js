import React from 'react'
import { formatStatsTableHead, formatStatsTableBody } from 'helpers/statsFns'
import s from './Stats.scss'

const Stats = ({ teams, ...stats }) => (
  <section className={s.container}>
    <table className={s.table}>
      <thead
        className={s.head}
        dangerouslySetInnerHTML={formatStatsTableHead(teams)}
      />
      <tbody
        className={s.body}
        dangerouslySetInnerHTML={formatStatsTableBody(stats)}
      />
    </table>
  </section>
)

export default Stats
