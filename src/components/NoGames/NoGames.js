import React from 'react'
import s from './NoGames.scss'

const NoGames = ({ text }) => (
  <li className={s.container}>
    <span className={s.text}>{text}</span>
  </li>
)

export default NoGames
