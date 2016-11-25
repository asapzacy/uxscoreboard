import React, { PropTypes } from 'react'
import { Loading, NotFound, Date } from 'components'
import { GameContainer } from 'containers'
import { scoreboardContainer, scoresContainer, loadingContainer } from 'styles/shared.css'

const propTypes = {
  isLoading: PropTypes.bool.isRequired,
  scores: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
}

export default function Mlb({isLoading, scores, date}) {
  // console.log(scores)
  return (
    <div>
      {isLoading === true
        ? <Loading speed={300} text={'loading'} />
        : scores !== 404
          ? <Scoreboard date={date} scores={scores} />
          : <NotFound />}
    </div>
  )
}

Mlb.propTypes = propTypes

function Scoreboard({date, scores}) {
  return (
    <div className={scoreboardContainer}>
      <Date date={date} sport={'mlb'} />
      <div className={scoresContainer}>
        {date > 20160228 && date < 20160403
          ? <h1>{'[ spring training ]'}</h1>
          : scores.game === undefined
            ? <h1>{'[ no games today ]'}</h1>
            : scores.game[0] === undefined
              ? <GameContainer key={scores.game.game_pk} game={scores.game} sport={'mlb'} />
              : scores.game.filter(item => item.game_type === 'R').map(item => <GameContainer key={item.game_pk} game={item} sport={'mlb'} />)}
      </div>
    </div>
  )
}
