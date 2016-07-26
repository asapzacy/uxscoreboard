import React from 'react'
import { container, title, slogan } from './styles.css'

export default function Home(props) {
  return (
    <div className={container}>
      <h1 className={title}>{'uxscoreboard'}</h1>
      <p className={slogan}>{'live sports scoreboard built on react.js'}</p>
    </div>
  )
}
