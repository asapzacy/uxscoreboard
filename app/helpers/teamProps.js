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
    filetype: 'svg',
    ws: null,
    ls: null,
    score: game[side].score,
    league
  }
}
