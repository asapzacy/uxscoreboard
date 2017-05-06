import React, { PropTypes } from 'react'
import { periodSuffix } from 'helpers/utils'
import { gameStateContainer, inGameStateContainer } from './styles.css'

export default function GameState(props) {
  if (props.gameState === 0) return <PreGameState {...props} />
  if (props.gameState === 1) return <InGameState {...props} />
  if (props.gameState === 2) return <PostGameState {...props} />
  return
}


const PreGameState = ({ time, isPlayoffs, playoffs }) => (
  <section className={gameStateContainer}>
    <span>{time}</span>
    { isPlayoffs && <span>{`Game ${playoffs.game} of ${playoffs.maxGames}`}</span> }
  </section>
)

const InGameState = ({ currentTime, currentPeriod, isHalfTime, status, inGameDelay }) => (
  <section className={inGameStateContainer}>
    { !isHalfTime && <span>{currentTime && `${currentTime} • `}{currentPeriod}<sup>{periodSuffix(currentPeriod)}</sup></span> }
    { (isHalfTime || inGameDelay) && <span>{status}</span> }
  </section>
)

const PostGameState = ({ periods, totalPeriods, status, overtime, isDoubleHeader, doubleHeader, isPlayoffs, playoffs }) => (
  <section className={gameStateContainer}>
    <span>{totalPeriods > periods ? `${status}/${overtime}` : status}</span>
    { isDoubleHeader && <span>{`Game ${doubleHeader} of 2`}</span> }
    { isPlayoffs && <span>{`Game ${playoffs.game} of ${playoffs.maxGames}`}</span> }
  </section>
)
