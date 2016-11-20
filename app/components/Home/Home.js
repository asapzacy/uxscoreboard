import React from 'react'
import { homeContainer, ux, slogan } from './styles.css'

export default function Home() {
  return (
    <div className={homeContainer}>
      <h1 className={ux}>{'ayyy'}</h1>
      <p className={slogan}>{'live sports scoreboard built on react.js'}</p>
    </div>
  )
}
