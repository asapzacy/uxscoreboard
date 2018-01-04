import React from 'react'
import Logo from './Logo'
import Trigger from './Trigger'
import Menu from './Menu'
import s from './Header.scss'

const Header = ({ isMenuOpen, menuHeight, screenWidth, triggerMenu }) => (
  <header className={isMenuOpen ? s.menuOpen : s.container}>
    <section className={s.innerContainer}>
      <Logo />
      <Trigger triggerMenu={triggerMenu} />
    </section>
    <Menu menuHeight={menuHeight} screenWidth={screenWidth} />
  </header>
)

export default Header
