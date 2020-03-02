import React from 'react'
import { NavLink } from 'react-router-dom'
import s from './Header.scss'

const Extra = ({ name, url, isExternal }) => (
  <li className={s.extra}>
    {isExternal ? (
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
