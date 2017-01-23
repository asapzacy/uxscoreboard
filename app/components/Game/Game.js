import React, { PropTypes } from 'react'
import { VelocityTransitionGroup } from 'velocity-react'
import { GameState, Team, Details } from 'components'
import { DetailsContainer } from 'containers'
import { mlbTeamProps, nbaTeamProps, nhlTeamProps } from 'helpers/props/teamProps'
import { nbaGameStateProps, nhlGameStateProps } from 'helpers/props/gameStateProps'
import Plus from 'react-icons/lib/md/add'
import { gameItem, expandIcon, expandedIcon, details, detailsExpanded } from './styles.css'

const propTypes = {
  game: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  league: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  showDetails: PropTypes.func.isRequired
}

export default function Game(props) {
  if (props.league === 'mlb') return <MlbGame {...props} />
  if (props.league === 'nba') return <NbaGame {...props} />
  if (props.league === 'nhl') return <NhlGame {...props} />

}

Game.propTypes = propTypes


const time = 110
const el = 'flex'

function NbaGame({ game, date, league, showDetails, expanded }) {
  const awayTeam = nbaTeamProps(game, 'visitor', league)
  const homeTeam = nbaTeamProps(game, 'home', league)
  const gameState = nbaGameStateProps(game, league)
  return (
    <li className={gameItem}>
      <GameState {...gameState} />
      <Team {...awayTeam} />
      <Team {...homeTeam} />
      <span className={expanded ? expandedIcon : expandIcon} onClick={showDetails}><Plus /></span>
      <VelocityTransitionGroup className={expanded ? detailsExpanded : details} enter={{animation:'slideDown',duration:time,display:el}} leave={{animation:'slideUp',duration:time,display:el,delay:2000}}>
        { expanded && <DetailsContainer game={game} date={date} league={league} /> }
      </VelocityTransitionGroup>
    </li>
  )
}

function NhlGame({ game, date, league, showDetails, expanded }) {
  const awayTeam = nhlTeamProps(game, 'away', league)
  const homeTeam = nhlTeamProps(game, 'home', league)
  const gameState = nhlGameStateProps(game, league)
  return (
    <li className={gameItem}>
      <GameState {...gameState} />
      <Team {...awayTeam} />
      <Team {...homeTeam} />
      <span className={expanded ? expandedIcon : expandIcon} onClick={showDetails}><Plus /></span>
      <VelocityTransitionGroup className={expanded ? detailsExpanded : details} enter={{animation:'slideDown',duration:time,display:el}} leave={{animation:'slideUp',duration:time,display:el,delay:2000}}>
        { expanded && <Details game={game} date={date} league={league} expanded={expanded} /> }
      </VelocityTransitionGroup>
    </li>
  )
}



function MlbGame({ game, date, league, showDetails, expanded }) {
  const awayTeam = mlbTeamProps(game, 'away', league)
  const homeTeam = mlbTeamProps(game, 'home', league)
  return (
    <li className={gameItem}>
      <Team {...awayTeam} />
      <Team {...homeTeam} />
      <span className={expanded ? expandedIcon : expandIcon} onClick={showDetails}><Plus /></span>
      <VelocityTransitionGroup className={details} enter={{animation:'slideDown',duration:time,display:el}} leave={{animation:'slideUp',duration:time,display:el}}>
        { expanded && <Details game={game} date={date} league={league} expanded={expanded} /> }
      </VelocityTransitionGroup>
    </li>
  )
}
