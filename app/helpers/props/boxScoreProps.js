
import { shortenTeamName } from '../utils'

//  mlb box score props --> BoxScore component
export const mlbBoxScoreProps = (game, league) => {
  return {
    awayTeam: shortenTeamName(game.away_team_name),
    homeTeam: shortenTeamName(game.home_team_name),
    awayScore: game.linescore.r.away,
    homeScore: game.linescore.r.home,
    linescore: game.linescore,
    periods: 9,
    totalPeriods: game.linescore.inning.length,
    overtimes: game.linescore.inning.length > 9 ? game.linescore.inning.length - 9 : 0,
    league
  }
}

//  nba box score props --> BoxScore component
export const nbaBoxScoreProps = (game, league) => {
  const inGame = game.period.current
  return {
    awayTeam: shortenTeamName(game.visitor.nickname),
    homeTeam: shortenTeamName(game.home.nickname),
    awayScore: inGame ? game.vTeam.score : '',
    homeScore: inGame ? game.hTeam.score : '',
    linescore:  {
      away: game.vTeam.linescore,
      home: game.hTeam.linescore
    },
    points: inGame ? game.home.stats.points : '',
    periods: 4,
    totalPeriods: Number(game.period_time.period_value),
    overtimes: game.period_time.period_value > 4 ? Number(game.period_time.period_value) - 4 : 0,
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
