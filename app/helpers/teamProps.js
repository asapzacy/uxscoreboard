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

export const nbaTeamProps = (game, side, league) => {
  return {
    name: game[side].nickname,
    code: game[side].abbreviation.toLowerCase(),
    ws: side === 'home' ? game.hTeam.win : game.vTeam.win,
    ls: side === 'home' ? game.hTeam.loss : game.vTeam.loss,
    score: game[side].score,
    league
  }
}
