import { formatTimezone } from './utils'


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

// nhl gamestate details - time + description
export const nhlGameStateProps = (game) => {
  return {
    state: game.status.codedGameState < 3 ? 0 : game.status.codedGameState < 6 ? 1 : 2,
    status: game.status.codedGameState === '2' ? game.status.detailedState : game.status.abstractGameState,
    time: `${formatTimezone(game.gameDate)} ET`,
    prds: 3,
    currentPrd: game.linescore.currentPeriod,
    currentTime: game.linescore.currentPeriodTimeRemaining,
    totalPrds: game.linescore.periods.length,
    ordinal: game.linescore.currentPeriodOrdinal,
    isPlayoffs: game.gameType === 'P'
  }
}


// nhl matchups - teams + date + venue
export const nhlMatchupProps = (game, date) => {
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
    awayScore: game.status.codedGameState > '2' ? game.linescore.teams.away.goals : '',
    homeScore: game.status.codedGameState > '2' ? game.linescore.teams.home.goals : '',
    linescore: game.linescore.periods,
    prds: 3,
    totalPrds: game.linescore.periods.length
  }
}
