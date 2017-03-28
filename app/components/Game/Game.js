import React, { PropTypes } from 'react'
import { GameState, Team, Expand, Details } from 'components'
import { DetailsContainer } from 'containers'
import { VelocityTransitionGroup } from 'velocity-react'
import { velocity_game } from 'config/velocity'
import { mlbTeamProps, nbaTeamProps, nflTeamProps, nhlTeamProps } from './props/team'
import { mlbGameStateProps, nbaGameStateProps, nhlGameStateProps } from './props/gameState'
import { gameItem, fuckSafari, expandIcon, expandedIcon, details, detailsExpanded } from './styles.css'

const propTypes = {
  game: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  league: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  showDetails: PropTypes.func.isRequired
}

var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)

export default function Game(props) {
  if (props.league === 'mlb') return <MlbGame {...props} />
  if (props.league === 'nba') return <NbaGame {...props} />
  if (props.league === 'nfl') return <NflGame {...props} />
  if (props.league === 'nhl') return <NhlGame {...props} />
  return <h1>{'i hope this doesn\'t run'}</h1>

}

Game.propTypes = propTypes


const NbaGame = ({ game, date, league, showDetails, expanded }) => (
  <li className={isSafari ? fuckSafari : gameItem}>
    <GameState {...nbaGameStateProps(game)} />
    <Team {...nbaTeamProps(game, 'visitor', league)} />
    <Team {...nbaTeamProps(game, 'home', league)} />
    <Expand expanded={expanded} showDetails={showDetails} />
    <VelocityTransitionGroup className={expanded ? detailsExpanded : details} {...velocity_game}>
      { expanded && <DetailsContainer game={game} date={date} league={league} /> }
    </VelocityTransitionGroup>
  </li>
)

const NflGame = ({ game, date, league, showDetails, expanded }) => (
  <li className={isSafari ? fuckSafari : gameItem}>
    <Team {...nflTeamProps(game, 'h', league)} />
    <Team {...nflTeamProps(game, 'v', league)} />
    <Expand expanded={expanded} showDetails={showDetails} />
    <VelocityTransitionGroup className={expanded ? detailsExpanded : details} {...velocity_game}>
      <h2>{'details'}</h2>
      { expanded && <DetailsContainer game={game} date={date} league={league} /> }
    </VelocityTransitionGroup>
  </li>
)




function MlbGame({ game, date, league, showDetails, expanded }) {
  const gameState = mlbGameStateProps(game)
  const awayTeam = mlbTeamProps(game, 'away', league)
  const homeTeam = mlbTeamProps(game, 'home', league)
  return (
    <li className={isSafari ? fuckSafari : gameItem}>
      <GameState {...gameState} />
      <Team {...awayTeam} />
      <Team {...homeTeam} />
      <Expand expanded={expanded} showDetails={showDetails} />
      <VelocityTransitionGroup className={expanded ? detailsExpanded : details} {...velocity_game}>
        { expanded && <DetailsContainer game={game} date={date} league={league} /> }
      </VelocityTransitionGroup>
    </li>
  )
}

function NhlGame({ game, date, league, showDetails, expanded }) {
  const gameState = nhlGameStateProps(game)
  const awayTeam = nhlTeamProps(game, 'away', league)
  const homeTeam = nhlTeamProps(game, 'home', league)
  return (
    <li className={isSafari ? fuckSafari : gameItem}>
      <GameState {...gameState} />
      <Team {...awayTeam} />
      <Team {...homeTeam} />
      <Expand expanded={expanded} showDetails={showDetails} />
      <VelocityTransitionGroup className={expanded ? detailsExpanded : details} {...velocity_game}>
        { expanded && <Details game={game} date={date} league={league} expanded={expanded} /> }
      </VelocityTransitionGroup>
    </li>
  )
}
