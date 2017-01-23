

import { shortenTeamName } from '../utils'

export const nbaStatsProps = (game) => {
  const awayStats = game.visitor.stats
  const homeStats = game.home.stats
  const inGame = game.period.current
  const empty = ['', '']
  return {
    'Teams': [ shortenTeamName(game.visitor.nickname), shortenTeamName(game.home.nickname) ],
    'Points': [ awayStats.points, homeStats.points ],
    'Field-Goal %': inGame ? [ awayStats.field_goals_percentage, homeStats.field_goals_percentage ] : empty,
    '3-Point %': inGame ? [ awayStats.three_pointers_percentage, homeStats.three_pointers_percentage ] : empty,
    'Free-Throw %': inGame ? [ awayStats.free_throws_percentage, homeStats.free_throws_percentage ] : empty,
    'Rebounds': inGame ? [ Number(awayStats.rebounds_defensive) + Number(awayStats.rebounds_offensive) + Number(awayStats.team_rebounds), Number(homeStats.rebounds_defensive) + Number(homeStats.rebounds_offensive) + Number(homeStats.team_rebounds)] : empty,
    'Assists': [ awayStats.assists, homeStats.assists ],
    'Blocks': [ awayStats.blocks, homeStats.blocks ],
    'Fouls': [ awayStats.fouls, homeStats.fouls ],
    'Steals': [ awayStats.steals, homeStats.steals ],
    'Turnovers': [ awayStats.turnovers, homeStats.turnovers ]
  }
}
