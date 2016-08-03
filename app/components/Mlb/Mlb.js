import React from 'react'
import { Link } from 'react-router'
import { mlbContainer, mlbLinks, mlbLink } from './styles.css'

export default function Mlb() {
  return (
    <div className={mlbContainer}>
      <ul className={mlbLinks}>
        <li className={mlbLink}><Link to='/mlb/scores'>{'scores'}</Link></li>
        <li className={mlbLink}><Link to='/mlb/standings'>{'standings'}</Link></li>
      </ul>
    </div>
  )
}
