import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import Left from 'react-icons/lib/fa/angle-left'
import Right from 'react-icons/lib/fa/angle-right'
import { dateContainer, dateList, arrow, currentSelection, dayContainer } from './styles.css'

const propTypes = {
  date: PropTypes.string.isRequired,
  league: PropTypes.string.isRequired
}

export default function Date({ date, league }) {
  return (
    <div className={dateContainer}>
      <ul className={dateList}>
        <li className={arrow}><Arrow date={date} league={league} diff={-4} direction={'left'}/></li>
        <li><Day date={date} league={league} diff={-3} /></li>
        <li><Day date={date} league={league} diff={-2} /></li>
        <li><Day date={date} league={league} diff={-1} /></li>
        <li className={currentSelection}><Day date={date} league={league} diff={0} /></li>
        <li><Day date={date} league={league} diff={1} /></li>
        <li><Day date={date} league={league} diff={2} /></li>
        <li><Day date={date} league={league} diff={3} /></li>
        <li className={arrow}><Arrow date={date} league={league} diff={4} direction={'right'}/></li>
      </ul>
  </div>
  )
}

Date.propTypes = propTypes

function Day({date, diff, league}) {
  const day = moment(date).add(diff, 'days')
  const url = day.format('YYYYMMDD')
  const weekDay = day.format('ddd').toLowerCase()
  const monthDay = day.format('MMM D')
  const today = moment().format('YYYYMMDD')
  return (
    <Link to={`/${league}/scores/${url}`} className={dayContainer}>
      <span>{today === url ? 'today' : weekDay}</span>
      <span>{monthDay}</span>
    </Link>
  )
}

function Arrow({date, diff, direction, league}) {
  const url = moment(date).add(diff, 'days').format('YYYYMMDD')
  return (
    <Link to={`/${league}/scores/${url}`} className={dayContainer}>
      {direction === 'left' ? <Left /> : <Right />}
    </Link>
  )
}
