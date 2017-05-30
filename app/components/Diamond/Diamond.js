import React from 'react'
import BaseballField from './BaseballField'
import BallStrikeOut from './BallStrikeOut'
import s from './Diamond.scss'

const Diamond = ({ balls, strikes, outs, inningState, offense }) => (
  <section className={s.container}>
    <div className={s.leftSide}>
      <BaseballField offense={offense} />
    </div>
    <div className={s.rightSide}>
      <section className={s.bsoContainer}>
        <BallStrikeOut label={'B'} filled={balls} max={4} state={inningState} />
        <BallStrikeOut label={'S'} filled={strikes} max={3} state={inningState} />
        <BallStrikeOut label={'O'} filled={outs} max={3} state={inningState} />
      </section>
      <section className={s.runnersContainer}></section>
      <section className={s.matchupContainer}></section>
    </div>
  </section>
)

export default Diamond
