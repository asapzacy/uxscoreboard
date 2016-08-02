import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import Left from 'react-icons/lib/md/chevron-left'
import Right from 'react-icons/lib/md/chevron-right'
import { dateContainer, arrow, currentSelection, dayContainer } from './styles.css'

const propTypes = {
  date: PropTypes.string.isRequired
}

export default function Date({date}) {
  return (
    <ul className={dateContainer}>
      <li className={arrow}><Arrow date={date} diff={-4} direction={'left'}/></li>
      <li><Day date={date} diff={-3} /></li>
      <li><Day date={date} diff={-2} /></li>
      <li><Day date={date} diff={-1} /></li>
      <li className={currentSelection}><Day date={date} diff={0} /></li>
      <li><Day date={date} diff={1} /></li>
      <li><Day date={date} diff={2} /></li>
      <li><Day date={date} diff={3} /></li>
      <li className={arrow}><Arrow date={date} diff={4} direction={'right'}/></li>
    </ul>
  )
}

Date.propTypes = propTypes

function Day({date, diff}) {
  const day = moment(date).add(diff, 'days')
  const url = day.format('YYYYMMDD')
  const weekDay = day.format('ddd').toLowerCase()
  const monthDay = day.format('MMM D')
  const today = moment().format('YYYYMMDD')
  return (
    <Link to={`/mlb/scores/${url}`} className={dayContainer}>
      <span>{today === url ? 'today' : weekDay}</span>
      <span>{monthDay}</span>
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
