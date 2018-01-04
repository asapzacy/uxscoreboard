import React from 'react'
import s from './Panel.scss'

const Panel = ({ panel, isActive, fn }) => (
  <li className={isActive ? s.itemActive : s.item} onClick={() => fn(panel)}>
    {panel}
  </li>
)

export default Panel
