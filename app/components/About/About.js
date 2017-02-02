import React from 'react'
import { aboutContainer, aboutHeader, aboutIntro, aboutLink,
  aboutSection, aboutSubHeader, aboutInfo, aboutList, aboutListItem } from './styles.css'

export default function About() {
  return (
    <section className={aboutContainer}>
      <h1 className={aboutHeader}>{'uxscoreboard'}</h1>
      <p className={aboutIntro}>{'I’ve always been a big sports fan growing up, whether playing or watching, paintball to basketball, it didn’t matter. I wanted to build a significantly better sports scoreboard... and pick up '}<a className={aboutLink} href="https://facebook.github.io/react/" title="React Documentation">{'react.js'}</a>{' along the way.'}</p>
      <section className={aboutSection}>
        <h2 className={aboutSubHeader}>{'what I made'}</h2>
        <p className={aboutInfo}>{'The original idea was to recreate and improve upon your typical ESPN sports scoreboard website—without the advertisements, and with an emphasis on design and interaction.'}</p>
        <p className={aboutInfo}>{'I also wanted it to...'}</p>
        <ul className={aboutList}>
          <li className={aboutListItem}>{'support all major sports, MLB/NBA/NHL/NFL'}</li>
          <li className={aboutListItem}>{'be quick'}</li>
          <li className={aboutListItem}>{'for the URLs to be functional–whether sharing with friends, bookmarking, or browsing around the site, every valid URL will show the necessary content'}</li>
        </ul>
        <p className={aboutInfo}>{'It started with just the MLB, because they make their game data accessible and easy to use. Eventually, after a little digging around, I was able to find public and updated json files for the NBA, NFL, and NHL.'}</p>
        <p className={aboutInfo}>{'Moving forward, I want to one day be able to add soccer, my favorite sport, despite the lack of (public) available data.'}</p>
      </section>
      <section className={aboutSection}>
        <h2 className={aboutSubHeader}>{'what I used'}</h2>
        <p className={aboutInfo}>{''}</p>
        <ul className={aboutList}>
          <li className={aboutListItem}>{''}</li>
          <li className={aboutListItem}>{''}</li>
          <li className={aboutListItem}>{''}</li>
          <li className={aboutListItem}>{''}</li>
        </ul>


      </section>
    </section>
  )
}
