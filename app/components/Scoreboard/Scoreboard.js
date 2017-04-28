import React from 'react'
import { NoGames, AllStar } from 'components'
import { GameContainer, DateContainer } from 'containers'
import { getNbaGameDetails } from 'helpers/api'
import { VelocityTransitionGroup } from 'velocity-react'
import 'velocity-animate/velocity.ui'
import { velocity_scoreboard } from 'config/velocity'
import { scoreboardContainer, gamesList, fadeContainer } from './styles.css'

export default function Scoreboard({ scores, date, today, league, seasonState, direction }) {
  let games
  if (league === 'mlb') {
    games = !scores.length || seasonState.isPreseason
      ? <NoGames />
      : scores.map(item => <GameContainer game={item} date={date} league={league} key={item.gamePk} />)
  }
  if (league === 'nba') {
    games = scores.numGames === 0 || !scores.sports_content.games.game.length
      ? <NoGames />
      : scores.sports_content.games.game.map((item, index) => {
        let combined = Object.assign({}, scores.games[index], item)
        getNbaGameDetails(date, item.id)
          .then(data => Object.assign(combined, data.sports_content.game))
        return <GameContainer game={combined} date={date} league={league} key={item.id} />
      })
  }
  if (league === 'nhl') {
    games = !scores.dates.length
      ? <NoGames />
      : scores.dates[0].games.map(item => <GameContainer game={item} date={date} league={league} key={item.gamePk} />)
  }
  if (league === 'nfl') {
    games = !scores.g.length
      ? <NoGames />
      : scores.g.map(item => <GameContainer game={item.$} date={date} league={league} key={item.$.eid} />)
  }
  let allStarGame = false
  if (league === 'nba') {
    if (scores.numGames !== 0) {
      allStarGame = scores.games.length === 1 && scores.games[0].tags && scores.games[0].tags[0] === 'AWASG'
    }
  }
  return (
    <main className={scoreboardContainer}>
      <DateContainer date={date} today={today} league={league} />
        <VelocityTransitionGroup className={fadeContainer} {...velocity_scoreboard(direction)}>
          <ul className={gamesList} key={date}>
            { games }
          </ul>
        </VelocityTransitionGroup>
      { seasonState && seasonState.isAllStar && <AllStar img={allStarGame ? 'asg' : 'nola'} league={league} /> }
    </main>
  )
}
