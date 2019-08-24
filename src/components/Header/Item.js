import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Header.scss'

const Item = ({ name, url, icon, screenWidth }) => (
  <li className={s.item}>
    <NavLink
      className={s.link}
      to={`/${url}`}
      title={`uxscoreboard | ${name} scores`}
    >
      <span className={s.text}>
        {screenWidth < 667 && (
          <span
            className={s.icon}
            style={{
              backgroundImage: `url('/assets/static/icons/${icon}.svg')`
            }}
          />
        )}
        {name}
      </span>
    </NavLink>
  </li>
)

export default Item
