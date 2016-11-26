import React, { PropTypes } from 'react'
import { formatTz, inningSuffix } from 'helpers/utils'
import { gameInfo } from './styles.css'

const propTypes = {
  game: PropTypes.object.isRequired,
  league: PropTypes.string.isRequired
}

export default function GameState({game, league}) {
  if (league === 'mlb') {
    return (
      <MlbState
        status={game.status.status}
        time={`${game.time} ${game.ampm} ${game.time_zone}`}
        inning={game.status.inning}
        inningState={game.status.inning_state}
        outs={game.status.o}
        reason={game.status.reason}
        description={game.description}
        doubleHdr={game.double_header_sw}
        gameNbr={game.game_nbr}/>
    )
  }
  if (league === 'nba') {
    return (
      <NbaState
        status={game.period_time.period_status}
        totalQtrs={game.period_time.period_value}
        playoffs={game.playoffs}/>
    )
  }
  if (league === 'nhl') {
    return (
      <NhlState
        status={game.status.abstractGameState}
        time={game.gameDate}
        prd={game.linescore.currentPeriod}
        totalPrds={game.linescore.currentPeriod}
        ordinal={game.linescore.currentPeriodOrdinal}
        playoffs={game.gameType === 'P' ? game.seriesSummary : null}/>
    )
  }
  return <span>{'hi !'}</span>
}

GameState.propTypes = propTypes

function MlbState({status, time, inning, inningState, outs, reason,
  description, doubleHdr, gameNbr}) {
  // all cases of pre-game statuses
  if (status === 'Preview' || status === 'Warmup' || status === 'Pre-Game' || status === 'Delayed Start') {
    return (
      <div className={gameInfo}>
        <span>{time.startsWith('3:33') ? 'TBA' : time}</span>
        <span><small>
          {description ? description : status === 'Pre-Game' || status === 'Delayed Start' ? status : null}
        </small></span>
      </div>
    )
  }
  // all cases of mid-game statuses
  else if (status === 'In Progress' || status === 'Delayed' || status === 'Suspended' || status === 'Review' || status === 'Manager Challenger') {
    const suffix = inningSuffix(inning)
    return (
      <div className={gameInfo}>
        <span>{`${inningState} ${inning}`}<sup>{suffix}</sup></span>
        <span><small>
          {status === 'In Progress' ? inningState === 'Middle' || inningState === 'End' ? outs = '' : outs === '1' ? `${outs} out` : `${outs} outs` : null}
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

function NbaState({status, totalQtrs, playoffs}) {
  // all cases of pre-game statuses. this checks if string starts w/ number
  if (!(isNaN(Number(status.charAt(0))))) {
    return (
      <div className={gameInfo}>
        <span>{status.toUpperCase()}</span>
      </div>
    )
  }
  // DON'T KNOW BC SEASON HASN'T STARTED
  // all cases of mid-game statuses
  // else if () {
  //   return (
  //
  //   )
  // }
  // all cases of post-game statuses
  else if (status === 'Final') {
    const OTs = totalQtrs - 4
    return (
      <div className={gameInfo}>
        <span>{totalQtrs > 4 ? OTs > 1 ? `${status}/${OTs}OT` : `${status}/OT` : status}</span>
        {playoffs ? <span><small>{`Game ${playoffs.game_number} of 7`}</small></span> : null}
      </div>

    )
  }
}

function NhlState({status, time, prd, totalPrds, ordinal, playoffs}) {
  // all cases of pre-game statuses
  if (status === 'Preview') {
    const timeEt = formatTz(time)
    return (
      <div className={gameInfo}>
        <span>{`${timeEt} ET`}</span>
      </div>
    )
  }
  // DON'T KNOW BC SEASON HASN'T STARTED
  // all cases of mid-game statuses
  // else if () {
  //   return (
  //
  //   )
  // }
  // all cases of post-game statuses
  else if (status === 'Final') {
    return (
      <div className={gameInfo}>
        <span>{totalPrds - 3 > 0 ? `${status}/${ordinal}` : status}</span>
        <span><small>{playoffs ? `${playoffs.gameLabel} of 7` : null}</small></span>
      </div>

    )
  }
}
