import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Left from 'react-icons/lib/fa/angle-left'
import Right from 'react-icons/lib/fa/angle-right'
import moment from 'moment'
import { dateContainer, currentSelection, dayContainer,
  upperStr, lowerStr } from './styles.css'

export default function Date({date}) {
  return (
    <ul className={dateContainer}>
      <li><Arrow date={date} diff={-4} direction={'left'}/></li>
      <li><Day date={date} diff={-3} /></li>
      <li><Day date={date} diff={-2} /></li>
      <li><Day date={date} diff={-1} /></li>
      <li className={currentSelection}><Day date={date} diff={0} /></li>
      <li><Day date={date} diff={1} /></li>
      <li><Day date={date} diff={2} /></li>
      <li><Day date={date} diff={3} /></li>
      <li><Arrow date={date} diff={4} direction={'right'}/></li>
    </ul>
  )
}

function Day({date, diff}) {
  const day = moment(date).add(diff, 'days')
  const url = day.format('YYYYMMDD')
  const weekDay = day.format('ddd').toLowerCase()
  const monthDay = day.format('MMM D')
  return (
    <Link to={`/mlb/scores/${url}`} className={dayContainer}>
      <span className={upperStr}>{weekDay}</span>
      <span className={lowerStr}>{monthDay}</span>
    </Link>
  )
}

function Arrow({date, diff, direction}) {
  const url = moment(date).add(diff, 'days').format('YYYYMMDD')
  return (
    <Link to={`/mlb/scores/${url}`} className={dayContainer}>
      {direction === 'left' ? <Left /> : <Right />}
    </Link>
  )
}
