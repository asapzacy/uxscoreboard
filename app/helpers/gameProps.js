
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

// nhl teams - home and away team props
export const nhlTeamProps = (game, side, league) => {
  console.log(game)
  return {
    name: game.teams[`${side}`].team.teamName,
    code: game.teams[`${side}`].team.abbreviation.toLowerCase(),
    ws: String(game.teams[`${side}`].leagueRecord.wins),
    ls: String(game.teams[`${side}`].leagueRecord.losses),
    ots: String(game.teams[`${side}`].leagueRecord.ot),
    score: String(game.teams[`${side}`].score),
    league
  }
}






export const mlbMatchupProps = (game, date) => {
  return {
    awayTeam: game.away_team_name,
    homeTeam: game.home_team_name,
    location: game.location,
    venue: game.venue,
    date
  }
}
