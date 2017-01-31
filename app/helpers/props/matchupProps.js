
//  mlb matchup props --> Matchup component
export const mlbMatchupProps = (game, date) => {
  return {
    awayTeam: game.away_team_name,
    homeTeam: game.home_team_name,
    location: game.location,
    venue: game.venue,
    date
  }
}

//  nba matchup props --> Matchup component
export const nbaMatchupProps = (game, date) => {
  return {
    awayTeam: game.visitor.nickname,
    homeTeam: game.home.nickname,
    location: `${game.city}, ${game.state}.`,
    venue: game.arena,
    date
  }
}

//  nhl matchup props --> Matchup component
export const nhlMatchupProps = (game, date) => {
  const isAllStar = game.gameType === 'A'
  return {
    awayTeam: game.teams.away.team.teamName,
    homeTeam: game.teams.home.team.teamName,
    location: isAllStar ? 'Los Angeles' : game.teams.home.team.venue.city,
    venue: game.venue.name,
    date
  }
}
