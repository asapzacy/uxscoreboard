import React from 'react'
import s from './Logo.scss'

const Logo = ({ src, name, hasLoaded, logoHasLoaded }) => (
  <img
    style={{opacity:hasLoaded && 1}}
    src={src}
    alt={`${name} logo | uxscoreboard`}
    onLoad={logoHasLoaded}
    className={s.container}
  />
)

export default Logo