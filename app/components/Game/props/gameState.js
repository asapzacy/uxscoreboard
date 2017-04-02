
import { formatTimezone } from 'helpers/utils'

//  mlb game state props --> GameState component
export const mlbGameStateProps = (game) => {
  const isPlayoffs = game.game_type !== 'R'
  const isDoubleHeader = game.double_header_sw === 'Y'
  const inningState = game.status.inning_state
  const inGame = inningState && inningState !== 'Middle' && inningState !== 'End'
  const preGame = game.status.ind === 'S' || game.status.ind === 'P' || game.status.ind === 'PW'
  return {
    gameState: preGame ? 0 : game.status.ind === 'I' ? 1 : 2,
    status: game.status.ind === 'F' ? 'Final' : game.status.status,
    time: `${game.time} ${game.ampm} ${game.time_zone}`,
    periods: 9,
    currentTime: inGame && `${game.status.o} ${game.status.o === '1' ? 'out' : 'outs'}`,
    currentPeriod: `${inningState === 'End' ? inningState.toUpperCase() : inningState} ${game.status.inning}`,
    totalPeriods: game.linescore.inning.length,
    overtime: game.linescore.inning.length,
    doubleHeader: isDoubleHeader ? game.game_nbr : '',
    playoffs: isPlayoffs ?
      {
        series: game.series,
        game: game.series_num,
        maxGames:game.ser_games
      } : {},
    isDoubleHeader,
    isPlayoffs
  }
}

//  nba game state props --> GameState component
export const nbaGameStateProps = (game) => {
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
    isPlayoffs: null
  }
}

//  nhl game state props --> GameState component
export const nhlGameStateProps = (game) => {
  return {
    gameState: game.status.codedGameState < 3 ? 0 : game.status.codedGameState < 6 ? 1 : 2,
    status: game.status.codedGameState === '2' ? game.status.detailedState : game.status.abstractGameState,
    time: `${formatTimezone(game.gameDate)} ET`,
    periods: 3,
    currentPeriod: game.linescore.currentPeriod,
    currentTime: game.linescore.currentPeriodTimeRemaining,
    totalPeriods: game.linescore.periods.length,
    overtime: game.linescore.currentPeriodOrdinal,
    isPlayoffs: game.gameType === 'P'
  }
}

//  nfl game state props --> GameState component
export const nflGameStateProps = (game) => {
  const isOT = game.q === 'FO'
  const isFinal = game.q === 'F' || isOT
  return {
    gameState: (isFinal || isOt) ? 2 : 0,
    status: isFinal ? 'Final' : 'x',
    periods: 4,
    totalPeriods: isOT ? 5 : 4,
    overtime: 'OT'
  }
}
