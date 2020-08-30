import React from 'react'
import { NoGames, Event } from 'components'
import { GameContainer, DateContainer } from 'containers'
import { getNbaGameDetails } from 'helpers/api'
import { VelocityTransitionGroup } from 'velocity-react'
import 'velocity-animate/velocity.ui'
import { velocityScoreboard } from 'config/velocity'
import s from './Scoreboard.scss'

export default function Scoreboard({
  bgImg,
  scores,
  date,
  today,
  league,
  seasonState,
  direction,
  lastUpdated,
  isError
}) {
  let games
  if (league === 'mlb') {
    games =
      !scores.length || seasonState.isPreseason ? (
        <NoGames text={'no games today'} />
      ) : isError ? (
        <NoGames text={'woops! something went wrong.'} />
      ) : (
        scores.map(item => (
          <GameContainer
            game={item}
            date={date}
            league={league}
            lastUpdated={lastUpdated}
            key={item.gamePk}
          />
        ))
      )
  }
  if (league === 'nba') {
    games = !scores.length ? (
      <NoGames text={'no games today'} />
    ) : isError ? (
      <NoGames text={'woops! something went wrong.'} />
    ) : (
      scores.map(game => {
        const { gameId } = game
        getNbaGameDetails(date, gameId).then(details => {
          if (game.hTeam && game.vTeam && details.stats) {
            game.hTeam.stats = details.stats.hTeam
            game.vTeam.stats = details.stats.vTeam
          }
        })
        return (
          <GameContainer
            game={game}
            id={gameId}
            date={date}
            league={league}
            key={gameId}
          />
        )
      })
    )
  }
  if (league === 'nhl') {
    games = !scores.dates.length ? (
      <NoGames text={'no games today'} />
    ) : isError ? (
      <NoGames text={'woops! something went wrong.'} />
    ) : (
      scores.dates[0].games.map(item => (
        <GameContainer
          game={item}
          date={date}
          league={league}
          lastUpdated={lastUpdated}
          key={item.gamePk}
        />
      ))
    )
  }
  if (league === 'nfl') {
    games = !scores.length ? (
      <NoGames text={'no games today'} />
    ) : isError ? (
      <NoGames text={'woops! something went wrong.'} />
    ) : (
      scores.map(el => (
        <GameContainer
          game={el}
          date={date}
          league={league}
          lastUpdated={lastUpdated}
          key={el.eid}
        />
      ))
    )
  }
  return (
    <main className={s.container}>
      <DateContainer date={date} today={today} league={league} />
      <VelocityTransitionGroup
        className={s.fade}
        {...velocityScoreboard(direction)}
      >
        <ul className={s.list} key={date}>
          {games}
          {bgImg && <Event bgImg={bgImg} />}
        </ul>
      </VelocityTransitionGroup>
    </main>
  )
}
