import React from 'react'
import { Link } from 'react-router'
import { nflContainer, nflLink } from './styles.css'

export default function Nfl() {
  return (
    <ul className={nflContainer}>
      <li><Link className={nflLink} to='/nfl/scores'>{'scores'}</Link></li>
    </ul>
  )
}
