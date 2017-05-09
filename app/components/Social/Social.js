import React from 'react'
import TwitterOutline from 'react-icons/lib/io/social-twitter-outline'
import TwitterFull from 'react-icons/lib/io/social-twitter'
import GithubOutline from 'react-icons/lib/io/social-github-outline'
import GithubFull from 'react-icons/lib/io/social-github'
import { socialContainer, socialLink, iconOutline, iconFull } from './styles.css'

const Social = () => (
  <section className={socialContainer}>
    <a className={socialLink} href='https://twitter.com/uxscoreboard' title='uxscoreboard | twitter'>
      <span className={iconFull}><TwitterFull /></span>
      <span className={iconOutline}><TwitterOutline /></span>
    </a>
    <a className={socialLink} href='https://github.com/zacarellano/uxscoreboard' title='uxscoreboard | github'>
      <span className={iconFull}><GithubFull /></span>
      <span className={iconOutline}><GithubOutline /></span>
    </a>
  </section>
)

export default Social
