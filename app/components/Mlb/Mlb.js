import React, { PropTypes } from 'react'
import { Loading, NotFound, Date } from 'components'
import { GameContainer } from 'containers'
import { scoreboardContainer, scoresContainer, loadingContainer } from 'styles/shared.css'

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  scores: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  sport: PropTypes.string
}

const defaultProps = {
  league: 'mlb'
}

export default function Mlb({ isLoading, isValid, scores, date, league }) {
  return (
    <div>
      {do {
        if (isLoading) {
          <Loading speed={300} text={'test'} />
        } else if (isValid && scores) {
          <Scoreboard scores={scores} date={date} league={league} />
        } else {
          <NotFound />
        }
      }}
    </div>
  )
}

Mlb.propTypes = propTypes
Mlb.defaultProps = defaultProps


const propTypes2 = {
  scores: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  league: PropTypes.string.isRequired
}

function Scoreboard({ scores, date, league }) {
  return (
    <div className={scoreboardContainer}>
      <Date date={date} league={league} />
      <div className={scoresContainer}>
        {do {
          if (scores.game === undefined) {
            <h1>{'[[ no games today ]]'}</h1>
          } else if (scores.game[0] === undefined) {
            <GameContainer game={scores.game} league={league} key={scores.game.game_pk} />
          } else {
            scores.game
              .filter(item => item.game_type === 'R')
              .map(item => <GameContainer game={scores.game} league={league} key={scores.game.game_pk} />)
          }
        }}
      </div>
    </div>
  )
}

Scoreboard.propTypes = propTypes2
