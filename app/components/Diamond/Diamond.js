import React from 'react'
import { createDiamondImg } from 'helpers/diamondFns'
import { diamondContainer, baseballField, infoContainer, ballStrikesOuts,
  runnersOnBase, hitterPitcher } from './styles.css'

export default function Diamond() {
  const img = createDiamondImg()
  return (
    <section className={diamondContainer}>
      <div className={baseballField}>
        <img src={`/assets/img/mlb/other/${img}.svg`} />
      </div>
      <div className={infoContainer}>
        <div className={ballStrikesOuts}>

        </div>

        <div className={runnersOnBase}>

        </div>

        <div className={hitterPitcher}>

        </div>
      </div>
    </section>
  )
}
