import React from 'react'
import { Link } from 'react-router'
import { Social } from 'components'
import { headerContainer, menuOpen, logoContainer, logo, trigger, triggerTop,
  triggerBottom, menuContainer, menuList, menuItem, menuBlock, menuExtra,
  menuLink, menuLinkExtra, menuIcon, menuText, menuFooter } from './styles.css'

const Header = ({ isMenuOpen, menuHeight, screenWidth, triggerMenu }) => (
  <header className={isMenuOpen ? menuOpen : headerContainer}>
    <Logo triggerMenu={triggerMenu} />
    <Menu menuHeight={menuHeight} screenWidth={screenWidth} />
  </header>
)

export default Header


const Logo = ({ triggerMenu }) => (
  <section className={logoContainer}>
    <Link to='/' title={'uxscoreboard'}>
      <img className={logo} src={'/assets/img/uxscoreboard.svg'} alt={'uxscoreboard'} title={'uxscoreboard logo'} />
    </Link>
    <span className={trigger} onClick={triggerMenu}>
      <span className={triggerTop}></span>
      <span className={triggerBottom}></span>
    </span>
  </section>
)

const mainLinks = [
  { name: 'MLB', icon: 'baseball',  },
  { name: 'NBA', icon: 'basketball' },
  { name: 'NFL', icon: 'football'   },
  { name: 'NHL', icon: 'hockey'     }
]
const extraLinks = [
  { name: 'about' },
  { name: 'source', url: 'https://github.com/zacarellano/uxscoreboard' }
]

const Menu = ({ menuHeight, screenWidth }) => (
  <nav className={menuContainer} style={{maxHeight:menuHeight}}>
    <menu className={menuList}>
      { mainLinks.map((el, i) => <MenuItem {...el} screenWidth={screenWidth} key={i} />) }
      <span className={menuBlock}></span>
      { extraLinks.map((el, i) => <ExtraMenuItem {...el} key={i} />) }
    </menu>
    { screenWidth < 667 &&
      <footer className={menuFooter}>
        <Social />
      </footer>
    }
  </nav>
)


const MenuItem = ({ name, icon, screenWidth }) => (
  <li className={menuItem}>
    <Link className={menuLink} to={`/${name.toLowerCase()}`} title={`uxscoreboard | ${name} scores`} activeClassName='active'>
      <span className={menuText}>
        { screenWidth < 667 && <span className={menuIcon} style={{backgroundImage:`url('/assets/icons/${icon}.svg')`}}></span> }
        {name}
      </span>
    </Link>
  </li>
)


const ExtraMenuItem = ({ name, url }) => (
  <li className={menuExtra}>
    { url
      ? <a className={menuLinkExtra} href={url} title={`uxscoreboard | ${name}`}>
          <span className={menuText}>{name}</span>
        </a>
      : <Link className={menuLinkExtra} to={`/${name}`} title={`uxscoreboard | ${name}`} activeClassName={'active'}>
          <span className={menuText}>{name}</span>
        </Link>
    }
  </li>
)
