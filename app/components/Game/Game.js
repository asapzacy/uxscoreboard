import React from 'react'
import { gameContainer, gameInfo, status, teamContainer,
  logo, team, name, record, score } from './styles.css'

export default function Game(props) {

  const game = props.game,
        awayTeam = game.away_team_name,
        awayCity = game.away_file_code,
        awayScore = game.away_team_runs,
        awayWs = game.away_win,
        awayLs = game.away_loss,
        homeTeam = game.home_team_name,
        homeCity = game.home_file_code,
        homeScore = game.home_team_runs,
        homeWs = game.home_win,
        homeLs = game.home_loss,
        inning = game.inning,
        inningState = game.top_inning,
        status = game.status,
        time = game.home_time,
        ampm = game.home_ampm,
        tz = game.home_time_zone

  const gameState = () => {
    let result = ''
    if (status === 'Pre Game' || status === 'Preview')
      result = getPreGame()
    else if (status === 'In Progress')
      result = getMidGame()
    else if (status === 'Final' || status === 'Game Over')
      result = getPostGame()
    return result
  }

  const getPreGame = () => `${time} ${ampm} ${tz}`
  const getMidGame = () => inningState === 'Y' ? `Top ${inning}` : `Bottom ${inning}`
  const getPostGame = () => inning > 9 ? `Final/${inning}` : `Final`

  const inningSuffix = () => {
    switch(inning) {
      case '1' || '21': return 'st'
      case '2' || '22': return 'nd'
      case '3' || '23': return 'rd'
      default: return 'th'
    }
  }
  return (
    <div className={gameContainer}>
    <div className={gameInfo}>
      <span className={status}>{gameState()}
        <sup>{ status === 'In Progress' ? inningSuffix() : null }</sup>
      </span>
    </div>
      <div className={teamContainer}>
        <img className={logo} src={`assets/img/mlb/${awayCity}.svg`} alt={awayTeam}/>
        <div className={team}>
          <span className={name}>{awayTeam}</span>
          <span className={record}>{`(${awayWs}-${awayLs})`}</span>
        </div>
        <span className={score}>{awayScore}</span>
      </div>
      <div className={teamContainer}>
        <img className={logo} src={`assets/img/mlb/${homeCity}.svg`} alt={homeTeam}/>
        <div className={team}>
          <span className={name}>{homeTeam}</span>
          <span className={record}>{`(${homeWs}-${homeLs})`}</span>
        </div>
        <span className={score}>{homeScore}</span>
      </div>
    </div>
  )
}
