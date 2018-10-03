import React from 'react'
import { Link } from 'react-router'
import s from './Header.scss'

const Item = ({ name, url, icon, screenWidth }) => (
  <li className={s.item}>
    <Link
      className={s.link}
      to={`/${url}`}
      title={`uxscoreboard | ${name} scores`}
      activeClassName="active"
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
    </Link>
  </li>
)

export default Item
