import React from 'react'
import { Link } from 'react-router'
import Item from './Item'
import Extra from './Extra'
import Footer from './Footer'
import { app_pages } from 'data/app_pages'
import s from './Header.scss'

const Menu = ({ menuHeight, screenWidth }) => (
  <nav className={s.menu} style={{maxHeight:menuHeight}}>
    <menu className={s.list}>
      { app_pages.mainLinks.map((el, i) => (
        <Item {...el} screenWidth={screenWidth} key={i} />)
      )}
      <span className={s.block}></span>
      { app_pages.extraLinks.map((el, i) => (
        <Extra {...el} key={i} />)
      )}
    </menu>
    { screenWidth < 667 && <Footer /> }
  </nav>
)

export default Menu
