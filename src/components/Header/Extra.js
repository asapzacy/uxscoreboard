import React from 'react'
import { Link } from 'react-router-dom'
import s from './Header.scss'

const Extra = ({ name, url, isOutsideSource }) => (
  <li className={s.extra}>
    {isOutsideSource ? (
      <a className={s.link} href={url} title={`uxscoreboard | ${name}`}>
        <span className={s.text}>{name}</span>
      </a>
    ) : (
      <Link className={s.link} to={`/${url}`} title={`uxscoreboard | ${name}`}>
        <span className={s.text}>{name}</span>
      </Link>
    )}
  </li>
)

export default Extra
