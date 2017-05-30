import React from 'react'
import { team_colors } from 'data/team_colors'
import s from './Team.scss'

const createBgImage = (code, league) => ({
  backgroundImage:code !== 'nyy' && `linear-gradient(to right,${team_colors[league][code]} 40%,transparent 0%)`
})

const Team = ({ name, code, filetype = 'svg', ws, ls, ts, score, league }) => (
  <section className={code === 'nyy' ? s[code] : s.container} style={createBgImage(code, league)}>
    <img className={s.logo} src={`/assets/img/${league}/teams/${code}.${filetype}`} alt={`${name} Logo | uxscoreboard`} />
    <main className={s.info}>
      <section className={s.leftSide}>
        <span className={s.name}>{ name.length >= 9 ? <small>{name}</small> : name }</span>
        { (ws && ls) &&
          <span className={s.record}>{`(${ws}-${ls}${ts ? `-${ts}` : ''})`}</span>
        }
      </section>
      <section className={s.rightSide}>
        { score &&
          <span className={s.score}>{score}</span>
        }
      </section>
    </main>
  </section>
)

export default Team
