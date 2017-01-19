import React from 'react'
import { Link } from 'react-router'
import { headerContainer, logoContainer, logo, trigger, triggerTop,
  triggerBottom, menuContainer, menuList, menuItem, menuBlock, menuExtra,
  menuLink, menuLinkExtra, menuOpen } from './styles.css'

export default function Header({isMenuOpen, menuHeight, triggerMenu}) {
  return (
    <header className={isMenuOpen ? menuOpen : headerContainer}>
      <div className={logoContainer}>
        <Link to='/'><img className={logo} src='/assets/img/uxscoreboard.svg' alt={'uxscoreboard logo'}/></Link>
        <span className={trigger} onClick={triggerMenu}>
          <span className={triggerTop}></span>
          <span className={triggerBottom}></span>
        </span>
      </div>
      <nav className={menuContainer} style={{maxHeight:menuHeight}}>
        <menu className={menuList}>
          <li className={menuItem}><Link className={menuLink} to='/mlb' activeClassName='active'>{'MLB'}</Link></li>
          <li className={menuItem}><Link className={menuLink} to='/nba' activeClassName='active'>{'NBA'}</Link></li>
          <li className={menuItem}><Link className={menuLink} to='/nfl' activeClassName='active'>{'NFL'}</Link></li>
          <li className={menuItem}><Link className={menuLink} to='/nhl' activeClassName='active'>{'NHL'}</Link></li>
          <li className={menuBlock}></li>
          <li className={menuExtra}><Link className={menuLinkExtra} to='/about' activeClassName='active'>{'about'}</Link></li>
          <li className={menuExtra}><a className={menuLinkExtra} href='https://github.com/zacarellano/uxscoreboard'>{'source'}</a></li>
        </menu>
      </nav>
    </header>
  )
}
