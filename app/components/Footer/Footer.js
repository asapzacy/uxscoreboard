import React from 'react'
import { Link } from 'react-router'
import Github from 'react-icons/lib/fa/github'
import Twitter from 'react-icons/lib/fa/twitter'
import { footerContainer, tweeter, github } from './styles.css'

export default function Footer() {
  return (
    <footer className={footerContainer}>
      <a className={tweeter} href='https://twitter.com/uxscoreboard'><Twitter /></a>
      <a className={github} href='https://github.com/zacarellano/uxscoreboard'><Github /></a>
    </footer>
  )
}
