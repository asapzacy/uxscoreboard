import React, { PropTypes } from 'react'
import { VelocityTransitionGroup } from 'velocity-react'
import { GameState, Team, Details } from 'components'
import { mlbTeamProps } from 'helpers/gameProps'
import Plus from 'react-icons/lib/md/add'
import { gameItem, expandIcon, expandedIcon } from './styles.css'

const propTypes = {
  game: PropTypes.object.isRequired,
  league: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
  showDetails: PropTypes.func.isRequired
}

export default function Game({ ...props }) {
  if (props.league === 'mlb') {
    return <MlbGame {...props} />
  }
}

Game.propTypes = propTypes



function MlbGame({ game, league, showDetails, expanded }) {
  const awayTeam = mlbTeamProps(game, 'away', league)
  const homeTeam = mlbTeamProps(game, 'home', league)
  const spanClass = expanded ? expandedIcon : expandIcon
  return (
    <li className={gameItem}>
      <GameState game={game} league={league} />
      <Team {...awayTeam} />
      <Team {...homeTeam} />
      <span className={spanClass} onClick={showDetails}><Plus /></span>
      <VelocityTransitionGroup enter={{animation:'slideDown'}} leave={{animation:'slideUp'}} duration='220'>
        { expanded && <Details game={game} league={league} /> }
      </VelocityTransitionGroup>
    </li>
  )
}
