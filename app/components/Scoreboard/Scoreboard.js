import React from 'react'
import { NoGames, Event } from 'components'
import { GameContainer, DateContainer } from 'containers'
import { getNbaGameDetails } from 'helpers/api'
import { VelocityTransitionGroup } from 'velocity-react'
import 'velocity-animate/velocity.ui'
import { velocity_scoreboard } from 'config/velocity'
import s from './Scoreboard.scss'

export default function Scoreboard({ bgImg, scores, date, today, league, seasonState, direction, lastUpdated, isError }) {
  let games
  if (league === 'mlb') {
    games = !scores.length || seasonState.isPreseason
      ? <NoGames text={'no games today'} /> : isError ? <NoGames text={'sorry, there was an error :('} />
      : scores.map(item => <GameContainer game={item} date={date} league={league} lastUpdated={lastUpdated} key={item.gamePk} />)
  }
  if (league === 'nba') {
    games = scores.numGames === 0 || !scores.sports_content.games.game.length
      ? <NoGames text={'no games today'} /> : isError ? <NoGames text={'sorry, there was an error :('} />
      : scores.sports_content.games.game.map((item, index) => {
        let combined = Object.assign({}, scores.games[index], item)
        getNbaGameDetails(date, item.id)
          .then(data => Object.assign(combined, data.sports_content.game))
        return <GameContainer game={combined} date={date} league={league} lastUpdated={lastUpdated} key={item.id} />
      })
  }
  if (league === 'nhl') {
    games = !scores.dates.length
      ? <NoGames text={'no games today'} /> : isError ? <NoGames text={'sorry, there was an error :('} />
      : scores.dates[0].games.map(item => <GameContainer game={item} date={date} league={league} lastUpdated={lastUpdated} key={item.gamePk} />)
  }
  if (league === 'nfl') {
    games = !scores.g.length
      ? <NoGames text={'no games today'} /> : isError ? <NoGames text={'sorry, there was an error :('} />
      : scores.g.map(item => <GameContainer game={item.$} date={date} league={league} lastUpdated={lastUpdated} key={item.$.eid} />)
  }
  return (
    <main className={s.container}>
      <DateContainer date={date} today={today} league={league} />
      <VelocityTransitionGroup className={s.fade} {...velocity_scoreboard(direction)}>
        <ul className={s.list} key={date}>
          {games}
          { bgImg &&
            <li style={{background:`${bgImg} center center / 90% 100% no-repeat`}} className={s.extra}></li>
          }
        </ul>
      </VelocityTransitionGroup>
    </main>
  )
}
