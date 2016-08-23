import React, { PropTypes } from 'react'
import { inningSuffix } from 'helpers/utils'
import { gameInfo } from './styles.css'

const propTypes = {
  game: PropTypes.object.isRequired,
  sport: PropTypes.string.isRequired
}

export default function GameState({game, sport}) {
  if (sport === 'mlb') {
    return (
      <MlbState
        status={game.status.status}
        time={game.time}
        ampm={game.ampm}
        tz={game.time_zone}
        inning={game.status.inning}
        inningState={game.status.inning_state}
        outs={game.status.o}
        reason={game.status.reason}
        description={game.description}
        doubleHdr={game.double_header_sw}
        gameNbr={game.game_nbr}
      />
    )
  }
  else return <h1>{'yo'}</h1>

}

GameState.propTypes = propTypes


function MlbState({status, time, ampm, tz, inning, inningState, outs,
  reason, description, doubleHdr, gameNbr}) {
  // all cases of pre-game statuses
  if (status === 'Preview' || status === 'Warmup' || status === 'Pre-Game' || status === 'Delayed Start') {
    return (
      <div className={gameInfo}>
        <span>{time === '3:33' ? 'TBA' : `${time} ${ampm} ${tz}`}</span>
        <span><small>
          {description ? description : status === 'Pre-Game' || status === 'Delayed Start' ? status : null}
        </small></span>
      </div>
    )
  }
  // all cases of mid-game statuses
  else if (status === 'In Progress'|| status === 'Delayed' || status === 'Suspended' || status === 'Review' || status === 'Manager Challenger') {
    const suffix = inningSuffix(inning)
    return (
      <div className={gameInfo}>
        <span>{`${inningState} ${inning}`}<sup>{suffix}</sup></span>
        <span><small>
          {status === 'In Progress' && inningState === 'Middle' || inningState === 'End' ? outs = '' : outs === '1' ? `${outs} out` : `${outs} outs`}
          {status === 'Manager Challenge' ? status : status !== 'In Progress' ? `${status} (${reason})` : null}
        </small></span>
      </div>
    )
  }
  // all cases of post-game statuses
  else if (status === 'Final' || status === 'Game Over' || status === 'Completed Early' || status === 'Postponed') {
    return (
      <div className={gameInfo}>
        <span>{status === 'Postponed' ? status : inning !== '9' ? `Final/${inning}` : 'Final'}</span>
        <span><small>
          {status === 'Postponed' ? `(${reason})` : doubleHdr === 'S' || doubleHdr === 'Y' ? `Game ${gameNbr} of 2` : status === 'Completed Early' ? status : null}
        </small></span>
      </div>
    )
  }
  // mlb has so many different status options, this is to find any new ones and add them
  else {
    return (
      <div className={gameInfo}>
        <span>{'fix this bug..'}</span>
      </div>
    )
  }
}

//
// else if (!(isNaN(Number(status.charAt(0))))) {
//   return (
//     <div className={gameInfo}>
//       <span>{status.toUpperCase()}</span>
//     </div>
//   )
// }

// : isPlayoffs
//   ? <span><small>{`Game ${gameNbr} of 7`}</small></span>
