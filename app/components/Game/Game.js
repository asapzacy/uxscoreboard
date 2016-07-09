import React from 'react'
import { gameContainer, title, slogan } from './styles.css'

export default function Game(props) {
  const game = props.game
  const away = game.away_name_abbrev
  const home = game.home_name_abbrev
  const awayScore = game.away_team_runs
  const homeScore = game.home_team_runs
  return (
    <table className={gameContainer}>
      <h1 className={title}>{`${away} || ${home}`}</h1>
      <p className={slogan}>{`${awayScore} || ${homeScore}`}</p>
    </table>
  )
}
