import React, { PropTypes } from 'react'
import { Game } from 'components'
import { formatDate } from 'helpers/utils'
import { scoreboardContainer, scoresContainer, header } from './styles.css'

export default function ScoreboardUI({date, scores, handleClick}) {
  return (
    <div className={scoreboardContainer}>
      <h1 className={header}>{formatDate(date)}</h1>
      <div className={scoresContainer}>
      {scores === undefined
        ? <h1>{'no games today'}</h1>
        : scores.game.map((item) => <Game key={item.game_pk} game={item} />)
      }

      </div>
    </div>
  )
}

export default function Scoreboard(props) {
  return (
    <div>
      {props.isLoading === true
        ? <h1 className={header}>{'Loading...'}</h1>
        : <ScoreboardUI
            date={props.date}
            scores={props.scores}
          />
      }
    </div>
  )
}

Scoreboard.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}
