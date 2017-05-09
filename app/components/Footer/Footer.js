import React from 'react'
import { Link } from 'react-router'
import { Social } from 'components'
import { footerContainer } from './styles.css'

const Footer = () => (
  <footer className={footerContainer}>
    <Social />
  </footer>
)

export default Footer
