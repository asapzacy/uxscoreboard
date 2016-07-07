import React from 'react'
import { Link } from 'react-router'
import { container, title, slogan } from './styles.css'

export default function Mlb(props) {
  return (
    <div className={container}>
      <h1 className={title}>{'MLB scores'}</h1>
      <p className={slogan}>{'go Giants.'}</p>
    </div>
  )
}
