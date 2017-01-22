import React, { PropTypes } from 'react'
import { inningSuffix } from 'helpers/utils'
import { gameStateContainer } from './styles.css'

export default function GameState({ gameState, status, time, periods,
  currentTime, currentPeriod, isHalfTime, totalPeriods, overtime, isPlayoffs }) {
  return (
    <div className={gameStateContainer}>
      { gameState === 0 && <span>{time}</span> }
      { gameState === 1
        ? !currentTime || currentTime === '0.0'
          ? <span>{status}</span>
          : <span>{`${currentTime} • ${currentPeriod}`}<sup>{inningSuffix(String(currentPeriod))}</sup></span>
        : null
      }
      { gameState === 2 && <span>{totalPeriods > periods ? `${status}/${overtime}` : status}</span> }
    </div>
  )
}
