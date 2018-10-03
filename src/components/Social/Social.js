import React from 'react'
import TwitterOutline from 'react-icons/lib/io/social-twitter-outline'
import TwitterFull from 'react-icons/lib/io/social-twitter'
import GithubOutline from 'react-icons/lib/io/social-github-outline'
import GithubFull from 'react-icons/lib/io/social-github'
import s from './Social.scss'

const Social = () => (
  <section className={s.container}>
    <a
      className={s.link}
      href="https://twitter.com/asapzacy"
      title="asapzacy | twitter"
    >
      <span className={s.iconFull}>
        <TwitterFull />
      </span>
      <span className={s.iconOutline}>
        <TwitterOutline />
      </span>
    </a>
    <a
      className={s.link}
      href="https://github.com/zacarellano/uxscoreboard"
      title="uxscoreboard | github"
    >
      <span className={s.iconFull}>
        <GithubFull />
      </span>
      <span className={s.iconOutline}>
        <GithubOutline />
      </span>
    </a>
  </section>
)

export default Social
