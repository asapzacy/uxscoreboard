import React from 'react'
import { createDiamond } from 'helpers/diamondFns'
import { diamondContainer, baseballField } from './styles.css'

export default function Diamond() {
  const file = createDiamond()
  return (
    <section className={diamondContainer}>
      <div className={baseballField}>
        <img src={`/assets/img/mlb/other/${file}.svg`} />
      </div>
    </section>
  )
}
