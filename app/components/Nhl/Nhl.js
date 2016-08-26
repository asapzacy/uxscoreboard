import React, { PropTypes } from 'react'
import { Loading, NotFound, Date } from 'components'
import { GameContainer } from 'containers'
import { scoreboardContainer, scoresContainer, loadingContainer } from './styles.css'

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
  scores: PropTypes.object.isRequired
}

export default function Nhl({isLoading, date, scores}) {
  return (
    <div>
      {isLoading === true
        ? <Loading speed={300} text={'loading'} />
        : scores !== 404
          ? <Scoreboard date={date} scores={scores} />
          : <NotFound />
      }
    </div>
  )
}

Nhl.propTypes = propTypes

function Scoreboard({date, scores}) {
  console.log(scores)
  return (
    <div className={scoreboardContainer}>
      <Date date={date} sport={'nhl'} />
      <div className={scoresContainer}>
        {date > 20160924 && date < 20161012
          ? <h1>{'[ preseason ]'}</h1>
          : !scores.dates.length
            ? <h1>{'[ no games today ]'}</h1>
            : scores.dates[0].games.map(item => <GameContainer key={item.gamePk} game={item} sport={'nhl'} />)
        }
      </div>
    </div>
  )
}
