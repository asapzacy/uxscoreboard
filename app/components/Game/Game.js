import React from 'react'
import { GameState, Expand, Details, Team } from 'components'
import { DetailsContainer } from 'containers'
import { VelocityTransitionGroup } from 'velocity-react'
import { velocity_game } from 'config/velocity'
import { mlbTeamProps, nbaTeamProps, nflTeamProps, nhlTeamProps } from '../Team/props'
import { mlbGameStateProps, nflGameStateProps, nbaGameStateProps, nhlGameStateProps } from '../GameState/props'
import s from './Game.scss'

const fuckSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)

const getGameStyles = (isHovered, isExpanded, hasLoaded) => ({
  flexBasis: fuckSafari && '320px',
  transform: isHovered && 'translateY(-2px)',
  boxShadow: (isHovered || isExpanded) && '0 9px 17.5px rgba(50,50,93,.1),0 4px 7.5px rgba(0,0,0,.07)',
  color: hasLoaded && 'rgba(7,7,7,1)'
})

const Game = (props) => {
  switch (props.league) {
    case 'mlb': return <MlbGame {...props} />
    case 'nba': return <NbaGame {...props} />
    case 'nfl': return <NflGame {...props} />
    case 'nhl': return <NhlGame {...props} />
  }
}

export default Game

const NbaGame = ({ game, date, league, lastUpdated, isExpanded, showDetails, isHovered, scaleGame, hasLoaded, logoHasLoaded }) => (
  <li className={s.item} style={getGameStyles(isHovered, isExpanded, hasLoaded)}>
    <span className={s.topHalf} onClick={showDetails} onMouseEnter={scaleGame} onMouseLeave={scaleGame}>
      <GameState {...nbaGameStateProps(game)} />
      <Team {...nbaTeamProps(game, 'visitor', league)} hasLoaded={hasLoaded} logoHasLoaded={logoHasLoaded} />
      <Team {...nbaTeamProps(game, 'home', league)} hasLoaded={hasLoaded} logoHasLoaded={logoHasLoaded} />
      <Expand isExpanded={isExpanded} />
    </span>
    <VelocityTransitionGroup className={isExpanded ? s.detailsExpanded : s.details} {...velocity_game}>
      { isExpanded && <DetailsContainer game={game} date={date} league={league} lastUpdated={lastUpdated} /> }
    </VelocityTransitionGroup>
  </li>
)

const NflGame = ({ game, date, league, lastUpdated, isExpanded, showDetails, isHovered, scaleGame, hasLoaded, logoHasLoaded }) => (
  <li className={s.item} style={getGameStyles(isHovered, isExpanded, hasLoaded)}>
    <span className={s.topHalf} onClick={showDetails} onMouseEnter={scaleGame} onMouseLeave={scaleGame}>
      <GameState {...nflGameStateProps(game)} />
      <Team {...nflTeamProps(game, 'v', league)} hasLoaded={hasLoaded} logoHasLoaded={logoHasLoaded} />
      <Team {...nflTeamProps(game, 'h', league)} hasLoaded={hasLoaded} logoHasLoaded={logoHasLoaded} />
      <Expand isExpanded={isExpanded} />
    </span>
    <VelocityTransitionGroup className={isExpanded ? s.detailsExpanded : s.details} {...velocity_game}>
      { isExpanded && <DetailsContainer game={game} date={date} league={league} lastUpdated={lastUpdated} /> }
    </VelocityTransitionGroup>
  </li>
)

const MlbGame = ({ game, date, league, lastUpdated, isExpanded, showDetails, isHovered, scaleGame, hasLoaded, logoHasLoaded }) => (
  <li className={s.item} style={getGameStyles(isHovered, isExpanded, hasLoaded)}>
    <span className={s.topHalf} onClick={showDetails} onMouseEnter={scaleGame} onMouseLeave={scaleGame}>
      <GameState {...mlbGameStateProps(game)} />
      <Team {...mlbTeamProps(game, 'away', league)} hasLoaded={hasLoaded} logoHasLoaded={logoHasLoaded} />
      <Team {...mlbTeamProps(game, 'home', league)} hasLoaded={hasLoaded} logoHasLoaded={logoHasLoaded} />
      <Expand isExpanded={isExpanded} />
    </span>
    <VelocityTransitionGroup className={isExpanded ? s.detailsExpanded : s.details} {...velocity_game}>
      { isExpanded && <DetailsContainer game={game} date={date} league={league} lastUpdated={lastUpdated} /> }
    </VelocityTransitionGroup>
  </li>
)

const NhlGame = ({ game, date, league, lastUpdated, isExpanded, showDetails, isHovered, scaleGame, hasLoaded, logoHasLoaded }) => (
  <li className={s.item} style={getGameStyles(isHovered, isExpanded, hasLoaded)}>
    <span className={s.topHalf} onClick={showDetails} onMouseEnter={scaleGame} onMouseLeave={scaleGame}>
      <GameState {...nhlGameStateProps(game)} />
      <Team {...nhlTeamProps(game, 'away', league)} hasLoaded={hasLoaded} logoHasLoaded={logoHasLoaded} />
      <Team {...nhlTeamProps(game, 'home', league)} hasLoaded={hasLoaded} logoHasLoaded={logoHasLoaded} />
      <Expand isExpanded={isExpanded} />
    </span>
    <VelocityTransitionGroup className={isExpanded ? s.detailsExpanded : s.details} {...velocity_game}>
      { isExpanded && <DetailsContainer game={game} date={date} league={league} lastUpdated={lastUpdated} /> }
    </VelocityTransitionGroup>
  </li>
)
