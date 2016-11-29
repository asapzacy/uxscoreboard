import React, { PropTypes } from 'react'
import { teamContainer, teamLogo, teamInfo, teamName, teamRecord, teamScore } from './styles.css'
import teamColors from './team_colors.css'

export default function Team({ name, code, filetype, ws, ls, score, league, isAllstar }) {
  const divClass = teamColors[`${code}_${league}`]
  return (
    <div className={divClass}>
      <img className={teamLogo} src={`/assets/img/${league}/teams/${code}.${filetype}`} alt={name} />
      <div className={teamInfo}>
        <span className={teamName}>{name.length > 7 ? <small>{name}</small> : name}</span>
        {ws && ls ? <span className={teamRecord}>{`(${ws}-${ls})`}</span> : null}
      </div>
      {score ? <span className={teamScore}>{score}</span> : null}
    </div>
  )
}
