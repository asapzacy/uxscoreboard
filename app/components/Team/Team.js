import React, { PropTypes } from 'react'
import { teamContainer, teamLogo, teamInfo, teamLeft, teamRight, teamName,
  teamRecord, teamScore } from './styles.css'
import teamColors from './team_colors.css'
// import { data } from './data'

const Team = ({ name, code, filetype = 'svg', ws, ls, ts, score, league }) => (
  <section className={teamColors[`${code}_${league}`]}>
    <img className={teamLogo} src={`/assets/img/${league}/teams/${code}.${filetype}`} alt={name} />
    <div className={teamInfo}>
      <div className={teamLeft}>
        <span className={teamName}>{ name.length >= 9 ? <small>{name}</small> : name }</span>
        { (ws && ls) && <span className={teamRecord}>{`(${ws}-${ls}${ts ? `-${ts}` : ''})`}</span> }
      </div>
      <div className={teamRight}>
        { score && <span className={teamScore}>{score}</span> }
      </div>
    </div>
  </section>
)

export default Team
