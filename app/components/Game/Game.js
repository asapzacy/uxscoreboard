import React from 'react'
import { GameState, Team, Expand, Details } from 'components'
import { DetailsContainer } from 'containers'
import { VelocityTransitionGroup } from 'velocity-react'
import { velocity_game } from 'config/velocity'
import { mlbTeamProps, nbaTeamProps, nflTeamProps, nhlTeamProps } from '../Team/props'
import { mlbGameStateProps, nflGameStateProps, nbaGameStateProps, nhlGameStateProps } from '../GameState/props'
import { gameItem, topHalf, details, detailsExpanded } from './styles.css'

const fuckSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)
const style = (isHovered) => ({ flexBasis: fuckSafari && '320px', transform: isHovered && 'scale(1.0075)' })

const Game = (props) => {
  switch (props.league) {
    case 'mlb': return <MlbGame {...props} />
    case 'nba': return <NbaGame {...props} />
    case 'nfl': return <NflGame {...props} />
    case 'nhl': return <NhlGame {...props} />
  }
}

export default Game

const NbaGame = ({ game, date, league, lastUpdated, isExpanded, showDetails, isHovered, scaleGame }) => (
  <li className={gameItem} style={style(isHovered)}>
    <span className={topHalf} onClick={showDetails} onMouseEnter={scaleGame} onMouseLeave={scaleGame}>
      <GameState {...nbaGameStateProps(game)} />
      <Team {...nbaTeamProps(game, 'visitor', league)} />
      <Team {...nbaTeamProps(game, 'home', league)} />
      <Expand isExpanded={isExpanded} />
    </span>
    <VelocityTransitionGroup className={isExpanded ? detailsExpanded : details} {...velocity_game}>
      { isExpanded && <DetailsContainer game={game} date={date} league={league} lastUpdated={lastUpdated} /> }
    </VelocityTransitionGroup>
  </li>
)

const NflGame = ({ game, date, league, lastUpdated, isExpanded, showDetails, isHovered, scaleGame }) => (
  <li className={gameItem} style={style(isHovered)}>
    <span className={topHalf} onClick={showDetails} onMouseEnter={scaleGame} onMouseLeave={scaleGame}>
      <GameState {...nflGameStateProps(game)} />
      <Team {...nflTeamProps(game, 'h', league)} />
      <Team {...nflTeamProps(game, 'v', league)} />
      <Expand isExpanded={isExpanded} />
    </span>
    <VelocityTransitionGroup className={isExpanded ? detailsExpanded : details} {...velocity_game}>
      { isExpanded && <DetailsContainer game={game} date={date} league={league} lastUpdated={lastUpdated} /> }
    </VelocityTransitionGroup>
  </li>
)

const MlbGame = ({ game, date, league, lastUpdated, isExpanded, showDetails, isHovered, scaleGame }) => (
  <li className={gameItem} style={style(isHovered)}>
    <span className={topHalf} onClick={showDetails} onMouseEnter={scaleGame} onMouseLeave={scaleGame}>
      <GameState {...mlbGameStateProps(game)} />
      <Team {...mlbTeamProps(game, 'away', league)} />
      <Team {...mlbTeamProps(game, 'home', league)} />
      <Expand isExpanded={isExpanded} />
    </span>
    <VelocityTransitionGroup className={isExpanded ? detailsExpanded : details} {...velocity_game}>
      { isExpanded && <DetailsContainer game={game} date={date} league={league} lastUpdated={lastUpdated} /> }
    </VelocityTransitionGroup>
  </li>
)

const NhlGame = ({ game, date, league, lastUpdated, isExpanded, showDetails, isHovered, scaleGame }) => (
  <li className={gameItem} style={style(isHovered)}>
    <span className={topHalf} onClick={showDetails} onMouseEnter={scaleGame} onMouseLeave={scaleGame}>
      <GameState {...nhlGameStateProps(game)} />
      <Team {...nhlTeamProps(game, 'away', league)} />
      <Team {...nhlTeamProps(game, 'home', league)} />
      <Expand isExpanded={isExpanded} />
    </span>
    <VelocityTransitionGroup className={isExpanded ? detailsExpanded : details} {...velocity_game}>
      { isExpanded && <DetailsContainer game={game} date={date} league={league} lastUpdated={lastUpdated} /> }
    </VelocityTransitionGroup>
  </li>
)
