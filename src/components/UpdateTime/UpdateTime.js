import React from 'react'
import s from './UpdateTime.scss'

const UpdateTime = ({ lastUpdatedStr }) => (
  <footer className={s.container}>
    <span className={s.text}>
      <strong>{'last updated:'}</strong>
      {lastUpdatedStr}
    </span>
  </footer>
)

export default UpdateTime
