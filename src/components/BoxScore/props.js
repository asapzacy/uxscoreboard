import { shortenTeamName } from 'helpers/utils'

//  mlb box score props --> BoxScore component
export const mlbBoxScoreProps = (game, league) => {
  const hasStarted = game.linescore
  const size =
    hasStarted && game.linescore.innings ? game.linescore.innings.length : 0
  return {
    awayTeam: shortenTeamName(game.teams.away.team.teamName),
    homeTeam: shortenTeamName(game.teams.home.team.teamName),
    awayScore:
      hasStarted && game.linescore.teams.away.runs !== undefined
        ? game.linescore.teams.away.runs
        : '',
    homeScore:
      hasStarted && game.linescore.teams.home.runs !== undefined
        ? game.linescore.teams.home.runs
        : '',
    linescore: game.linescore ? game.linescore : '',
    periods: 9,
    totalPeriods: size,
    overtimes: size > 9 ? size - 9 : 0,
    league
  }
}

//  nba box score props --> BoxScore component
export const nbaBoxScoreProps = (game, league) => {
  const inGame = game.period.current
  const size = Number(game.period_time.period_value)
  return {
    awayTeam: shortenTeamName(game.visitor.nickname),
    homeTeam: shortenTeamName(game.home.nickname),
    awayScore: inGame ? game.vTeam.score : '',
    homeScore: inGame ? game.hTeam.score : '',
    linescore: {
      away: game.vTeam.linescore,
      home: game.hTeam.linescore
    },
    periods: 4,
    totalPeriods: size,
    overtimes: game.period_time.period_value > 4 ? size - 4 : 0,
    league
  }
}

//  nhl box score props --> BoxScore component
export const nhlBoxScoreProps = (game, league) => {
  const inGame = game.status.codedGameState > '2'
  const isAllStar = game.gameType === 'A'
  return {
    awayTeam: shortenTeamName(game.teams.away.team.teamName),
    homeTeam: shortenTeamName(game.teams.home.team.teamName),
    awayScore: inGame ? game.linescore.teams.away.goals : '',
    homeScore: inGame ? game.linescore.teams.home.goals : '',
    linescore: game.linescore.periods,
    periods: isAllStar ? 2 : 3,
    totalPeriods: game.linescore.periods.length,
    league
  }
}
