import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import { FaAngleLeft, FaAngleRight } from 'react-icons/lib/fa';
import { dateContainer, daysList, dayItem, arrowItem } from './styles.css'

const propTypes = {
  width: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  today: PropTypes.string.isRequired,
  league: PropTypes.string.isRequired
}

// TODO: implement a calendar
export default function Date({ width, ...props }) {
  return (
    <div className={dateContainer}>
      <ul className={daysList}>
        <li className={arrowItem}><Day {...props} diff={-1} isArrow={true} /></li>
        <li className={dayItem}><Day {...props} diff={0} isArrow={false} /></li>
        <li className={arrowItem}><Day {...props} diff={1} isArrow={true} /></li>
      </ul>
  </div>
  )
}

Date.propTypes = propTypes

// TODO: remove the arrows at end of last season//start of next season
function Day({ date, today, league, diff, isArrow }) {
  const day = moment(date).add(diff,'days')
  const url = day.format('YYYYMMDD')
  const dayOfTheWeek = today === url ? 'today' : day.format('dddd')
  const formattedDate = `${dayOfTheWeek}, ${day.format('MMM D')}`.toLowerCase()
  const title = `${league.toUpperCase()} scores - ${day.format('MMMM D, YYYY')}`
  return (
    <Link to={`/${league}/scores/${url}`} title={title}>
      { !isArrow
        ? <span>{formattedDate}</span>
        : diff < 0 ? <FaAngleLeft /> : <FaAngleRight />
      }
    </Link>
  )
}
