import { formatTimezone } from 'helpers/utils'

//  mlb game state props --> GameState component
export const mlbGameStateProps = (game) => {
  const isPlayoffs = game.gameType !== 'R'
  const isDoubleHeader = game.doubleHeader === 'S' || game.doubleHeader === 'Y'
  const inGame = game.status.abstractGameCode === 'L' && game.status.codedGameState !== 'P'
  const isOver = game.status.abstractGameCode === 'F'
  const isDelayed = game.status.codedGameState === 'D' || game.status.statusCode === 'PR' || game.status.statusCode === 'DI'
  const isTBD = game.status.startTimeTBD
  const inGameDelay = game.status.statusCode === 'IR'
  const hasStarted = (inGame || isOver) && !isDelayed
  const inningState = inGame ? game.linescore.inningState : ''
  const inBetween = inningState && inningState !== 'Middle' && inningState !== 'End'
  const time = isTBD ? 'TBD' : `${formatTimezone(game.gameDate)} ET`
  return {
    gameState: inGame ? 1 : isOver && !isDelayed ? 2 : 0,
    status: inGameDelay ? `${game.status.detailedState} - (${game.status.reason})` : game.status.abstractGameState,
    time: isDelayed ? `${time} - ${game.status.detailedState} ${game.status.reason !== undefined ? `(${game.status.reason.split(' ')})` : ''}` : time,
    periods: 9,
    currentTime: inBetween && `${game.linescore.outs} ${game.linescore.outs === 1 ? 'out' : 'outs'}`,
    currentPeriod: inGame && `${inningState === 'End' ? inningState.toUpperCase() : inningState} ${game.linescore.currentInning}`,
    totalPeriods: hasStarted && game.linescore.innings.length,
    overtime: hasStarted && game.linescore.innings.length,
    doubleHeader: isDoubleHeader ? game.gameNumber : '',
    playoffs: isPlayoffs ?
      {
        series: '',
        game: 0,
        maxGames: 7
      } : {},
    isDoubleHeader,
    isPlayoffs,
    inGameDelay
  }
}

//  nba game state props --> GameState component
export const nbaGameStateProps = (game) => {
  const isPlayoffs = Boolean(game.playoffs)
  return {
    gameState: Number(game.period_time.game_status) - 1,
    status: game.period_time.period_status,
    time: `${formatTimezone(game.startTimeUTC)} ET`,
    periods: 4,
    currentPeriod: game.period_time.period_value,
    currentTime: game.period.isEndOfPeriod ? 'END' : game.period_time.game_clock,
    isHalfTime: game.period.isHalftime || game.period_time.period_status === 'Halftime',
    totalPeriods: game.period_time.period_value,
    overtime: game.period_time.period_value > 4 ? game.period_time.period_value > 5 ? `${game.period_time.period_value - 4}OT` : 'OT' : '',
    playoffs: isPlayoffs ?
      {
        series: null,
        game: game.playoffs.game_number,
        maxGames: 7
      } : {},
    isPlayoffs
  }
}

//  nhl game state props --> GameState component
export const nhlGameStateProps = (game) => {
  const isPlayoffs = game.gameType === 'P'
  return {
    gameState: game.status.codedGameState < 3 ? 0 : game.status.codedGameState < 6 ? 1 : 2,
    status: game.status.codedGameState === '2' ? game.status.detailedState : game.status.abstractGameState,
    time: `${formatTimezone(game.gameDate)} ET`,
    periods: 3,
    currentPeriod: game.linescore.currentPeriod,
    currentTime: game.linescore.currentPeriodTimeRemaining,
    totalPeriods: game.linescore.periods.length,
    overtime: game.linescore.currentPeriodOrdinal,
    playoffs: isPlayoffs ?
    {
      series: null,
      game: game.seriesSummary.gameNumber,
      maxGames: 7
    } : {},
    isPlayoffs
  }
}

//  nfl game state props --> GameState component
export const nflGameStateProps = (game) => {
  const isOT = game.q === 'FO'
  const isFinal = game.q === 'F' || isOT
  return {
    gameState: (isFinal || isOT) ? 2 : 0,
    status: isFinal ? 'Final' : 'x',
    time: `${game.t} PM ET`,
    periods: 4,
    totalPeriods: isOT ? 5 : 4,
    overtime: 'OT'
  }
}
