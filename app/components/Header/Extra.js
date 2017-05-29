import React from 'react'
import { Link } from 'react-router'
import s from './Header.scss'

const Extra = ({ name, url }) => (
  <li className={s.extra}>
    { url
      ? <a className={s.link} href={url} title={`uxscoreboard | ${name}`}>
          <span className={s.text}>{name}</span>
        </a>
      : <Link className={s.link} to={`/${name}`} title={`uxscoreboard | ${name}`} activeClassName={'active'}>
          <span className={s.text}>{name}</span>
        </Link>
    }
  </li>
)

export default Extra
