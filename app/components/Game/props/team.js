
import { shortenTeamName } from 'helpers/utils'

//  mlb home + away team props --> Team component
export const mlbTeamProps = (game, side, league) => {
  const isAllStar = game.game_type === 'A'
  const hasStarted = game.status.ind === 'I' || game.status.ind === 'F' || game.status.status === 'Game Over' || game.status.status === 'Final' || game.status.ind === 'MF'
  return {
    name: shortenTeamName(game[`${side}_team_name`]),
    code: game[`${side}_file_code`].toLowerCase(),
    filetype: isAllStar ? 'png' : 'svg',
    ws: game[`${side}_win`],
    ls: game[`${side}_loss`],
    score: hasStarted && game.linescore.r[side],
    league
  }
}

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
  const side2 = side === 'home' ? 'hTeam' : 'vTeam'
  const inGame = Boolean(game.period.current)
  const isPlayoffs = Boolean(game.playoffs)
  console.log(isPlayoffs)
  return {
    name: shortenTeamName(game[side].nickname),
    code: game[side].abbreviation.toLowerCase(),
    ws: isPlayoffs ? game[side2].seriesWin : game[side2].win,
    ls: isPlayoffs ? game[side2].seriesLoss : game[side2].loss,
    score: inGame && game[side].score,
    league
  }
}

//  nhl home + away team props --> Team component
export const nhlTeamProps = (game, side, league) => {
  const inGame = game.status.codedGameState > '2'
  const isAllStar = game.gameType === 'A'
  return {
    name: shortenTeamName(game.teams[side].team.teamName),
    code: game.teams[side].team.abbreviation.toLowerCase(),
    ws: !isAllStar && String(game.teams[side].leagueRecord.wins),
    ls: !isAllStar && String(game.teams[side].leagueRecord.losses),
    ts: !isAllStar && String(game.teams[side].leagueRecord.ot),
    score: inGame && String(game.teams[side].score),
    league
  }
}
