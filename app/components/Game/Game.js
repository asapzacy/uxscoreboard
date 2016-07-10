import React from 'react'
import { gameContainer, gameInfo, teamContainer,
  teamLogo, team, score } from './styles.css'

export default function Game(props) {
  const game = props.game
  const awayTeam = game.away_team_name
  const homeTeam = game.home_team_name
  const awayCity = game.away_file_code
  const homeCity = game.home_file_code
  const awayScore = game.away_team_runs
  const homeScore = game.home_team_runs

  return (
    <div className={gameContainer}>
      <div className={teamContainer}>
        <img className={teamLogo} src={`assets/img/mlb/${awayCity}.svg`} alt=''/>
        <span className={team}>{awayTeam}</span>
        <span className={score}>{awayScore}</span>
      </div>
      <div className={teamContainer}>
        <img className={teamLogo} src={`assets/img/mlb/${homeCity}.svg`} alt=''/>
        <span className={team}>{homeTeam}</span>
        <span className={score}>{homeScore}</span>
      </div>
    </div>
  )
}
