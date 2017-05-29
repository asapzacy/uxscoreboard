import React from 'react'
import BaseballField from './BaseballField'
import BSO from './BSO'
import s from './diamond.scss'

const Diamond = ({ balls, strikes, outs, inningState, offense }) => (
  <section className={s.container}>
    <div className={s.leftSide}>
      <BaseballField offense={offense} />
    </div>
    <div className={s.rightSide}>
      <section className={s.bsoContainer}>
        <BSO label={'B'} filled={balls} max={4} state={inningState} />
        <BSO label={'S'} filled={strikes} max={3} state={inningState} />
        <BSO label={'O'} filled={outs} max={3} state={inningState} />
      </section>
      <section className={s.runnersContainer}></section>
      <section className={s.matchupContainer}></section>
    </div>
  </section>
)

export default Diamond
