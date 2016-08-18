import React, { PropTypes } from 'react'
import { GameState, Team, Details } from 'components'
import Add from 'react-icons/lib/md/add'
import X from 'react-icons/lib/md/clear'
import { gameContainer, expandIcon } from './styles.css'

const propTypes = {
  game: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  toggleDetails: PropTypes.func.isRequired
}

export default function Game({game, type, expanded, toggleDetails}) {
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
        name={type === 'A' ? 'National' : game.away_team_name}
        code={game.away_file_code}
        ls={game.away_loss}
        ws={game.away_win}
        runs={game.linescore.r.away}
        img={type === 'A' ? 'png' : 'svg'}
      />
      <Team
        name={type === 'A' ? 'American' : game.home_team_name}
        code={game.home_file_code}
        ls={game.home_loss}
        ws={game.home_win}
        runs={game.linescore.r.home}
        img={type === 'A' ? 'png' : 'svg'}
      />
      <span className={expandIcon} onClick={toggleDetails}>
        {expanded ? <X /> : <Add />}
      </span>
      {expanded ? <Details game={game} status={game.status.status} /> : null}
    </div>
  )
}

Game.propTypes = propTypes
