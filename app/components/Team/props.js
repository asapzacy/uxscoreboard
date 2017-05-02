import { shortenTeamName } from 'helpers/utils'

//  mlb home + away team props --> Team component
export const mlbTeamProps = (game, side, league) => {
  const isAllStar = game.game_type === 'A'
  const hasStarted = game.status.statusCode === 'I' || game.status.statusCode === 'F' || game.status.statusCode === 'O'
  return {
    name: shortenTeamName(game.teams[side].team.teamName),
    code: game.teams[side].team.fileCode,
    filetype: isAllStar ? 'png' : 'svg',
    ws: game.teams[side].leagueRecord.wins,
    ls: game.teams[side].leagueRecord.losses,
    score: hasStarted && String(game.teams[side].score),
    league
  }
}

//  nfl home + away team props --> Team component
export const nflTeamProps = (game, side, league) => {
  const team =  game[`${side}nn`]
  return {
    name: team[0].toUpperCase() + team.slice(1),
    code: game[side].toLowerCase(),
    ws: '0',
    ls: '0',
    score: game[`${side}s`],
    league
  }
}

//  nba home + away team props --> Team component
export const nbaTeamProps = (game, side, league) => {
  const isHome = side === 'home'
  const side2 = isHome ? 'hTeam' : 'vTeam'
  const inGame = Boolean(game.period.current)
  const isPlayoffs = Boolean(game.playoffs)
  return {
    name: shortenTeamName(game[side].nickname),
    code: game[side].abbreviation.toLowerCase(),
    ws: isPlayoffs ? isHome ? game.playoffs.home_wins : game.playoffs.visitor_wins : game[side2].win,
    ls: isPlayoffs ? isHome ? game.playoffs.visitor_wins : game.playoffs.home_wins : game[side2].loss,
    score: inGame && game[side].score,
    league
  }
}

//  nhl home + away team props --> Team component
export const nhlTeamProps = (game, side, league) => {
  const inGame = game.status.codedGameState > '2'
  const isAllStar = game.gameType === 'A'
  const isPlayoffs = game.gameType === 'P'
  const teamArray = side === 'away' ? 0 : 1
  return {
    name: shortenTeamName(game.teams[side].team.teamName),
    code: game.teams[side].team.abbreviation.toLowerCase(),
    ws: !isAllStar && isPlayoffs ? String(game.seriesSummary.series.matchupTeams[teamArray].seriesRecord.wins) : String(game.teams[side].leagueRecord.wins),
    ls: !isAllStar && isPlayoffs ? String(game.seriesSummary.series.matchupTeams[teamArray].seriesRecord.losses) : String(game.teams[side].leagueRecord.losses),
    ts: (!isAllStar && !isPlayoffs) && String(game.teams[side].leagueRecord.ot),
    score: inGame && String(game.teams[side].score),
    league
  }
}
