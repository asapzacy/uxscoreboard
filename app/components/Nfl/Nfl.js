import React, { PropTypes } from 'react'
import { Team, Date, Loading } from 'components'
import { GameContainer } from 'containers'
import { scoreboardContainer, scoresContainer, loadingContainer,
  gameContainer } from './styles.css'

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  scores: PropTypes.object.isRequired
}

export default function Nfl({isLoading, date, scores}) {
  return (
    <div>
      {isLoading === true
        ? <Loading speed={300} text={'loading'} />
        : scores === 404
          ? <NotFound />
          : <Scoreboard date={'20160820'} scores={scores} />}
    </div>
  )
}

Nfl.propTypes = propTypes

function Scoreboard({date, scores}) {
  // console.log(scores)
  // console.log(Object.keys(scores))
  return (
    <div className={scoreboardContainer}>
      <Date date={date} />
      <div className={scoresContainer}>
        {scores === undefined
          ? <h1>{'no games today . . . '}</h1>
          : Object.keys(scores).map(item => <NflGame key={item} game={item} />)}
      </div>
    </div>
  )
}

function NflGame({game}) {
  return (
    <div className={gameContainer}>
      <Team name={game} />
      <Team name={game} />
    </div>
  )
}
