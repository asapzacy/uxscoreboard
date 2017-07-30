import React from 'react'
import s from './Logo.scss'

const Logo = ({ src, name, hasLoaded, fn }) =>
  <img
    style={{ opacity: hasLoaded && 1 }}
    src={src}
    alt={`${name} logo | uxscoreboard`}
    onLoad={fn}
    className={s.container}
  />

export default Logo
