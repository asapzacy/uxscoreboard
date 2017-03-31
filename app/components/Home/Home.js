import React from 'react'
import { Link } from 'react-router'
import { homeContainer, uxscoreboard, name, description, leagueMenu,
  leagueList,leagueItem, leagueLink } from './styles.css'

const Home = () => (
  <div className={homeContainer}>
    <div className={uxscoreboard}>
      <h1 className={name}>{'uxscoreboard'}</h1>
      <h2 className={description}>{'live sports scoreboard built on react.js'}</h2>
    </div>
    <nav className={leagueMenu}>
      <menu className={leagueList}>
        <li className={leagueItem}><Link className={leagueLink} to='/mlb'>{'MLB'}</Link></li>
        <li className={leagueItem}><Link className={leagueLink} to='/nba'>{'NBA'}</Link></li>
        <li className={leagueItem}><Link className={leagueLink} to='/nfl'>{'NFL'}</Link></li>
        <li className={leagueItem}><Link className={leagueLink} to='/nhl'>{'NHL'}</Link></li>
      </menu>
    </nav>
  </div>
)

export default Home
