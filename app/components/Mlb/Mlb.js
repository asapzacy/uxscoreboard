import React from 'react'
import { Link } from 'react-router'
import { mlbContainer, mlbLink } from './styles.css'

export default function Mlb() {
  return (
    <ul className={mlbContainer}>
      <li><Link className={mlbLink} to='/mlb/scores'>{'scores'}</Link></li>
      <li><Link className={mlbLink} to='/mlb/standings'>{'standings'}</Link></li>
    </ul>
  )
}
