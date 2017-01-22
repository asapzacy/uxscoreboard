import { formatTimezone } from './utils'




// nhl boxscores - periods + scores
export const nhlBoxScoreProps = (game) => {
  return {
    awayAbbr: game.teams.away.team.abbreviation.toLowerCase(),
    homeAbbr: game.teams.home.team.abbreviation.toLowerCase(),
    awayScore: game.status.codedGameState > '2' ? game.linescore.teams.away.goals : '',
    homeScore: game.status.codedGameState > '2' ? game.linescore.teams.home.goals : '',
    linescore: game.linescore.periods,
    prds: 3,
    totalPrds: game.linescore.periods.length
  }
}
