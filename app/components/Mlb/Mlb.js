import React, { PropTypes } from 'react'
import { Game, Date, Loading } from 'components'
import { GameContainer } from 'containers'
import { scoreboardContainer, scoresContainer, loadingContainer } from './styles.css'

export default function Scoreboard({date, scores}) {
  return (
    <div className={scoreboardContainer}>
      <Date date={date} />
      <div className={scoresContainer}>
        {date >= Number('20160227') && date <= Number('20160402')
          ? <h1>{'spring training . . . '}</h1>
          : scores.game === undefined
            ? <h1>{'no games today . . . '}</h1>
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

export default function Mlb({isLoading, date, scores}) {
  return (
    <div>
      {isLoading === true
        ? <Loading speed={300} text={'loading'} />
        : <Scoreboard date={date} scores={scores} />
      }
    </div>
  )
}

Mlb.propTypes = propTypes
