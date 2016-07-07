import React from 'react'
import { Link } from 'react-router'
import { header, navContainer, logoContainer, logo, navItems,
  sportsLinks, navLinks, link } from './styles.css'

export default function Navigation(props) {
  return (
    <header className={header}>
      <nav className={navContainer}>
        <div className={logoContainer}>
          <Link to='/' className={logo}><img src='assets/img/logo.svg' /></Link>
        </div>
        <ul className={navItems}>
          <ul className={sportsLinks}>
            <li className={link}><Link to='/mlb' activeClassName='active'>{'MLB'}</Link></li>
            <li className={link}><Link to='/nba' activeClassName='active'>{'NBA'}</Link></li>
            <li className={link}><Link to='/nfl' activeClassName='active'>{'NFL'}</Link></li>
          </ul>
          <ul className={navLinks}>
            <li className={link}><Link to='/about' activeClassName='active'>{'about'}</Link></li>
            <li className={link}><a href='https://github.com/zacarellano'>{'source'}</a></li>
          </ul>
        </ul>
      </nav>
    </header>
  )
}
