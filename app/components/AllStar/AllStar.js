import React from 'react'
import { allStarContainer, allStarLogo } from './styles.css'

export default function AllStar({ league, img }) {
  return (
    <section className={allStarContainer}>
      <img className={allStarLogo} src={`/assets/img/${league}/other/${img}.svg`} />
    </section>
  )
}
