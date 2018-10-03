import React from 'react'
import { LogoContainer } from 'containers'
import { team_colors } from 'data/team_colors'
import s from './Team.scss'

const makeBgImg = (code, league, isLoaded) => ({
  backgroundImage:
    code !== 'nyy' &&
    `linear-gradient(to right,${team_colors[league][code]} 40%,transparent 0%)`
})

const Team = ({
  name,
  code,
  filetype = 'svg',
  ws,
  ls,
  ts,
  score,
  league,
  hasLoaded,
  logoHasLoaded
}) => (
  <section
    className={code === 'nyy' ? s[code] : s.container}
    style={makeBgImg(code, league)}
  >
    <LogoContainer
      src={`/assets/static/img/${league}/teams/${code}.${filetype}`}
      name={name}
      hasLoaded={hasLoaded}
      logoHasLoaded={logoHasLoaded}
    />
    <main className={s.info}>
      <section className={s.leftSide}>
        <span className={s.name}>
          {name.length >= 9 ? <small>{name}</small> : name}
        </span>
        {ws &&
          ls && (
            <span className={s.record}>{`(${ws}-${ls}${
              ts ? `-${ts}` : ''
            })`}</span>
          )}
      </section>
      <section
        className={s.rightSide}
        style={{ backgroundColor: score && '#fff' }}
      >
        {score && <span className={s.score}>{score}</span>}
      </section>
    </main>
  </section>
)

export default Team
