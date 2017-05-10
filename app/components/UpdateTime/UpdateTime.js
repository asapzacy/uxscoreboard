import React from 'react'
import { updateTimeContainer, updateTime } from './styles.css'

const UpdateTime = ({ lastUpdated }) => (
  <section className={updateTimeContainer}>
    <span className={updateTime}>
      <strong>{`last updated: `}</strong>
      {lastUpdated}
    </span>
  </section>
)

export default UpdateTime
