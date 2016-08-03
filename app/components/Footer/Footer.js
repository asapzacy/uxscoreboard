import React from 'react'
import Twitter from 'react-icons/lib/fa/twitter'
import { footerContainer, ux, tweeter } from './styles.css'

export default function Footer() {
  return (
    <footer className={footerContainer}>
      <span className={ux}>{'uxscoreboard'}</span>
      <a className={tweeter} href='https://twitter.com/uxscoreboard'><Twitter /></a>
    </footer>
  )
}
