import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Game, Date } from 'components'
import moment from 'moment'
import { scoreboardContainer, scoresContainer, header, dateContainer } from './styles.css'

export default function ScoreboardUI({date, scores, handleClick}) {
  return (
    <div className={scoreboardContainer}>
      <div className={dateContainer}>
        <Date date={date} />
      </div>
      <div className={scoresContainer}>
      {scores.game === undefined
        ? <h1>{'no games today'}</h1>
        : scores.game.map((item) => (<Game key={item.game_pk} game={item} />))
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
