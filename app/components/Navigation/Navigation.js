import React from 'react'
import { Link } from 'react-router'
import ArrowRight from 'react-icons/lib/fa/angle-double-right'
import { header, navContainer, logoContainer, logo, navItems,
  sportsLinks, navLinks, link, arrow, littleLink } from './styles.css'

export default function Navigation(props) {
  return (
    <header className={header}>
      <nav className={navContainer}>
        <div className={logoContainer}>
          <Link to='/' className={logo}><img src='assets/img/logo.svg' /></Link>
        </div>
        <ul className={navItems}>
          <ul className={sportsLinks}>
            <li className={link}><Link to='/mlb' activeClassName='active'>{'mlb'}</Link></li>
            <small><ArrowRight className={arrow} /></small>
            <li className={littleLink}><small><Link to='/mlb/scores' activeClassName='active'>{'scores'}</Link></small></li>
            <li className={littleLink}><small><Link to='/mlb/standings' activeClassName='active'>{'standings'}</Link></small></li>
          </ul>
          <ul className={navLinks}>
            <li className={link}><Link to='/about' activeClassName='active'>{'about'}</Link></li>
            <li className={link}><a href='https://github.com/zacarellano/uxscoreboard'>{'source'}</a></li>
          </ul>
        </ul>
      </nav>
    </header>
  )
}
