import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import AngleRight from 'react-icons/lib/fa/angle-right'
import AngleLeft from 'react-icons/lib/fa/angle-left'
import { dateMenu, dateList, arrowItem, dateLink, mainLink } from './styles.css'

const propTypes = {
  width: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  today: PropTypes.string.isRequired,
  league: PropTypes.string.isRequired
}

// TODO: implement a calendar
const Date = ({ width, ...props }) => (
  <nav className={dateMenu}>
    { props.league !== 'nfl' &&
      <menu className={dateList}>
        { props.league }
        <li className={arrowItem}><Day {...props} diff={-1} isArrow={true} /></li>
        { width >= 1331 && <li><Day {...props} diff={-2} isArrow={false} /></li> }
        { width >= 667 && <li><Day {...props} diff={-1} isArrow={false} /></li> }
        <li><Day {...props} diff={0} isArrow={false} /></li>
        { width >= 667 && <li><Day {...props} diff={1} isArrow={false} /></li> }
        { width >= 1331 && <li><Day {...props} diff={2} isArrow={false} /></li> }
        <li className={arrowItem}><Day {...props} diff={1} isArrow={true} /></li>
      </menu>
    }
  </nav>
)

Date.propTypes = propTypes

export default Date

// TODO: remove the arrows at end of last season//start of next season
function Day({ date, today, league, diff, isArrow }) {
  const day = moment(date).add(diff, 'days')
  const url = day.format('YYYYMMDD')
  const isMainLink = diff === 0
  // let dayOfTheWeek = today === url ? 'today' : day.format('dddd')
  // dayOfTheWeek = isMainLink ? dayOfTheWeek : day.format('ddd')
  const dayOfTheWeek = today === url ? 'today' : isMainLink ? day.format('dddd') :  day.format('ddd')
  const formattedDate = `${dayOfTheWeek}, ${day.format('MMM D')}`.toLowerCase()
  const title = `${league.toUpperCase()} scores - ${day.format('MMMM D, YYYY')} | uxscoreboard`
  return (
    <Link className={isMainLink ? mainLink : dateLink} to={`/${league}/scores/${url}`} title={title}>
      { !isArrow
        ? <span>{formattedDate}</span>
        : diff < 0 ? <AngleLeft /> : <AngleRight />
      }
    </Link>
  )
}
