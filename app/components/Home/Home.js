import React from 'react'
import { Link } from 'react-router'
import { homeContainer, uxscoreboard, name, description, leagueMenu, leagueList,
  leagueItem, leagueLink } from './styles.css'

export default function Home() {
  return (
    <div className={homeContainer}>
      <div className={uxscoreboard}>
        <h1 className={name}>{'uxscoreboard'}</h1>
        <h2 className={description}>{'live sports scoreboard built on react.js'}</h2>
      </div>
      <nav className={leagueMenu}>
        <menu className={leagueList}>
          <li className={leagueItem}><Link className={leagueLink} to='/mlb'>{'mlb'}</Link></li>
          <li className={leagueItem}><Link className={leagueLink} to='/nba'>{'nba'}</Link></li>
          <li className={leagueItem}><Link className={leagueLink} to='/nfl'>{'nfl'}</Link></li>
          <li className={leagueItem}><Link className={leagueLink} to='/nhl'>{'nhl'}</Link></li>
        </menu>
      </nav>
    </div>
  )
}
