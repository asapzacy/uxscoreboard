import React, { PropTypes } from 'react'
import { teamContainer, teamLogo, asgLogo, teamInfo, teamName,
  teamRecord, teamScore } from './styles.css'
import teamColors from './team_colors.css'

const propTypes = {
  name: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  sport: PropTypes.string.isRequired,
  ls: PropTypes.string ,
  ws: PropTypes.string,
  img: PropTypes.string,
  score: PropTypes.string,
}

export default function Team({name, code, ls, ws, score, img='svg', sport}) {
  name = name === 'Timberwolves' ? 'T-wolves' : name === 'Trail Blazers' ? 'Blazers' : name === 'Maple Leafs' ? 'Leafs' : name
  return (
    <div className={teamColors[`${code}_${sport}`]}>
      <img className={img === 'png' ? asgLogo : teamLogo} src={`assets/img/${sport}/teams/${code}.${img}`} alt={name} />
      <div className={teamInfo}>
        <span className={teamName}>{name.length > 7 ? <small>{name}</small> : name}</span>
        {ws && ls ? <span className={teamRecord}>{`(${ws}-${ls})`}</span> : null}
      </div>
      {score ? <span className={teamScore}>{score}</span> : null}
    </div>
  )
}

Team.propTypes = propTypes
