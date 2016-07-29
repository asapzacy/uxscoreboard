import React from 'react'
import { container, teamLogo, teamInfo, teamName, teamRecord, teamScore } from './styles.css'
import * as teamColors from './colors.css'

export default function Team({name, code, ls, ws, runs}) {
    return (
    <div className={teamColors[code]}>
      <img className={teamLogo} src={`assets/img/mlb/teams/${code}.svg`} alt={name} />
      <div className={teamInfo}>
        <span className={teamName}>{name.length > 7 ? <small>{name}</small> : name}</span>
        <span className={teamRecord}><strong>{`(${ws}-${ls})`}</strong></span>
      </div>
      { runs ? <span className={teamScore}>{runs}</span> : null }
    </div>
  )
}
