import React from 'react'
import { gameInfo } from './styles.css'

export default function GameState({status, time, ampm, tz, inning,
  inningState, outs, reason}) {
  const getInningSuffix = () => {
    switch(inning) {
      case '1' || '21': return 'st'
      case '2' || '22': return 'nd'
      case '3' || '23': return 'rd'
      default: return 'th'
    }
  }
  if (status === 'Preview') {
    return (
      <div className={gameInfo}>
        <span>{`${time} ${ampm} ${tz}`}</span>
      </div>
    )
  }
  else if (status === 'In Progress') {
    return (
      <div className={gameInfo}>
        <span>{`${inningState} ${inning}`}
          <sup>{getInningSuffix()}</sup>
        </span>
        <span><small>
          {inningState === 'Middle' || inningState === 'End'
            ? outs = ''
            : outs === '1'
              ? `${outs} out`
              : `${outs} outs`
          }
        </small></span>
      </div>
    )
  }
  else if (status === 'Final' || status === 'Game Over') {
    return (
      <div className={gameInfo}>
        <span>{inning > 9 ? `Final/${inning}` : `Final`}</span>
      </div>
    )
  }
  else if (status === 'Warmup' || status === 'Pre-Game' || status === 'Delayed Start')
    return (
      <div className={gameInfo}>
        <span>{`${time} ${ampm} ${tz}`}</span>
        <span><small>{status}</small></span>
      </div>
    )
  else if (status === 'Postponed') {
    return (
      <div className={gameInfo}>
        <span>{status}</span>
        <span><small>{reason}</small></span>
      </div>
    )
  }
  else if (status === 'Delayed' || status === 'Suspended') {
    return (
      <div className={gameInfo}>
        <span>{`${inningState} ${inning}`}
          <sup>{getInningSuffix()}</sup>
        </span>
        <span><small>{`${status} (${reason})`}</small></span>
      </div>
    )
  }
  else if (status === 'Manager Challenge') {
    return (
      <div className={gameInfo}>
        <span>{`${inningState} ${inning}`}
          <sup>{getInningSuffix()}</sup>
        </span>
        <span><small>{`${status}`}</small></span>
      </div>
    )
  }
  else if (status === 'Completed Early') {
    return (
      <div className={gameInfo}>
        <span>{`Final/${inning}`}
        </span>
        <span><small>{`${status}`}</small></span>
      </div>
    )
  }
}
