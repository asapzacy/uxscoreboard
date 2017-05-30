import React from 'react'
import s from './UpdateTime.scss'

const UpdateTime = ({ lastUpdated }) => (
  <footer className={s.container}>
    <span className={s.text}>
      <strong>{'last updated:'}</strong>
      {lastUpdated}
    </span>
  </footer>
)

export default UpdateTime
