import React from 'react'
import { Link } from 'react-router-dom'
import s from './Header.scss'

const Item = ({ name, url, icon, screenWidth }) => (
  <li className={s.item}>
    <Link className={s.link} to={`/${url}`} title={`${name} scores · uxscoreboard`}>
      <span className={s.text}>
        { screenWidth < 667 && (
          <span className={s.icon} style={{backgroundImage: `url('/assets/public/icons/${icon}.svg')`}} />
        )}
        {name}
      </span>
    </Link>
  </li>
)

export default Item
