import React from 'react'
import { container, title, slogan } from './styles.css'


export default function Scoreboard({date}) {
  return (
    <div className={title}>
      <h1 className={title}>{'today is ' + date}</h1>
      <p className={slogan}>{'scores'}</p>
    </div>
  )
}
