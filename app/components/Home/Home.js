import React from 'react'
import { Link } from 'react-router'
import { homeContainer, companyInfo, title, slogan, leaguesInfo,
  leagueList, leagueLink } from './styles.css'

export default function Home() {
  return (
    <div className={homeContainer}>
      <div className={companyInfo}>
        <h1 className={title}>{'uxscoreboard'}</h1>
        <h2 className={slogan}>{'live sports scoreboard built on react.js'}</h2>
      </div>
      <div className={leaguesInfo}>
        <ul className={leagueList}>
          <li><Link className={leagueLink} to='/mlb'>{'mlb'}</Link></li>
          <li><Link className={leagueLink} to='/nba'>{'nba'}</Link></li>
          <li><Link className={leagueLink} to='/nfl'>{'nfl'}</Link></li>
          <li><Link className={leagueLink} to='/nhl'>{'nhl'}</Link></li>
        </ul>
      </div>

    </div>
  )
}
