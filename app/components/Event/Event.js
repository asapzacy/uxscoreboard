import React from 'react'
import s from './Event.scss'

const Event = ({ league, img }) => (
  <section className={s.container}>
    <img className={s.logo} src={`/assets/img/${league}/other/${img}.svg`} />
  </section>
)

export default Event
