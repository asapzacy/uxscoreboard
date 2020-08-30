import { shortenTeamName } from 'helpers/utils'

//  nba stats props --> Stats component
export const nbaStatsProps = game => {
  const awayStats = game.vTeam.stats
  const homeStats = game.hTeam.stats
  const inGame = game.statusNum === 2 || game.statusNum === 3
  const empty = ['', '']

  return {
    teams: [
      shortenTeamName(game.vTeam.nickname),
      shortenTeamName(game.hTeam.nickname)
    ],
    Points: inGame
      ? [awayStats?.totals?.points, homeStats?.totals?.points]
      : empty,
    'Field-Goal %': inGame
      ? [`${awayStats?.totals?.fgp}%`, `${homeStats?.totals?.fgp}%`]
      : empty,
    '3-Point %': inGame
      ? [`${awayStats?.totals?.tpp}%`, `${homeStats?.totals?.tpp}%`]
      : empty,
    'Free-Throw %': inGame
      ? [`${awayStats?.totals?.ftp}%`, `${homeStats?.totals?.ftp}%`]
      : empty,
    Rebounds: inGame
      ? [awayStats?.totals?.totReb, homeStats?.totals?.totReb]
      : empty,
    Assists: inGame
      ? [awayStats?.totals?.assists, homeStats?.totals?.assists]
      : empty,
    Blocks: inGame
      ? [awayStats?.totals?.blocks, homeStats?.totals?.blocks]
      : empty,
    Fouls: inGame
      ? [
          Number(awayStats?.totals?.pFouls) +
            Number(awayStats?.totals?.team_fouls),
          Number(homeStats?.totals?.pFouls) +
            Number(homeStats?.totals?.team_fouls)
        ]
      : empty,
    Steals: inGame
      ? [awayStats?.totals?.steals, homeStats?.totals?.steals]
      : empty,
    Turnovers: inGame
      ? [awayStats?.totals?.turnovers, homeStats?.totals?.turnovers]
      : empty
  }
}
