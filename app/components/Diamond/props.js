
export const mlbDiamondProps = (game) => {
  const inGame = game.status.abstractGameCode === 'L'
  return {
    balls: game.linescore.balls,
    strikes: game.linescore.strikes,
    outs: game.linescore.outs,
    inningState: game.linescore.inningState,
    offense: game.linescore.offense,
  }
}
