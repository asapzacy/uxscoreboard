
import { shortenTeamName } from '../utils'

export const nbaLeadersProps = (game) => {
  const awayLeaders = game.visitor.Leaders
  const homeLeaders = game.home.Leaders
  return {
    'teams': [ shortenTeamName(game.visitor.nickname), shortenTeamName(game.home.nickname) ],
    'Assists': [ `${awayLeaders.Assists.leader[0].FirstName} ${awayLeaders.Assists.leader[0].LastName}`, `${homeLeaders.Assists.leader[0].FirstName} ${homeLeaders.Assists.leader[0].LastName}` ]
  }
}
