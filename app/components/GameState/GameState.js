import React from 'react'
import { periodSuffix } from 'helpers/utils'
import s from './gamestate.scss'

const GameState = (props) => {
  switch (props.gameState) {
    case 0: return <PreGameState {...props} />
    case 1: return <InGameState {...props} />
    case 2: return <PostGameState {...props} />
  }
}

export default GameState


const PreGameState = ({ time, isPlayoffs, playoffs, isDoubleHeader, doubleHeader }) => (
  <section className={s.container}>
    <span>{time}</span>
    { isDoubleHeader && <span>{`Game ${doubleHeader} of 2`}</span> }
    { isPlayoffs && <span>{`Game ${playoffs.game} of ${playoffs.maxGames}`}</span> }
  </section>
)

const InGameState = ({ currentTime, currentPeriod, isHalfTime, status, inGameDelay }) => (
  <section className={s.inGame}>
    { !isHalfTime && <span>{currentTime && `${currentTime} • `}{currentPeriod}<sup>{periodSuffix(currentPeriod)}</sup></span> }
    { (isHalfTime || inGameDelay) && <span>{status}</span> }
  </section>
)

const PostGameState = ({ periods, totalPeriods, status, overtime, isDoubleHeader, doubleHeader, isPlayoffs, playoffs }) => (
  <section className={s.container}>
    <span>{totalPeriods > periods ? `${status}/${overtime}` : status}</span>
    { isDoubleHeader && <span>{`Game ${doubleHeader} of 2`}</span> }
    { isPlayoffs && <span>{`Game ${playoffs.game} of ${playoffs.maxGames}`}</span> }
  </section>
)
