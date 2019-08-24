import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Header.scss'

const Extra = ({ name, url, isOutsideSource }) => (
  <li className={s.extra}>
    {isOutsideSource ? (
      <a className={s.link} href={url} title={`uxscoreboard | ${name}`}>
        <span className={s.text}>{name}</span>
      </a>
    ) : (
      <NavLink
        className={s.link}
        to={`/${url}`}
        title={`uxscoreboard | ${name}`}
      >
        <span className={s.text}>{name}</span>
      </NavLink>
    )}
  </li>
)

export default Extra
