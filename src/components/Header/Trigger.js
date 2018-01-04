import React from 'react'
import s from './Header.scss'

const Trigger = ({ triggerMenu }) => (
  <span className={s.trigger} onClick={triggerMenu}>
    <span className={s.triggerTop}></span>
    <span className={s.triggerBottom}></span>
  </span>
)

export default Trigger
