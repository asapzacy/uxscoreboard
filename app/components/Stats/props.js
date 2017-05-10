import { shortenTeamName } from 'helpers/utils'

//  nba stats props --> Stats component
export const nbaStatsProps = (game) => {
  const awayStats = game.visitor.stats
  const homeStats = game.home.stats
  const inGame = game.period.current
  const empty = ['', '']
  return {
    'teams': [ shortenTeamName(game.visitor.nickname),shortenTeamName(game.home.nickname)],
    'Points': inGame ? [ awayStats.points, homeStats.points ] : empty,
    'Field-Goal %': inGame ? [ awayStats.field_goals_percentage, homeStats.field_goals_percentage ] : empty,
    '3-Point %': inGame ? [ awayStats.three_pointers_percentage, homeStats.three_pointers_percentage ] : empty,
    'Free-Throw %': inGame ? [ awayStats.free_throws_percentage, homeStats.free_throws_percentage ] : empty,
    'Rebounds': inGame ? [ Number(awayStats.rebounds_defensive) + Number(awayStats.rebounds_offensive) + Number(awayStats.team_rebounds), Number(homeStats.rebounds_defensive) + Number(homeStats.rebounds_offensive) + Number(homeStats.team_rebounds)] : empty,
    'Assists': inGame ? [ awayStats.assists, homeStats.assists ] : empty,
    'Blocks': inGame ? [ awayStats.blocks, homeStats.blocks ] : empty,
    'Fouls': inGame ? [ awayStats.fouls, homeStats.fouls ] : empty,
    'Steals': inGame ? [ awayStats.steals, homeStats.steals ] : empty,
    'Turnovers': inGame ? [ awayStats.turnovers, homeStats.turnovers] : empty
  }
}
