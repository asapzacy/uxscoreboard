import React, { Component } from 'react'
import { Team, Details } from 'components'
import Down from 'react-icons/lib/fa/angle-down'
import Up from 'react-icons/lib/fa/angle-up'
import { gameContainer, gameInfo, outs, expandIcon, test } from './styles.css'

class Game extends Component {
  constructor() {
    super()
    this.state = {
      expanded: false
    }
  }
  componentDidMount() {
  }
  expandGame() {
    this.setState({
      expanded: !this.state.expanded
    })
  }

  render() {

    const game = this.props.game,
          inning = game.status.inning,
          status = game.status.status,
          inningState = game.status.inning,
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

    const getPreGame = () => `${game.time} ${game.ampm} ${game.time_zone}`
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
        <Team
          name={game.away_team_name}
          code={game.away_file_code}
          ls={game.away_loss}
          ws={game.away_win}
          runs={game.linescore.r.away}
        />
        <Team
          name={game.home_team_name}
          code={game.home_file_code}
          ls={game.home_loss}
          ws={game.home_win}
          runs={game.linescore.r.home}
        />

        <span className={expandIcon} onClick={() => this.expandGame()}>
          { this.state.expanded
            ? <Up />
            : <Down />
          }
        </span>
          { this.state.expanded
            ? <Details
                venue={game.venue}
                location={game.location}
                linescore={game.linescore}
                awayAbbr={game.away_name_abbrev}
                homeAbbr={game.home_name_abbrev}
              />
            : null
          }
      </div>
    )
  }
}

export default Game
