import React from 'react'
import { Link } from 'react-router'
import s from './Header.scss'

const Item = ({ name, icon, screenWidth }) => (
  <li className={s.item}>
    <Link className={s.link} to={`/${name.toLowerCase()}`} title={`uxscoreboard | ${name} scores`} activeClassName='active'>
      <span className={s.text}>
        { screenWidth < 667 &&
          <span className={s.icon} style={{backgroundImage:`url('/assets/icons/${icon}.svg')`}}></span>
        }
        {name}
      </span>
    </Link>
  </li>
)

export default Item
