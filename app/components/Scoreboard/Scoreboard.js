import React, { PropTypes } from 'react'
import { GameContainer, DateContainer } from 'containers'
import { scoreboardContainer, gamesList, gamesHeader } from './styles.css'

const propTypes = {
  scores: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  today: PropTypes.string.isRequired,
  league: PropTypes.string.isRequired
}

export default function Scoreboard({ scores, date, today, league }) {
  return (
    <div className={scoreboardContainer}>
      <DateContainer date={date} today={today} league={league} />
      <ul className={gamesList}>
        { scores.game === undefined
          ? <li className={gamesHeader}>{'[ no games today ]'}</li>
          : scores.game[0] === undefined
            ? <GameContainer game={scores.game} league={league} key={scores.game.game_pk} />
            : scores.game.filter(item => item.game_type !== 'S').map(item => <GameContainer game={item} league={league} key={item.game_pk} />)
        }
      </ul>
    </div>
  )
}

Scoreboard.propTypes = propTypes
