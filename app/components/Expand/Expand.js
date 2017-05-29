import React from 'react'
import ArrowDown from 'react-icons/lib/io/ios-arrow-down'
import s from './expand.scss'

const Expand = ({ isExpanded }) => (
  <section className={s.container}>
    <span className={isExpanded ? s.iconExpanded : s.icon}>
      <ArrowDown />
    </span>
  </section>
)

export default Expand
