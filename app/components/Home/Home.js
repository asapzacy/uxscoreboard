import React from 'react'
import Item from './Item'
import { app_pages } from 'data/app_pages'
import s from './Home.scss'

const Home = () => (
  <div className={s.container}>
    <section className={s.uxscoreboard}>
      <h1 className={s.name}>{'uxscoreboard'}</h1>
      <h2 className={s.description}>{'live sports scoreboard built on ES6 and React.js'}</h2>
    </section>
    <nav className={s.menu}>
      <menu className={s.list}>
        { app_pages.mainLinks.map((el, i) => (
          <Item league={el.name} url={el.url} key={i}/>)
        )}
      </menu>
    </nav>
  </div>
)

export default Home
