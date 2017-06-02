import React from 'react'
import Arrow from 'react-icons/lib/io/ios-arrow-down'
import s from './Expand.scss'

const Expand = ({ isExpanded }) => (
  <section className={s.container}>
    <span className={isExpanded ? s.iconExpanded : s.icon}>
      <Arrow />
    </span>
  </section>
)

export default Expand
