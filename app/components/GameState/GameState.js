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
    <section className={gameStateContainer}>
      <span>{time}</span>
    </section>
  )
}

function InGameState({ currentTime, currentPeriod, isHalfTime, status }) {
  return (
    <section className={inGameStateContainer}>
      { isHalfTime
        ? <span>{status}</span>
        : <span>{`${currentTime} • ${currentPeriod}`}<sup>{inningSuffix(String(currentPeriod))}</sup></span>
      }
    </section>
  )
}

function PostGameState({ periods, totalPeriods, status, overtime,
   isDoubleHeader, doubleHeader, isPlayoffs, playoffs }) {
  return (
    <section className={gameStateContainer}>
      <span>{totalPeriods > periods ? `${status}/${overtime}` : status}</span>
      { isDoubleHeader && <span>{`Game ${doubleHeader} of 2`}</span> }
      { isPlayoffs && <span>{`${playoffs.series} - Game ${playoffs.game} of ${playoffs.maxGames}`}</span> }
    </section>
  )
}
