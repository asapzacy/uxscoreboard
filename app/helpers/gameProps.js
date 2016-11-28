
export const mlbTeamProps = (game, side, league) => {
  const isAllstar = game.game_type === 'A'
  return {
    name: game[`${side}_team_name`],
    code: game[`${side}_file_code`],
    filetype: isAllstar ? 'png' : 'svg',
    ws: game[`${side}_win`],
    ls: game[`${side}_loss`],
    score: game.linescore.r[`${side}`],
    league,
    isAllstar
  }
}
