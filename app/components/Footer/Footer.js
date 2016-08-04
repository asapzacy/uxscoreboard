import React from 'react'
import { Link } from 'react-router'
import Twitter from 'react-icons/lib/fa/twitter'
import { footerContainer, ux, tweeter } from './styles.css'

export default function Footer() {
  return (
    <footer className={footerContainer}>
      <Link className={ux} to='/'>{'uxscoreboard'}</Link>
      <a className={tweeter} href='https://twitter.com/uxscoreboard'><Twitter /></a>
    </footer>
  )
}
