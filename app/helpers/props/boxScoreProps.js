

// nhl boxscores - periods + scores
export const nhlBoxScoreProps = (game, league) => {
  return {
    awayAbbr: game.teams.away.team.abbreviation.toUpperCase(),
    homeAbbr: game.teams.home.team.abbreviation.toUpperCase(),
    awayScore: game.status.codedGameState > '2' ? game.linescore.teams.away.goals : '',
    homeScore: game.status.codedGameState > '2' ? game.linescore.teams.home.goals : '',
    linescore: game.linescore.periods,
    periods: 3,
    totalPeriods: game.linescore.periods.length,
    league
  }
}

export const nbaBoxScoreProps = (game, league) => {
  const inGame = game.period.current
  return {
    awayAbbr: game.vTeam.triCode,
    homeAbbr: game.hTeam.triCode,
    awayScore: inGame ? game.vTeam.score : '',
    homeScore: inGame ? game.hTeam.score : '',
    linescore:  { away: game.vTeam.linescore, home: game.hTeam.linescore },
    periods: 4,
    totalPeriods: game.period.current,
    league
  }
}
