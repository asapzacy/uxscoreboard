import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { Game } from 'components'
import { formatDate } from 'helpers/utils'
import moment from 'moment'
import { scoreboardContainer, scoresContainer, header,
  dateContainer } from './styles.css'


function Yesterdayy({date}) {
  const dd = date.slice(6,8)
  const d = parseInt(dd, 10) + 1
  const yyyy = date.slice(0,4)
  const mm = date.slice(4,6)
  return `${yyyy}${mm}${d}`
}

export default function ScoreboardUI({date, scores, handleClick}) {
  return (
    <div className={scoreboardContainer}>
      <div className={dateContainer}>
        <Date date={date} />
      </div>
      <div className={scoresContainer}>
      {scores === undefined
        ? <h1>{'no games today'}</h1>
        : scores.game.map((item) => <Game key={item.game_pk} game={item} />)
      }
      </div>
    </div>
  )
}

export default function Scoreboard(props) {
  return (
    <div>
      {props.isLoading === true
        ? <h1 className={header}>{'Loading...'}</h1>
        : <ScoreboardUI
            date={props.date}
            scores={props.scores}
          />
      }
    </div>
  )
}

function format(date) {
  let x = moment(date).format('LL')
  return x
}
function future(date, index) {
  let today = moment(date)
  let tomorrow = today.add(index, 'days').format('LL')
  return tomorrow
}
export function Date({date}) {
  return (
    <div>
      <h1 className={header}>{format(date)}</h1>
      <ul>
        <li><Link to={'/mlb/scores/20160716'}>{future(date, 1)}</Link></li>
        <li><Link to={'/mlb/scores/20160717'}>{future(date, 2)}</Link></li>
        <li><Link to={'/mlb/scores/20160718'}>{future(date, 3)}</Link></li>
        <li><Link to={'/mlb/scores/20160719'}>{future(date, 4)}</Link></li>
        <li><Link to={'/mlb/scores/20160720'}>{future(date, 5)}</Link></li>
      </ul>
    </div>
  )
}
Scoreboard.propTypes = {
  isLoading: PropTypes.bool.isRequired,
}
