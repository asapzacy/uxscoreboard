import React from 'react'
import { createBsoCount } from 'helpers/baseball'
import s from './BallStrikeOut.scss'

const BallStrikeOut = ({ label, filled, max, state }) => (
  <div className={s.bso}>
    <h2 className={s.label}>{`${label}:`}</h2>
    <span dangerouslySetInnerHTML={createBsoCount(filled, max, state)}></span>
  </div>
)

export default BallStrikeOut
