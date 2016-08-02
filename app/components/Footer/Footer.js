import React from 'react'
import Twitter from 'react-icons/lib/fa/twitter'
import { footerContainer, twitter } from './styles.css'

export default function Footer() {
  return (
    <footer className={footerContainer}>
      <ul>
        <li><a className={twitter} href='https://twitter.com/asapzacy'><Twitter /></a></li>
      </ul>
    </footer>
  )
}
