import React, { PropTypes } from 'react'
import { getMlbScores } from 'helpers/api'
import { Game } from 'components'
import { scoreboardContainer, scoresContainer, header } from './styles.css'

export default function ScoreboardUI({date, scores, handleClick}) {
  return (
    <div className={scoreboardContainer}>
      <h1 className={header}>{date}</h1>
      <div className={scoresContainer}>
      {scores
        ? scores.game.map((item) => <Game key={item.game_pk} game={item} />)
        : <h1>{'no games today'}</h1>
      }

      </div>
    </div>
  )
}

export default function Scoreboard(props) {
  return (
    <div>
      {
        props.isLoading === true
        ? <h1 className={header}>{'Loading...'}</h1>
        : <ScoreboardUI
            date={props.date}
            handleClick={props.handleClick}
            scores={props.scores}
          />
      }
    </div>
  )
}

Scoreboard.propTypes = {
  date: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
}
