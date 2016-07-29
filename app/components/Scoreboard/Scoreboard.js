import React, { PropTypes } from 'react'
import moment from 'moment'
import { Game, Date, Loading } from 'components'
import { scoreboardContainer, scoresContainer, header, dateContainer, loadingContainer } from './styles.css'

export default function ScoreboardUI({date, scores, handleClick}) {
  return (
    <div className={scoreboardContainer}>
      <div className={dateContainer}>
        <Date date={date} />
      </div>
      <div className={scoresContainer}>
      {scores.game === undefined
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
        ? <Loading speed={400} text={'loading'} />
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
