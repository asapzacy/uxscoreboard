import React, { PropTypes } from 'react'
import { Loading, NotFound, Date } from 'components'
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
        : scores === 404
          ? <NotFound />
          : <Scoreboard date={date} scores={scores} />
      }
    </div>
  )
}

Nba.propTypes = propTypes

function Scoreboard({date, scores}) {
  return (
    <div className={scoreboardContainer}>
      <Date date={date} sport={'nba'} />
      <div className={scoresContainer}>
        {date > 20161001 && date < 20161025
          ? <h1>{'[ preseason ]'}</h1>
          : scores.game === undefined || scores.game.length === 0
            ? <h1>{'[ no games today ]'}</h1>
            : scores.game.map(item => <GameContainer key={item.id} game={item} sport={'nba'} />)
        }
      </div>
    </div>
  )
}
