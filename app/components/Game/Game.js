import React, { Component } from 'react'
import { gameContainer, gameInfo, teamContainer,
  teamLogo, teamName, teamRecord, teamScore, outs } from './styles.css'

class Game extends Component {
  render() {
    const game = this.props.game,
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
          tz = game.home_time_zone,
          outs = game.outs

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
    const getOuts = () => outs === 1 ? `${outs} out` : `${outs} outs`

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
        <span>{gameState()}
          { status === 'In Progress' ? <sup>{inningSuffix()}</sup> : null }
        </span>
          { status === 'In Progress' ? <span>{getOuts()}</span> : null }
      </div>
        <Team name={awayTeam} city={awayCity} ls={awayLs} ws={awayWs} score={awayScore} />
        <Team name={homeTeam} city={homeCity} ls={homeLs} ws={homeWs} score={homeScore} />
      </div>
    )
  }
}

export default function Team({name, city, ls, ws, score}) {
  return (
    <div className={teamContainer}>
      <img className={teamLogo} src={`assets/img/mlb/${city}.svg`} alt={name} />
      <div className={teamName}>
        <span>{name}</span>
        <span className={teamRecord}>{`(${ws}-${ls})`}</span>
      </div>
      <span className={teamScore}>{score}</span>
    </div>
  )
}


export default Game
