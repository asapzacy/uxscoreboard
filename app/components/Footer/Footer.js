import React from 'react'
import { Link } from 'react-router'
import Github from 'react-icons/lib/fa/github'
import Twitter from 'react-icons/lib/fa/twitter'
import { footerContainer, socialContainer, tweeter, github } from './styles.css'

const Footer = () => (
  <footer className={footerContainer}>
    <div className={socialContainer}>
      <a className={tweeter} href='https://twitter.com/uxscoreboard'><Twitter /></a>
      <a className={github} href='https://github.com/zacarellano/uxscoreboard'><Github /></a>
    </div>
  </footer>
)

export default Footer
