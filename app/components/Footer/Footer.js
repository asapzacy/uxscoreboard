import React from 'react'
import { Link } from 'react-router'
import Github from 'react-icons/lib/fa/github'
import Twitter from 'react-icons/lib/fa/twitter'
import { footerContainer, ux, github, tweeter } from './styles.css'

export default function Footer() {
  return (
    <footer className={footerContainer}>
      <Link className={ux} to='/'>{'uxscoreboard'}</Link>
      <a className={github} href='https://github.com/zacarellano/uxscoreboard'><Github /></a>
      <a className={tweeter} href='https://twitter.com/uxscoreboard'><Twitter /></a>
    </footer>
  )
}
