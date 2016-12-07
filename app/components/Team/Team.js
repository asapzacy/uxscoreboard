import React, { PropTypes } from 'react'
import { teamContainer, teamLogo, teamInfo, teamLeft, teamRight, teamName,
  teamRecord, teamScore } from './styles.css'
import teamColors from './team_colors.css'

export default function Team({ name, code, filetype, ws, ls, ots, score, league, isAllstar }) {
  const sectionClass = teamColors[`${code}_${league}`]
  var time = ots ? `-${ots}` : ''
  return (
    <section className={sectionClass}>
      <img className={teamLogo} src={`/assets/img/${league}/teams/${code}.${filetype}`} alt={name} />
      <div className={teamInfo}>
        <div className={teamLeft}>
          <span className={teamName}>{ name.length > 7 ? <small>{name}</small> : name }</span>
          { (ws && ls) && <span className={teamRecord}>{`(${ws}-${ls}${time})`}</span> }
        </div>
        <div className={teamRight}>
          { score && <span className={teamScore}>{score}</span> }
        </div>
      </div>
    </section>
  )
}
