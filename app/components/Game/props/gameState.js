
import { formatTimezone } from 'helpers/utils'

//  mlb game state props --> GameState component
export const mlbGameStateProps = (game) => {
  const isPlayoffs = game.game_type !== 'R'
  const isDoubleHeader = game.double_header_sw === 'Y'
  return {
    gameState: game.status.ind === 'S' ? 0 : 2,
    status: game.status.status,
    time: `${game.time} ${game.ampm} ${game.time_zone}`,
    periods: 9,
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
    isHalfTime: game.period.isHalftime,
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
