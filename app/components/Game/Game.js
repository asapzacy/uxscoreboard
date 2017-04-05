import React, { PropTypes } from 'react'
import { GameState, Team, Expand, Details } from 'components'
import { DetailsContainer } from 'containers'
import { VelocityTransitionGroup } from 'velocity-react'
import { velocity_game } from 'config/velocity'
import { mlbTeamProps, nbaTeamProps, nflTeamProps, nhlTeamProps } from './props/team'
import { mlbGameStateProps, nflGameStateProps, nbaGameStateProps, nhlGameStateProps } from './props/gameState'
import { gameItem, topHalf, details, detailsExpanded } from './styles.css'

const propTypes = {
  game: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  league: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  showDetails: PropTypes.func.isRequired,
  isHovered: PropTypes.bool.isRequired,
  scaleGame: PropTypes.func.isRequired
}

const fuckSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor)

export default function Game(props) {
  if (props.league === 'mlb') return <MlbGame {...props} />
  if (props.league === 'nba') return <NbaGame {...props} />
  if (props.league === 'nfl') return <NflGame {...props} />
  if (props.league === 'nhl') return <NhlGame {...props} />
  return <h1>{'i hope this doesn\'t run'}</h1>
}

Game.propTypes = propTypes


const NbaGame = ({ game, date, league, isExpanded, showDetails, isHovered, scaleGame }) => (
  <li className={gameItem} style={{flexBasis: fuckSafari && '320px', transform: isHovered && 'scale(1.0125)'}}>
    <span className={topHalf} onClick={showDetails} onMouseEnter={scaleGame} onMouseLeave={scaleGame}>
      <GameState {...nbaGameStateProps(game)} />
      <Team {...nbaTeamProps(game, 'visitor', league)} />
      <Team {...nbaTeamProps(game, 'home', league)} />
      <Expand isExpanded={isExpanded} />
    </span>
    <VelocityTransitionGroup className={isExpanded ? detailsExpanded : details} {...velocity_game}>
      { isExpanded && <DetailsContainer game={game} date={date} league={league} /> }
    </VelocityTransitionGroup>
  </li>
)

const NflGame = ({ game, date, league, isExpanded, showDetails, isHovered, scaleGame }) => (
  <li className={gameItem} style={{flexBasis: fuckSafari && '320px', transform: isHovered && 'scale(1.0125)'}}>
    <span className={topHalf} onClick={showDetails} onMouseEnter={scaleGame} onMouseLeave={scaleGame}>
      <GameState {...nflGameStateProps(game)} />
      <Team {...nflTeamProps(game, 'h', league)} />
      <Team {...nflTeamProps(game, 'v', league)} />
      <Expand isExpanded={isExpanded} />
    </span>
    <VelocityTransitionGroup className={isExpanded ? detailsExpanded : details} {...velocity_game}>
      { isExpanded && <DetailsContainer game={game} date={date} league={league} /> }
    </VelocityTransitionGroup>
  </li>
)

const MlbGame = ({ game, date, league, isExpanded, showDetails, isHovered, scaleGame }) => (
  <li className={gameItem} style={{flexBasis: fuckSafari && '320px', transform: isHovered && 'scale(1.0125)'}}>
    <span className={topHalf} onClick={showDetails} onMouseEnter={scaleGame} onMouseLeave={scaleGame}>
      <GameState {...mlbGameStateProps(game)} />
      <Team {...mlbTeamProps(game, 'away', league)} />
      <Team {...mlbTeamProps(game, 'home', league)} />
      <Expand isExpanded={isExpanded} />
    </span>
    <VelocityTransitionGroup className={isExpanded ? detailsExpanded : details} {...velocity_game}>
      { isExpanded && <DetailsContainer game={game} date={date} league={league} /> }
    </VelocityTransitionGroup>
  </li>
)

const NhlGame = ({ game, date, league, isExpanded, showDetails, isHovered, scaleGame }) => (
  <li className={gameItem} style={{flexBasis: fuckSafari && '320px', transform: isHovered && 'scale(1.0125)'}}>
    <span className={topHalf} onClick={showDetails} onMouseEnter={scaleGame} onMouseLeave={scaleGame}>
      <GameState {...nhlGameStateProps(game)} />
      <Team {...nhlTeamProps(game, 'away', league)} />
      <Team {...nhlTeamProps(game, 'home', league)} />
      <Expand isExpanded={isExpanded} />
    </span>
    <VelocityTransitionGroup className={isExpanded ? detailsExpanded : details} {...velocity_game}>
      { isExpanded && <DetailsContainer game={game} date={date} league={league} /> }
    </VelocityTransitionGroup>
  </li>
)
