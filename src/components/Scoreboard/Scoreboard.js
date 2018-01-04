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
      ? <NoGames text={'no games today'} /> : isError ? <NoGames text={'woops! something went wrong.'} />
      : scores.map(item => <GameContainer game={item} date={date} league={league} lastUpdated={lastUpdated} key={item.gamePk} />)
  }
  if (league === 'nba') {
    games = !scores.length
      ? <NoGames text={'no games today'} /> : isError ? <NoGames text={'woops! something went wrong.'} />
      : scores.map((el, i) => {
          getNbaGameDetails(date, el.id)
            .then(details => {
              el.home = details.sports_content.game.home
              el.visitor = details.sports_content.game.visitor
            })
          return <GameContainer game={el} id={el.id} date={date} league={league} lastUpdated={lastUpdated} key={i} />
      })
  }
  if (league === 'nhl') {
    games = !scores.dates.length
      ? <NoGames text={'no games today'} /> : isError ? <NoGames text={'woops! something went wrong.'} />
      : scores.dates[0].games.map(item => <GameContainer game={item} date={date} league={league} lastUpdated={lastUpdated} key={item.gamePk} />)
  }
  if (league === 'nfl') {
    games = !scores.length
      ? <NoGames text={'no games today'} /> : isError ? <NoGames text={'woops! something went wrong.'} />
      : scores.map(el => <GameContainer game={el} date={date} league={league} lastUpdated={lastUpdated} key={el.eid} />)
  }
  return (
    <main className={s.container}>
      <DateContainer date={date} today={today} league={league} />
      <VelocityTransitionGroup className={s.fade} {...velocity_scoreboard(direction)}>
        <ul className={s.list} key={date}>
          {games}
          { bgImg && <Event bgImg={bgImg} /> }
        </ul>
      </VelocityTransitionGroup>
    </main>
  )
}
