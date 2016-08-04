import React, { PropTypes } from 'react'
import moment from 'moment'
import { Game, Date, Loading } from 'components'
import { GameContainer } from 'containers'
import { scoreboardContainer, scoresContainer, loadingContainer } from './styles.css'

export default function ScoreboardUI({date, scores}) {
  return (
    <div className={scoreboardContainer}>
      <Date date={date} />
      <div className={scoresContainer}>
        {date >= Number('20160227') && date <= Number('20160402')
          ? <h1>{'spring training..'}</h1>
          : scores.game === undefined
            ? <h1>{'no games today..'}</h1>
            : scores.game[0] === undefined
              ? <GameContainer key={scores.game.game_pk} game={scores.game} type={scores.game.game_type} />
              : scores.game.filter(item => item.game_type === 'R').map(item => <GameContainer key={item.game_pk} game={item} type={item.game_type} />)
        }
      </div>
    </div>
  )
}

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
  scores: PropTypes.object.isRequired
}

export default function Scoreboard(props) {
  return (
    <div>
      {props.isLoading === true
        ? <Loading speed={300} text={'loading'} />
        : <ScoreboardUI
            date={props.date}
            scores={props.scores}
          />
      }
    </div>
  )
}
