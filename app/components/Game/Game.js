import React, { PropTypes } from 'react'
import { GameState, Team, Details } from 'components'
import { formatTime } from 'helpers/utils'
import Add from 'react-icons/lib/md/add'
import X from 'react-icons/lib/md/clear'
import { gameContainer, expandIcon } from './styles.css'

const propTypes = {
  game: PropTypes.object.isRequired,
  sport: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  toggleDetails: PropTypes.func.isRequired
}

export default function Game({game, sport, expanded, toggleDetails}) {
  return (
    <div className={gameContainer}>
      {sport === 'mlb'
        ? <MlbGame
            game={game}
            sport={sport}
            expanded={expanded}
            toggleDetails={toggleDetails}
          />
        : sport === 'nba'
          ? <NbaGame
              game={game}
              sport={sport}
              expanded={expanded}
              toggleDetails={toggleDetails}
            />
          : <h1>{'ayeee'}</h1>
      }
    </div>

  )
}

Game.propTypes = propTypes

function MlbGame({game, sport, expanded, toggleDetails}) {
  const img = game.game_type === 'A' ? 'png' : 'svg'
  return (
    <div>
      <GameState
        status={game.status.status}
        time={game.time}
        ampm={game.ampm}
        tz={game.time_zone}
        inning={game.status.inning}
        state={game.status.inning_state}
        outs={game.status.o}
        reason={game.status.reason}
        description={game.description}
        doubleHeader={game.double_header_sw}
        gameNbr={game.game_nbr}
        isPlayoffs={false}
      />
      <Team
        name={game.game_type === 'A' ? 'National' : game.away_team_name}
        code={game.away_file_code}
        ls={game.away_loss}
        ws={game.away_win}
        score={game.linescore.r.away}
        img={img}
        sport={sport}
      />
      <Team
        name={game.game_type === 'A' ? 'American' : game.home_team_name}
        code={game.home_file_code}
        ls={game.home_loss}
        ws={game.home_win}
        score={game.linescore.r.home}
        img={img}
        sport={sport}
      />
      <span className={expandIcon} onClick={toggleDetails}>
        {expanded ? <X /> : <Add />}
      </span>
      {expanded ? <Details game={game} status={game.status.status} /> : null}
    </div>
  )
}


function NbaGame({game, sport, expanded, toggleDetails}) {
  const time = formatTime(game.time)
  const ampm = Number(game.time) > 1200 ? 'PM' : 'AM'
  const isPlayoffs = game.playoffs ? true : false
  return (
    <div>
      <GameState
        status={game.period_time.period_status}
        time={time}
        ampm={ampm}
        inning={game.period_time.period_value}
        state={'Qtr'}
        gameNbr={isPlayoffs ? game.playoffs.game_number : null}
        isPlayoffs={isPlayoffs}
      />
      <Team
        name={game.visitor.nickname}
        code={game.visitor.team_key.toLowerCase()}
        ls={isPlayoffs ? game.playoffs.home_wins : null}
        ws={isPlayoffs ? game.playoffs.visitor_wins : null}
        score={game.visitor.score}
        sport={sport}
      />
      <Team
        name={game.home.nickname}
        code={game.home.team_key.toLowerCase()}
        ls={isPlayoffs ? game.playoffs.visitor_wins : null}
        ws={isPlayoffs ? game.playoffs.home_wins : null}
        score={game.home.score}
        sport={sport}
      />
      <span className={expandIcon} onClick={toggleDetails}>
        {expanded ? <X /> : <Add />}
      </span>
      {expanded ? 'expanded !' : null}
    </div>
  )
}
