import React from 'react'
import { Link } from 'react-router-dom'
import s from './Item.scss'

const Item = ({ league, url }) => (
  <li className={s.item}>
    <Link className={s[url]} to={`/${url}`} title={`${league} scores · uxscoreboard`}>
      {league}
    </Link>
  </li>
)

export default Item
