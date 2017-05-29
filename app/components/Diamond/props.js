
export const mlbDiamondProps = (game) => {
  const inGame = game.status.abstractGameCode === 'L'
  return {
    balls: inGame && Number(game.linescore.balls),
    strikes: inGame && Number(game.linescore.strikes),
    outs: inGame && Number(game.linescore.outs),
    inningState: inGame && game.linescore.inningState,
    offense: inGame && game.linescore.offense,
  }
}
