import React from 'react'
import { Link } from 'react-router-dom'
import s from './Header.scss'

const Logo = () => (
  <Link to='/' title={'uxscoreboard'}>
    <img className={s.logo} src={'/assets/public/img/uxscoreboard.svg'} alt={'uxscoreboard'} />
  </Link>
)

export default Logo
