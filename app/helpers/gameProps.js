
// mlb teams - home and away team props
export const mlbTeamProps = (game, side, league) => {
  return {
    name: game[`${side}_team_name`],
    code: game[`${side}_file_code`],
    filetype: game.game_type === 'A' ? 'png' : 'svg',
    ws: game[`${side}_win`],
    ls: game[`${side}_loss`],
    score: game.linescore.r[`${side}`],
    league
  }
}
// mlb matchups - teams + date + venue
export const mlbMatchupProps = (game, date) => {
  return {
    awayTeam: game.away_team_name,
    homeTeam: game.home_team_name,
    location: game.location,
    venue: game.venue,
    date
  }
}

// nhl teams - home and away team props
export const nhlTeamProps = (game, side, league) => {
  return {
    name: game.teams[`${side}`].team.teamName,
    code: game.teams[`${side}`].team.abbreviation.toLowerCase(),
    ws: String(game.teams[`${side}`].leagueRecord.wins),
    ls: String(game.teams[`${side}`].leagueRecord.losses),
    ts: String(game.teams[`${side}`].leagueRecord.ot),
    score: game.status.codedGameState !== '1' ? String(game.teams[`${side}`].score) : null,
    league
  }
}
// nhl matchups - teams + date + venue
export const nhlMatchupProps = (game, date) => {
  console.log(game)
  return {
    awayTeam: game.teams.away.team.teamName,
    homeTeam: game.teams.home.team.teamName,
    location: game.teams.home.team.venue.city,
    venue: game.venue.name,
    date
  }
}
// nhl boxscores - periods + scores
export const nhlBoxScoreProps = (game) => {
  return {
    awayAbbr: game.teams.away.team.abbreviation.toLowerCase(),
    homeAbbr: game.teams.home.team.abbreviation.toLowerCase(),
    awayScore: game.linescore.teams.away.goals,
    homeScore: game.linescore.teams.home.goals,
    linescore: game.linescore.periods,
    prds: 3,
    ots: game.linescore.periods.length - 3
  }
}
