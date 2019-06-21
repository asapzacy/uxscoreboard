import React from 'react'
import Item from './Item'
import { APP_PAGES } from 'data/appPages'
import s from './Home.scss'

const Home = () => (
  <div className={s.container}>
    <section className={s.uxscoreboard}>
      <h1 className={s.name}>{'uxscoreboard'}</h1>
      <h2 className={s.description}>
        {'Real-time sports scoreboard built on es6, React, and Node.js'}
      </h2>
    </section>
    <nav className={s.menu}>
      <menu className={s.list}>
        {APP_PAGES.mainLinks.map(page => (
          <Item league={page.name} url={page.url} key={page.name} />
        ))}
      </menu>
    </nav>
  </div>
)

export default Home
