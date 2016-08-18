import React, { PropTypes } from 'react'
import { inningSuffix } from 'helpers/utils'
import { gameInfo } from './styles.css'

const propTypes = {
  status: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  ampm: PropTypes.string.isRequired,
  inning: PropTypes.string,
  inningState: PropTypes.string.isRequired,
  outs: PropTypes.string,
  reason: PropTypes.string,
  description: PropTypes.string.isRequired,
  doubleHeader: PropTypes.string.isRequired,
  gameNumber: PropTypes.string.isRequired
}

export default function GameState({status, time, ampm, tz, inning,
  inningState, outs, reason, description, doubleHeader, gameNumber}) {
  const suffix = inningSuffix(inning)
  if (status === 'Preview') {
    return (
      <div className={gameInfo}>
        <span>{time === '3:33' ? `TBA` : `${time} ${ampm} ${tz}`}</span>
        {description ? <span><small>{description}</small></span> : null}
      </div>
    )
  }
  else if (status === 'In Progress') {
    return (
      <div className={gameInfo}>
        <span>{`${inningState} ${inning}`}<sup>{suffix}</sup></span>
        <span><small>
          {inningState === 'Middle' || inningState === 'End' ? outs = '' : outs === '1' ? `${outs} out` : `${outs} outs`}
        </small></span>
      </div>
    )
  }
  else if (status === 'Final' || status === 'Game Over') {
    if (doubleHeader === 'Y') {
      return (
        <div className={gameInfo}>
          <span>{inning > 9 ? `Final/${inning}` : `Final`}</span>
          <span><small>{`Game ${gameNumber} of 2`}</small></span>
        </div>
      )
    }
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
        <span><small>{`(${reason})`}</small></span>
      </div>
    )
  }
  else if (status === 'Delayed' || status === 'Suspended' || status === 'Review') {
    return (
      <div className={gameInfo}>
        <span>{`${inningState} ${inning}`}<sup>{suffix}</sup></span>
        <span><small>{`${status} (${reason})`}</small></span>
      </div>
    )
  }
  else if (status === 'Manager Challenge') {
    return (
      <div className={gameInfo}>
        <span>{`${inningState} ${inning}`}<sup>{suffix}</sup></span>
        <span><small>{status}</small></span>
      </div>
    )
  }
  else if (status === 'Completed Early') {
    return (
      <div className={gameInfo}>
        <span>{`Final/${inning}`}</span>
        <span><small>{status}</small></span>
      </div>
    )
  }
  else {
    return (
      <div className={gameInfo}>
        <span>{'fix this bug..'}</span>
      </div>
    )
  }
}

GameState.propTypes = propTypes
