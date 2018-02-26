import React from 'react'
import { GameState, Team, Expand, Details } from 'components'
import { DetailsContainer, ReactDinoContainer } from 'containers'
import { VelocityTransitionGroup } from 'velocity-react'
import { velocity_game as velocityGame } from 'config/velocity'
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

const Game = props => {
  let awayTeamProps
  let homeTeamProps
  let gameProps
  const { league, game } = props
  if (league === 'mlb') {
    gameProps = mlbGameStateProps(game)
    awayTeamProps = mlbTeamProps(game, 'away', league)
    homeTeamProps = mlbTeamProps(game, 'home', league)
  } else if (league === 'nba') {
    gameProps = nbaGameStateProps(game)
    awayTeamProps = nbaTeamProps(game, 'visitor', league)
    homeTeamProps = nbaTeamProps(game, 'home', league)
  } else if (league === 'nfl') {
    gameProps = nflGameStateProps(game)
    awayTeamProps = nflTeamProps(game, 'v', league)
    homeTeamProps = nflTeamProps(game, 'h', league)
  } else if (league === 'nhl') {
    gameProps = nhlGameStateProps(game)
    awayTeamProps = nhlTeamProps(game, 'away', league)
    homeTeamProps = nhlTeamProps(game, 'home', league)
  }
  const { isHovered, isExpanded, hasLoaded, showDetails, scaleGame, logoHasLoaded, lastUpdated, date } = props
  return (
    <li className={s.item} style={getGameStyles(isHovered, isExpanded, hasLoaded)}>
      <ReactDinoContainer
        size={1}
        seconds={4}
        data={[gameProps, homeTeamProps, awayTeamProps]}
        validateData={arr => {
          const size = arr.length
          const readySize = arr.filter(el => Object.keys(el).length).length
          return size === readySize
        }}
        render={() => (
          <span className={s.topHalf} onClick={showDetails} onMouseEnter={scaleGame} onMouseLeave={scaleGame}>
            <GameState {...gameProps} />
            <Team {...awayTeamProps} hasLoaded={hasLoaded} logoHasLoaded={logoHasLoaded} />
            <Team {...homeTeamProps} hasLoaded={hasLoaded} logoHasLoaded={logoHasLoaded} />
            <Expand isExpanded={isExpanded} />
          </span>
        )} />
      <VelocityTransitionGroup className={isExpanded ? s.detailsExpanded : s.details} {...velocityGame}>
        { isExpanded && (
          <DetailsContainer game={game} date={date} league={league} lastUpdated={lastUpdated} />
        )}
      </VelocityTransitionGroup>
    </li>
  )
}

export default Game
