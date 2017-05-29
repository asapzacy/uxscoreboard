import React from 'react'
import { Link } from 'react-router'
import s from './Home.scss'

const Item = ({ league }) => (
  <li className={s.item}>
    <Link className={s[league]} to={`/${league}`}>{league}</Link></li>
)

export default Item
