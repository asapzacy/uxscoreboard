import React from 'react'
import { Link } from 'react-router-dom'
import s from './Header.scss'

const Extra = ({ name, url, isOutsideSource }) => {
  const Component = isOutsideSource ? 'a' : Link
  const componentProps = isOutsideSource ? { href: url } : { to: `/${url}` }
  return (
    <li className={s.extra}>
      <Component className={s.link} title={`uxscoreboard | ${name}`} {...componentProps}>
        <span className={s.text}>{name}</span>
      </Component>
    </li>
  )
}

export default Extra
