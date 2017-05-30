import React from 'react'
import { Link } from 'react-router'
import s from './Item.scss'

const Item = ({ league, url }) => (
  <li className={s.item}>
    <Link className={s[url]} to={`/${url}`} title={`uxscoreboard | ${league} scores`}>
      {league}
    </Link>
  </li>
)

export default Item
