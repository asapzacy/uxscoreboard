import React from 'react'
import { teamContainer, teamLogo, teamInfo, teamName,
  teamRecord, teamScore } from './styles.css'
import teamColors from './colors.css'

export default function Team({name, code, ls, ws, runs}) {
    return (
    <div className={teamColors[code]}>
      <img className={teamLogo} src={`assets/img/mlb/teams/${code}.svg`} alt={name} />
      <div className={teamInfo}>
        <span className={teamName}>{name.length > 7 ? <small>{name}</small> : name}</span>
        <span className={teamRecord}>{`(${ws}-${ls})`}</span>
      </div>
      { runs ? <span className={teamScore}>{runs}</span> : null }
    </div>
  )
}
