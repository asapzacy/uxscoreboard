import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import { FaAngleLeft, FaAngleRight } from 'react-icons/lib/fa';
import { dateMenu, dateList, dateItem, arrowItem, dateLink, mainLink } from './styles.css'

const propTypes = {
  width: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  today: PropTypes.string.isRequired,
  league: PropTypes.string.isRequired
}

// TODO: implement a calendar
export default function Date({ width, ...props }) {
  return (
    <nav className={dateMenu}>
      <menu className={dateList}>
        <li className={arrowItem}><Day {...props} diff={-1} isArrow={true} /></li>
        { width >= 1331 && <li className={dateItem}><Day {...props} diff={-2} isArrow={false} /></li> }
        { width >= 667 && <li className={dateItem}><Day {...props} diff={-1} isArrow={false} /></li> }
        <li className={dateItem}><Day {...props} diff={0} isArrow={false} /></li>
        { width >= 667 && <li className={dateItem}><Day {...props} diff={1} isArrow={false} /></li> }
        { width >= 1331 && <li className={dateItem}><Day {...props} diff={2} isArrow={false} /></li> }
        <li className={arrowItem}><Day {...props} diff={1} isArrow={true} /></li>
      </menu>
    </nav>
  )
}

Date.propTypes = propTypes

// TODO: remove the arrows at end of last season//start of next season
function Day({ date, today, league, diff, isArrow }) {
  const day = moment(date).add(diff,'days')
  const url = day.format('YYYYMMDD')
  const isMainLink = diff === 0
  let dayOfTheWeek = today === url ? 'today' : day.format('dddd')
  dayOfTheWeek = isMainLink ? dayOfTheWeek : day.format('ddd')
  const formattedDate = `${dayOfTheWeek}, ${day.format('MMM D')}`.toLowerCase()
  const title = `${league.toUpperCase()} scores - ${day.format('MMMM D, YYYY')}`
  return (
    <Link className={isMainLink ? mainLink : dateLink} to={`/${league}/scores/${url}`} title={title}>
      { !isArrow
        ? <span>{formattedDate}</span>
        : diff < 0 ? <FaAngleLeft /> : <FaAngleRight />
      }
    </Link>
  )
}
