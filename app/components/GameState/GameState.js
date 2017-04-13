import React, { PropTypes } from 'react'
import { periodSuffix } from 'helpers/utils'
import { gameStateContainer, inGameStateContainer } from './styles.css'

export default function GameState(props) {
  if (props.gameState === 0) return <PreGameState {...props} />
  if (props.gameState === 1) return <InGameState {...props} />
  if (props.gameState === 2) return <PostGameState {...props} />
  return <h1>{'ay'}</h1>
}


const PreGameState = ({ time, isPlayoffs, playoffs }) => (
  <section className={gameStateContainer}>
    <span>{time}</span>
    { isPlayoffs && <span>{`Game ${playoffs.game} of ${playoffs.maxGames}`}</span> }
  </section>
)

function InGameState({ currentTime, currentPeriod, isHalfTime, status }) {
  return (
    <section className={inGameStateContainer}>
      { isHalfTime
        ? <span>{status}</span>
        : <span>{currentTime && `${currentTime} • `}{currentPeriod}<sup>{periodSuffix(currentPeriod)}</sup></span>
      }
    </section>
  )
}

function PostGameState({ periods, totalPeriods, status, overtime, isDoubleHeader, doubleHeader, isPlayoffs, playoffs }) {
  return (
    <section className={gameStateContainer}>
      <span>{totalPeriods > periods ? `${status}/${overtime}` : status}</span>
      { isDoubleHeader && <span>{`Game ${doubleHeader} of 2`}</span> }
      { isPlayoffs && <span>{`Game ${playoffs.game} of ${playoffs.maxGames}`}</span> }
    </section>
  )
}
