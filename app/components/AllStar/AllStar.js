import React from 'react'
import s from './AllStar.scss'

const AllStar = ({ league, img }) => (
  <section className={s.container}>
    <img className={s.logo} src={`/assets/img/${league}/other/${img}.svg`} />
  </section>
)

export default AllStar
