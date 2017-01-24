import React, { PropTypes } from 'react'
import { inningSuffix } from 'helpers/utils'
import { gameStateContainer, inGameStateContainer } from './styles.css'

export default function GameState(props) {
  if (props.gameState === 0) return <PreGameState {...props} />
  if (props.gameState === 1) return <InGameState {...props} />
  if (props.gameState === 2) return <PostGameState {...props} />
}


function PreGameState({ time }) {
  return (
    <div className={gameStateContainer}>
      <span>{time}</span>
    </div>
  )
}

function InGameState({ currentTime, currentPeriod, isHalfTime, status }) {
  return (
    <div className={inGameStateContainer}>
      { isHalfTime
        ? <span>{status}</span>
        : <span>{`${currentTime} • ${currentPeriod}`}<sup>{inningSuffix(String(currentPeriod))}</sup></span>
      }
    </div>
  )
}

function PostGameState({ totalPeriods, periods, status, overtime}) {
  return (
    <div className={gameStateContainer}>
      <span>{totalPeriods > periods ? `${status}/${overtime}` : status}</span>
    </div>
  )
}
