import React, { PropTypes } from 'react'
import { NoGames, AllStar } from 'components'
import { GameContainer, DateContainer } from 'containers'
import { scoreboardContainer, gamesList, gamesHeader } from './styles.css'
import { getNbaGameDetails } from 'helpers/api'

const propTypes = {
  scores: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  today: PropTypes.string.isRequired,
  league: PropTypes.string.isRequired
}

export default function Scoreboard({ scores, date, today, league }) {
  let games
  if (league === 'mlb') {
    games = scores.game === undefined
      ? <NoGames />
      : !Array.isArray(scores.game)
        ? <GameContainer game={scores.game} date={date} league={league} key={scores.game.game_pk} />
        : scores.game.filter(item => item.game_type !== 'S').map(item => <GameContainer game={item} date={date} league={league} key={item.game_pk} />)
  }
  if (league === 'nhl') {
    games = !scores.dates.length
      ? <NoGames />
      : scores.dates[0].games.map(item => <GameContainer game={item} date={date} league={league} key={item.gamePk} />)
  }
  if (league === 'nba') {
    games = !scores.sports_content.games.game.length
      ? <NoGames />
      : scores.sports_content.games.game.map((item, index) => {
        let combined = Object.assign({}, scores.games[index], item)
        getNbaGameDetails(date, item.id)
          .then(data => Object.assign(combined, data.sports_content.game))
        return <GameContainer game={combined} date={date} league={league} key={item.id} />
      })
  }
  let isAllStar
  if (league === 'nba' && date === '20170219') {
    isAllStar = true
  }
  return (
    <main className={scoreboardContainer}>
      <DateContainer date={date} today={today} league={league} />
      <ul className={gamesList}>
        {games}
      </ul>
      { isAllStar && <AllStar img={'asg'} league={league} /> }
    </main>
  )
}

Scoreboard.propTypes = propTypes
