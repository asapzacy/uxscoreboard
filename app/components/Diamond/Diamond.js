import React from 'react'
import { createDiamondImage, ballsCount, strikesOutsCount } from 'helpers/diamondFns'
import { diamondContainer, baseballField, otherInfo, bsoContainer,
  bso, bsoHeading, bsoData, runnersOnBase, hitterPitcher } from './styles.css'

export default function Diamond() {
  const img = createDiamondImage()
  const config = {
    balls: '0',
    strikes: '0',
    outs: '0',
    inningState: ''
  }
  const ballsData = ballsCount(config.balls, config.inningState)
  const strikesData = strikesOutsCount(config.strikes, config.inningState)
  const outsData = strikesOutsCount(config.outs, config.inningState)
  return (
    <section className={diamondContainer}>
      <div className={baseballField}>
        <img src={`/assets/img/mlb/other/${img}.svg`} />
      </div>
      <div className={otherInfo}>

        <section className={bsoContainer}>
          <div className={bso}>
            <h2 className={bsoHeading}>{'B:'}</h2>
            <span dangerouslySetInnerHTML={ballsData}></span>
          </div>
          <div className={bso}>
            <h2 className={bsoHeading}>{'S:'}</h2>
            <span dangerouslySetInnerHTML={strikesData}></span>
          </div>
          <div className={bso}>
            <h2 className={bsoHeading}>{'O:'}</h2>
            <span dangerouslySetInnerHTML={outsData}></span>
          </div>
        </section>

        <section className={runnersOnBase}></section>
        <section className={hitterPitcher}></section>
      </div>
    </section>
  )
}
