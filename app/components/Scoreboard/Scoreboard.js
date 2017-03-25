import React, { PropTypes } from 'react'
import { VelocityTransitionGroup, VelocityComponent } from 'velocity-react'
import 'velocity-animate/velocity.ui';

import { NoGames, AllStar } from 'components'
import { GameContainer, DateContainer } from 'containers'
import { scoreboardContainer, gamesList, gamesHeader } from './styles.css'
import { getNbaGameDetails } from 'helpers/api'

const propTypes = {
  scores: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  today: PropTypes.string.isRequired,
  league: PropTypes.string.isRequired,
  seasonState: PropTypes.object.isRequired
}

const config = {
  enter: {
    animation: 'transition.slideRightIn',
    duration: 1000,
    delay: 1000,
    // display: 'inherit'
  },
  leave: {
    animation: 'transition.slideLeftOut',
    duration: 1000,
    delay: 0,
    display: 'none'
  }
}

const config2 = {
  animation: 'transition.slideLeftIn'
}

const List = ({ scores, date, today, league, seasonState }) => {
  let games
  if (league === 'mlb') {
    games = scores.game === undefined || seasonState.isPreseason
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
  let allStarGame = false
  if (league === 'nba') {
    allStarGame = scores.games.length === 1 && scores.games[0].tags && scores.games[0].tags[0] === 'AWASG'
  }
  const test = { display: 'flex', flexWrap: 'inherit', alignItems: 'inherit', justifyContent: 'inherit' }
  // return (
  //   <ul className={gamesList}>
  //     {games}
  //   </ul>
  // )
  return (
      <span>{games}</span>
  )
}

export default function Scoreboard({ scores, date, today, league, seasonState }) {
  let games
  let games2 = '<ul className={gamesList}>'
  if (league === 'mlb') {
    games = scores.game === undefined || seasonState.isPreseason
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
  let allStarGame = false
  if (league === 'nba') {
    allStarGame = scores.games.length === 1 && scores.games[0].tags && scores.games[0].tags[0] === 'AWASG'
  }
  const c = {
    enter: {
      animation: 'fadeIn',
      duration: 1000,
      delay: 0,
      display: 'flex'
    },
    leave: {
      animation: 'fadeOut',
      duration: 1000,
      delay: 0,
      display: 'none'
    }
  }
  const test = { display: 'inherit', flexWrap: 'inherit', alignItems: 'inherit', justifyContent: 'inherit' }
  return (
    <main className={scoreboardContainer}>
      <DateContainer date={date} today={today} league={league} />
        <ul className={gamesList}>
          <VelocityTransitionGroup style={test} {...config}>
            {games}
          </VelocityTransitionGroup>
        </ul>
      { seasonState && seasonState.isAllStar && <AllStar img={allStarGame ? 'asg' : 'nola'} league={league} /> }
    </main>
  )
}

Scoreboard.propTypes = propTypes


//       <List scores={scores} date={date} today={today} league={league} seasonState={seasonState} />
