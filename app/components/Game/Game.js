import React, { PropTypes } from 'react'
import { GameState, Team, Details } from 'components'
import { mlbTeamProps } from 'helpers/gameProps'
import Add from 'react-icons/lib/md/add'
import X from 'react-icons/lib/md/clear'
import { gameItem, expandIcon } from './styles.css'

const propTypes = {
  game: PropTypes.object.isRequired,
  league: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  showDetails: PropTypes.func.isRequired
}

export default function Game({ ...props }) {
  if (props.league === 'mlb') {
    return ( <MlbGame {...props} /> )
  }
}

Game.propTypes = propTypes



function MlbGame({ game, league, expanded, showDetails }) {
  const awayTeam = mlbTeamProps(game, 'away', league)
  const homeTeam = mlbTeamProps(game, 'home', league)
  return (
    <li className={gameItem}>
      <GameState game={game} league={league} />
      <Team {...awayTeam} />
      <Team {...homeTeam} />
      <span className={expandIcon} onClick={showDetails}>
        {expanded ? <X /> : <Add />}
      </span>
      {expanded ? <Details game={game} league={league} status={game.status.status} /> : null}
    </li>
  )
}











//
// function NbaGame({game, league, details, expanded, showDetails}) {
//   return (
//     <div className={gameContainer}>
//       <GameState game={game} league={league} />
//       <Team
//         name={game.visitor.nickname}
//         code={game.visitor.team_key.toLowerCase()}
//         ls={game.playoffs ? game.playoffs.home_wins : null}
//         ws={game.playoffs ? game.playoffs.visitor_wins : null}
//         score={game.visitor.score}
//         league={league}/>
//       <Team
//         name={game.home.nickname}
//         code={game.home.team_key.toLowerCase()}
//         ls={game.playoffs ? game.playoffs.visitor_wins : null}
//         ws={game.playoffs ? game.playoffs.home_wins : null}
//         score={game.home.score}
//         league={league}/>
//       <span className={expandIcon} onClick={toggleDetails}>
//         {expanded ? <X /> : <Add />}
//       </span>
//       {expanded ? <Details game={game} league={league} details={details} /> : null}
//     </div>
//   )
// }
//
// function NhlGame({game, league, expanded, toggleDetails}) {
//   return (
//     <div className={gameContainer}>
//       <GameState game={game} league={league} />
//       <Team
//         name={game.teams.away.team.teamName}
//         code={game.teams.away.team.abbreviation.toLowerCase()}
//         ls={game.teams.away.leagueRecord.losses + ''}
//         ws={game.teams.away.leagueRecord.wins + ''}
//         score={game.teams.away.score + ''}
//         league={league}/>
//       <Team
//         name={game.teams.home.team.teamName}
//         code={game.teams.home.team.abbreviation.toLowerCase()}
//         ls={game.teams.home.leagueRecord.losses + ''}
//         ws={game.teams.home.leagueRecord.wins + ''}
//         score={game.teams.home.score + ''}
//         league={league}/>
//       <span className={expandIcon} onClick={toggleDetails}>
//         {expanded ? <X /> : <Add />}
//       </span>
//       {expanded ? <Details game={game} league={league} /> : null}
//     </div>
//   )
// }
//
