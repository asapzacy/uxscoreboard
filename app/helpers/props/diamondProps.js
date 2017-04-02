
export const mlbDiamondProps = (game) => {
  return {
    balls: game.status.b,
    strikes: game.status.s,
    outs: game.status.o,
    inningState: game.status.inning_state,
    runners: game.runners_on_base,
  }
}
