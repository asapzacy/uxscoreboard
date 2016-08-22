import React, { PropTypes } from 'react'
import { Date, Loading } from 'components'
import { GameContainer } from 'containers'
import { scoreboardContainer, scoresContainer, loadingContainer } from './styles.css'

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
  scores: PropTypes.object.isRequired
}

export default function Nba({isLoading, date, scores}) {
  return (
    <div>
      {isLoading === true
        ? <Loading speed={300} text={'loading'} />
        : <Scoreboard date={date} scores={scores} />
      }
    </div>
  )
}

Nba.propTypes = propTypes

function Scoreboard({date, scores}) {
  console.log(scores)
  return (
    <div className={scoreboardContainer}>
      <Date date={date} sport={'nba'} />
      <div className={scoresContainer}>
        {date > Number('20161001') && date < Number('20161025')
          ? <h1>{'[ preseason ]'}</h1>
          : scores.game === undefined
            ? <h1>{'[ no games today ]'}</h1>
            : scores.game.map(item => <GameContainer key={item.id} game={item} sport={'nba'} />)
        }
      </div>
    </div>
  )
}
