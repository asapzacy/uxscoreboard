import React from 'react'
import { Link } from 'react-router'
import { headerContainer, navContainer, logoContainer, logo, navItems,
  sportsLinks, navLinks, link, arrow } from './styles.css'

export default function Navigation() {
  return (
    <header className={headerContainer}>
      <nav className={navContainer}>
        <div className={logoContainer}>
          <Link to='/' className={logo}><img src='assets/img/uxscoreboard.svg' /></Link>
        </div>
        <ul className={navItems}>
          <ul className={sportsLinks}>
            <li><Link className={link} to='/mlb' activeClassName='active'>{'mlb'}</Link></li>
            <li><Link className={link} to='/nba' activeClassName='active'>{'nba'}</Link></li>
            <li><Link className={link} to='/nfl' activeClassName='active'>{'nfl'}</Link></li>
            <li><Link className={link} to='/nhl' activeClassName='active'>{'nhl'}</Link></li>
          </ul>
          <ul className={navLinks}>
            <li><Link className={link} to='/about' activeClassName='active'>{'about'}</Link></li>
            <li><a className={link} href='https://github.com/zacarellano/uxscoreboard'>{'source'}</a></li>
          </ul>
        </ul>
      </nav>
    </header>
  )
}
