import React from 'react'
import { teamContainer, teamLogo, teamInfo, teamName,
  teamRecord, teamScore } from './styles.css'

export default function Team({name, code, ls, ws, runs}) {
  return (
    <div className={teamContainer}>
      <img className={teamLogo} src={`assets/img/mlb/teams/${code}.svg`} alt={name} />
      <div className={teamInfo}>
        <span className={teamName}>{name}</span>
        <span className={teamRecord}>{`(${ws}-${ls})`}</span>
      </div>
      <span className={teamScore}>{runs}</span>
    </div>
  )
}
