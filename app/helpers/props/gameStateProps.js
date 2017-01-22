import { formatTimezone } from './../utils'

// nhl gamestate details - time + description
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
    isPlayoffs:  null
  }
}
