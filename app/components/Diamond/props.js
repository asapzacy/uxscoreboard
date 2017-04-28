
export const mlbDiamondProps = (game) => {
  const inGame = game.status.abstractGameCode === 'L'
  return {
    balls: inGame && game.linescore.balls,
    strikes: inGame && game.linescore.strikes,
    outs: inGame && game.linescore.outs,
    inningState: inGame && game.linescore.inningState,
    offense: inGame && game.linescore.offense,
  }
}
