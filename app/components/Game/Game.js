import React, { Component } from 'react'
import { GameState, Team, Details } from 'components'
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

    let game = this.props.game,
        status = game.status.status
    return (
      <div className={gameContainer}>
        <GameState
          status={game.status.status}
          time={game.time}
          ampm={game.ampm}
          tz={game.time_zone}
          inning={game.status.inning}
          inningState={game.status.inning_state}
          outs={game.status.o}
          reason={game.status.reason}
          description={game.description}
        />
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
        { this.state.expanded ? <Up /> : <Down /> }
      </span>
      { this.state.expanded
        ? <Details
            status={game.status.status}
            awayTeam={game.away_team_name}
            homeTeam={game.home_team_name}
            venue={game.venue}
            location={game.location}
            date={game.original_date}
            linescore={game.linescore}
            awayAbbr={game.away_name_abbrev}
            homeAbbr={game.home_name_abbrev}
            awayCode={game.away_file_code}
            homeCode={game.home_file_code}
            spAway={game.away_probable_pitcher}
            spHome={game.home_probable_pitcher}
            pitcher={game.pitcher}
            batter={game.batter}
            pbp={game.pbp}
            runners={game.runners_on_base}
            balls={game.status.b}
            strikes={game.status.s}
            outs={game.status.o}
            inningState={game.status.inning_state}
            pWin={game.winning_pitcher}
            pLoss={game.losing_pitcher}
            pSave={game.save_pitcher}
            alerts={game.alerts}
            review={game.review}
          />
        : null
      }
      </div>
    )
  }
}

export default Game
