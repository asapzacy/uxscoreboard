import React from 'react'
import ArrowDown from 'react-icons/lib/io/ios-arrow-down'
import { iconContainer, icon } from './styles.css'

const Expand = ({ isExpanded }) => (
  <section className={iconContainer}>
    <span className={icon} style={{transform: isExpanded && 'rotate(180deg) translateZ(0)'}}>
      <ArrowDown />
    </span>
  </section>
)

export default Expand
