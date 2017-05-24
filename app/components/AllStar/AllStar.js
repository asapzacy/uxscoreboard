import React from 'react'
import { allStarContainer, allStarLogo } from './styles.css'

const AllStar = ({ league, img }) => (
  <section className={allStarContainer}>
    <img className={allStarLogo} src={`/assets/img/${league}/other/${img}.svg`} />
  </section>
)

export default AllStar
