import React from 'react'
import { Link } from 'react-router'
import { headerContainer, menuOpen, logoContainer, logo, menuBtn, lineTop, lineBottom,
  navContainer, menuContainer, link, extrasLink } from './styles.css'

export default function Header({visible, height, toggleMenu}) {
  return (
    <header className={visible ? menuOpen : headerContainer}>
      <div className={logoContainer}>
        <Link to='/'><img className={logo} src='/assets/img/uxscoreboard.svg'/></Link>
        <span className={menuBtn} onClick={toggleMenu}>
          <span className={lineTop}></span>
          <span className={lineBottom}></span>
        </span>
      </div>
      <nav className={navContainer} style={{maxHeight:height}}>
        <ul className={menuContainer}>
          <li><Link className={link} to='/mlb' activeClassName='active'>{'mlb'}</Link></li>
          <li><Link className={link} to='/nba' activeClassName='active'>{'nba'}</Link></li>
          <li><Link className={link} to='/nfl' activeClassName='active'>{'nfl'}</Link></li>
          <li><Link className={link} to='/nhl' activeClassName='active'>{'nhl'}</Link></li>
          <div></div>
          <li><Link className={extrasLink} to='/about' activeClassName='active'>{'about'}</Link></li>
          <li><a className={extrasLink} href='https://github.com/zacarellano/uxscoreboard'>{'source'}</a></li>
        </ul>
      </nav>
    </header>
  )
}
