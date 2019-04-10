//  mlb matchup props --> Matchup component
export const mlbMatchupProps = (game, date) => ({
  awayTeam: game.teams.away.team.teamName,
  homeTeam: game.teams.home.team.teamName,
  location: game.teams.home.team.locationName,
  venue: game.venue.name,
  date
})

//  nba matchup props --> Matchup component
export const nbaMatchupProps = (game, date) => ({
  awayTeam: game.visitor.nickname,
  homeTeam: game.home.nickname,
  location: `${game.city}, ${game.state}.`,
  venue: game.arena.name,
  date
})

//  nhl matchup props --> Matchup component
export const nhlMatchupProps = (game, date) => ({
  awayTeam: game.teams.away.team.teamName,
  homeTeam: game.teams.home.team.teamName,
  location:
    game.gameType === 'A' ? 'Los Angeles' : game.teams.home.team.venue.city,
  venue: game.teams.home.team.venue.name,
  date
})
