import React from 'react'
import { Link } from 'react-router'
import ArrowRight from 'react-icons/lib/fa/angle-double-right'
import { headerContainer, navContainer, logoContainer, logo, navItems,
  sportsLinks, navLinks, link, arrow } from './styles.css'

export default function Navigation() {
  return (
    <header className={headerContainer}>
      <nav className={navContainer}>
        <div className={logoContainer}>
          <Link to='/' className={logo}><img src='assets/img/logo.svg' /></Link>
        </div>
        <ul className={navItems}>
          <ul className={sportsLinks}>
            <li><Link className={link} to='/mlb' activeClassName='active'>{'mlb'}</Link></li>
            <small><ArrowRight className={arrow} /></small>
            <li><small><Link className={link} to='/mlb/scores' activeClassName='active'>{'scores'}</Link></small></li>
            <li><small><Link className={link} to='/mlb/standings' activeClassName='active'>{'standings'}</Link></small></li>
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
