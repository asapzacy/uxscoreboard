import React from 'react'
import { Link } from 'react-router'
import { headerContainer, logoContainer, logo, trigger, triggerLineTop, triggerLineBottom,
  menuContainer, menuList, menuItem, menuBlock, menuLink, menuLinkExtra, menuOpen } from './styles.css'

export default function Header({isMenuOpen, menuHeight, triggerMenu}) {
  return (
    <header className={isMenuOpen ? menuOpen : headerContainer}>
      <div className={logoContainer}>
        <Link to='/'><img className={logo} src='/assets/img/uxscoreboard.svg'/></Link>
        <span className={trigger} onClick={triggerMenu}>
          <span className={triggerLineTop}></span>
          <span className={triggerLineBottom}></span>
        </span>
      </div>
      <nav className={menuContainer} style={{maxHeight:menuHeight}}>
        <menu className={menuList}>
          <li className={menuItem}><Link className={menuLink} to='/mlb' activeClassName='active'>{'mlb'}</Link></li>
          <li className={menuItem}><Link className={menuLink} to='/nba' activeClassName='active'>{'nba'}</Link></li>
          <li className={menuItem}><Link className={menuLink} to='/nfl' activeClassName='active'>{'nfl'}</Link></li>
          <li className={menuItem}><Link className={menuLink} to='/nhl' activeClassName='active'>{'nhl'}</Link></li>
          <li className={menuBlock}></li>
          <li className={menuItem}><Link className={menuLinkExtra} to='/about' activeClassName='active'>{'about'}</Link></li>
          <li className={menuItem}><a className={menuLinkExtra} href='https://github.com/zacarellano/uxscoreboard'>{'source'}</a></li>
        </menu>
      </nav>
    </header>
  )
}
