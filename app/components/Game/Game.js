import React, { PropTypes } from 'react'
import { GameState, Team, Details } from 'components'
import Add from 'react-icons/lib/md/add'
import Clear from 'react-icons/lib/md/clear'
import { gameContainer, expandIcon } from './styles.css'

const propTypes = {
  game: PropTypes.object.isRequired,
  asg: PropTypes.bool.isRequired,
  expanded: PropTypes.bool.isRequired,
  toggleDetails: PropTypes.func.isRequired
}

export default function Game({game, asg, expanded, toggleDetails}) {
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
        doubleHeader={game.double_header_sw}
        gameNumber={game.game_nbr}
      />
      <Team
        name={asg ? 'National' : game.away_team_name}
        code={game.away_file_code}
        ls={game.away_loss}
        ws={game.away_win}
        runs={game.linescore.r.away}
        img={asg ? 'png' : 'svg'}
      />
      <Team
        name={asg ? 'American' : game.home_team_name}
        code={game.home_file_code}
        ls={game.home_loss}
        ws={game.home_win}
        runs={game.linescore.r.home}
        img={asg ? 'png' : 'svg'}
      />
      <span className={expandIcon} onClick={toggleDetails}>
        {expanded ? <Clear /> : <Add />}
      </span>
      {expanded ? <Details game={game} status={game.status.status} /> : null}
    </div>
  )
}

Game.propTypes = propTypes
