import React from 'react'
import { aboutContainer, header, info } from './styles.css'

export default function About() {
  return (
    <div className={aboutContainer}>
      <h1 className={header}>{'about'}</h1>
      <p className={info}>{'coming soon'}</p>
    </div>
  )
}
