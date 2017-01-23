

import { shortenTeamName } from '../utils'

export const nbaStatsProps = (game) => {
  return {
    awayTeam: shortenTeamName(game['visitor'].nickname),
    homeTeam: shortenTeamName(game['home'].nickname)
  }
}
