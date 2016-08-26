import React, { PropTypes } from 'react'
import { GameState, Team, Details } from 'components'
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
  if (sport === 'mlb') {
    return (
      <MlbGame
        game={game}
        sport={sport}
        expanded={expanded}
        toggleDetails={toggleDetails}
      />
    )
  }
  if (sport === 'nba') {
    return (
      <NbaGame
        game={game}
        sport={sport}
        expanded={expanded}
        toggleDetails={toggleDetails}
      />
    )
  }
  if (sport === 'nhl') {
    return (
      <NhlGame
        game={game}
        sport={sport}
        expanded={expanded}
        toggleDetails={toggleDetails}
      />
    )
  }
  else {
    return (
      <h1>{'ayeee'}</h1>
    )
  }
}


function NhlGame({game, sport, expanded, toggleDetails}) {
  const away = game.teams.away.team.id
  const home = game.teams.home.team.id
  return (
    <div className={gameContainer}>
      <GameState game={game} sport={sport} />
      <Team
        name={game.teams.away.team.teamName}
        code={game.teams.away.team.abbreviation.toLowerCase()}
        ls={game.teams.away.leagueRecord.losses + ''}
        ws={game.teams.away.leagueRecord.wins + ''}
        score={game.teams.away.score + ''}
        sport={sport}
      />
      <Team
        name={game.teams.home.team.teamName}
        code={game.teams.home.team.abbreviation.toLowerCase()}
        ls={game.teams.home.leagueRecord.losses + ''}
        ws={game.teams.home.leagueRecord.wins + ''}
        score={game.teams.home.score + ''}
        sport={sport}
      />
      <span className={expandIcon} onClick={toggleDetails}>
        {expanded ? <X /> : <Add />}
      </span>
      {expanded ? 'expanded !' : null}
    </div>
  )
}
Game.propTypes = propTypes















function MlbGame({game, sport, expanded, toggleDetails}) {
  const awayTeam = game.game_type === 'A' ? 'American' : game.away_team_name
  const homeTeam = game.game_type === 'A' ? 'National' : game.home_team_name
  const img = game.game_type === 'A' ? 'png' : 'svg'
  return (
    <div className={gameContainer}>
      <GameState game={game} sport={sport} />
      <Team
        name={awayTeam}
        code={game.away_file_code}
        ls={game.away_loss}
        ws={game.away_win}
        score={game.linescore.r.away}
        img={img}
        sport={sport}
      />
      <Team
        name={homeTeam}
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
  return (
    <div className={gameContainer}>
      <GameState game={game} sport={sport} />
      <Team
        name={game.visitor.nickname}
        code={game.visitor.team_key.toLowerCase()}
        ls={game.playoffs ? game.playoffs.home_wins : null}
        ws={game.playoffs ? game.playoffs.visitor_wins : null}
        score={game.visitor.score}
        sport={sport}
      />
      <Team
        name={game.home.nickname}
        code={game.home.team_key.toLowerCase()}
        ls={game.playoffs ? game.playoffs.visitor_wins : null}
        ws={game.playoffs ? game.playoffs.home_wins : null}
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
